<template>
  <div>
    <div>
      <div v-if="isLoading"  class="wrapper">
        <h2>Generating image...</h2>
        <div class="spinner-circle"></div>
      </div>
      <div v-else  class="wrapper">
        <h2>What do you see?</h2>
        <img :src="imageUrl" />
        <p  class="answer-popup">{{ result }}</p>
      </div>
    </div>
    <div>
      <input v-model="userAnswer" placeholder="Write here" />
      <button @click="checkAnswer" :disabled="isLoading">Check</button>
      <p>Points: {{ score }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth()
const user = auth.currentUser
const imageUrl = ref('')
const correctWord = ref('')
const userAnswer = ref('')
const result = ref('')
const score = ref(0)
const isLoading = ref(false)

const props = defineProps({
  wordList: Array,
  fetchImage: Function
})

const loadScore = async () => {
  if (!user) return
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    score.value = docSnap.data().score || 0
  } else {
    await setDoc(docRef, {
      email: user.email,
      score: 0
    })
  }
}

const loadNewImage = async () => {
  isLoading.value = true
  correctWord.value = props.wordList[Math.floor(Math.random() * props.wordList.length)]
  imageUrl.value = await props.fetchImage(correctWord.value)
  userAnswer.value = ''
  result.value = ''
  isLoading.value = false
}

const checkAnswer = async () => {

  if (userAnswer.value.toLowerCase() === '') {
    result.value = '⚠️ Please enter an answer and try again.'
    return
  }
  if (userAnswer.value.toLowerCase() === correctWord.value.toLowerCase()) {
    result.value = '✅ Correct!'
    score.value++
    if (user) {
        const docRef = doc(db, 'users', user.uid)
    await updateDoc(docRef, { score: score.value })
  }
  } else {
    result.value = `❌ Wrong. Correct answer: ${correctWord.value}`
  }
  setTimeout(loadNewImage, 1000)
}

onMounted(async () => {
  await loadScore()
  await loadNewImage()
})

</script>
