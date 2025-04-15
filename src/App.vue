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
      <p>Player: {{ user.email }}</p>
      <button @click="logout">Log Out</button>

      <DataProvider 
        @wordsLoaded="handleWordsLoaded" 
        @imageFetcherReady="setImageFetcher"
      />

      <QuizView 
        v-if="wordList.length && fetchImage" 
        :wordList="wordList" 
        :fetchImage="fetchImage" 
      />

      <AdminPanel
        v-if="user.email === ownerEmail"

      />
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
import Footer from './components/Footer.vue'

const ownerEmail = 'pi.eko013@gmail.com'

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
body {
  font-family: Arial, sans-serif;
  background-color: #7fcafc;
  color: #333;
  margin: 0;
}
.container {
  width: 75%;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
img {
  max-width: 300px;
  margin: 20px auto;
  display: block;
}
input, textarea {
  padding: 8px;
  margin: 10px;
  width: 80%;
  max-width: 500px;
}
button {
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
}
.admin-panel {
  margin-top: 30px;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
}
</style>
