<template>
  <div class="highscore-panel">
    <a href="#" @click.prevent="showHighscore = !showHighscore">
      {{ showHighscore ? '❌ Close Highscore' : '🏆 View Highscore' }}
    </a>

    <div v-if="showHighscore" class="highscore-popup">
      <h3>🏆 Top Players</h3>
      
      <div v-if="isLoading" class="loading">
        <p>Loading scores...</p>
      </div>

      <div v-else-if="topPlayers.length === 0" class="no-scores">
        <p>No scores yet. Be the first to play!</p>
      </div>

      <div v-else class="scores-list">
        <div 
          v-for="(player, index) in topPlayers" 
          :key="player.id"
          class="score-item"
          :class="{ 'current-user': player.email === currentUserEmail }"
        >
          <span class="rank">
            {{ index + 1 }}{{ getRankSuffix(index + 1) }}
          </span>
          <span class="player-email">{{ player.email }}</span>
          <span class="score">{{ player.score }} pts</span>
        </div>
      </div>

      <div v-if="currentUserRank > 10" class="current-user-rank">
        <div class="divider">...</div>
        <div class="score-item current-user">
          <span class="rank">{{ currentUserRank }}{{ getRankSuffix(currentUserRank) }}</span>
          <span class="player-email">{{ currentUserEmail }}</span>
          <span class="score">{{ currentUserScore }} pts</span>
        </div>
      </div>

      <button @click="refreshScores" class="refresh-btn">
        🔄 Refresh
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const auth = getAuth()
const showHighscore = ref(false)
const topPlayers = ref([])
const allPlayers = ref([])
const isLoading = ref(false)

const currentUserEmail = computed(() => auth.currentUser?.email || '')
const currentUserScore = computed(() => {
  const user = allPlayers.value.find(p => p.email === currentUserEmail.value)
  return user?.score || 0
})

const currentUserRank = computed(() => {
  const userIndex = allPlayers.value.findIndex(p => p.email === currentUserEmail.value)
  return userIndex >= 0 ? userIndex + 1 : 0
})

const loadHighscores = async () => {
  isLoading.value = true
  try {
    // Dohvati top 10 igrača
    const topQuery = query(
      collection(db, 'users'),
      orderBy('score', 'desc'),
      limit(10)
    )
    const topSnapshot = await getDocs(topQuery)
    topPlayers.value = topSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Dohvati sve igrače za rangiranje trenutnog korisnika
    const allQuery = query(
      collection(db, 'users'),
      orderBy('score', 'desc')
    )
    const allSnapshot = await getDocs(allQuery)
    allPlayers.value = allSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

  } catch (error) {
    console.error('Error loading highscores:', error)
  } finally {
    isLoading.value = false
  }
}

const refreshScores = () => {
  loadHighscores()
}

const getRankSuffix = (rank) => {
  if (rank % 100 >= 11 && rank % 100 <= 13) return 'th'
  switch (rank % 10) {
    case 1: return 'st'
    case 2: return 'nd'  
    case 3: return 'rd'
    default: return 'th'
  }
}

onMounted(() => {
  loadHighscores()
})
</script>
