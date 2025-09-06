<template>
  <div class="container">
    <Header />
    <div v-if="!authChecked">
      <p>Loading...</p>
    </div>

    <Login
      v-else-if="!user && mode === 'login'"
      @authenticated="onLogin"
      @toggle="toggleMode"
    />

    <Register
      v-else-if="!user && mode === 'register'"
      @authenticated="onLogin"
      @toggle="toggleMode"
    />

    <div v-else>
      <DataProvider 
        @wordsLoaded="handleWordsLoaded" 
        @imageFetcherReady="setImageFetcher"
      />

      <QuizView 
        v-if="wordList.length && fetchImage" 
        :wordList="wordList" 
        :fetchImage="fetchImage" 
      />
      <p>Player: {{ user.email }}</p>
      <button @click="logout">Log Out</button>

      <AdminPanel v-if="user.email === ownerEmail" />
      <Highscore />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from './firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import QuizView from './components/QuizView.vue'
import AdminPanel from './components/AdminPanel.vue'
import DataProvider from './components/DataProvider.vue'
import Header from './components/Header.vue'
import Highscore from './components/Highscore.vue'
import Footer from './components/Footer.vue'

const ownerEmail = 'admin@mail.com'

const user = ref(null)
const authChecked = ref(false)
const wordList = ref([])
const fetchImage = ref(null)
const mode = ref('login')

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}

const onLogin = () => {
  user.value = auth.currentUser
}

const logout = async () => {
  await signOut(auth)
  user.value = null
}

onAuthStateChanged(auth, (u) => {
  user.value = u
  authChecked.value = true
})

const handleWordsLoaded = (words) => {
  wordList.value = words
}

const setImageFetcher = (fetcher) => {
  fetchImage.value = fetcher
}
</script>

<style>
  @import './assets/main.css'
</style>
