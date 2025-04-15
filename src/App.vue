<template>
  <div class="container">
    <h1>🧠 Kviz: Prepoznaj predmet</h1>

    <!-- Čekanje da Firebase provjeri korisnika -->
    <div v-if="!authChecked">
      <p>Učitavanje...</p>
    </div>

    <!-- Prikaz login/registracije -->
    <div v-else-if="!user">
      <h2 v-if="mode === 'login'">Prijava</h2>
      <h2 v-else>Registracija</h2>

      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Lozinka" type="password" />
      <button @click="mode === 'login' ? login() : register()">
        {{ mode === 'login' ? 'Prijavi se' : 'Registriraj se' }}
      </button>

      <p style="color: red">{{ error }}</p>
      <p>
        <button @click="toggleMode">
          {{ mode === 'login' ? 'Nemaš račun? Registriraj se' : 'Već imaš račun? Prijavi se' }}
        </button>
      </p>
    </div>

    <!-- Prikaz kviza -->
    <div v-else>
      <p>Prijavljen kao: {{ user.email }}</p>
      <button @click="logout">Odjava</button>

      <div v-if="imageUrl">
        <h2>Što vidiš na slici?</h2>
        <img :src="imageUrl" />
        <input v-model="userAnswer" placeholder="Upiši naziv" />
        <button @click="checkAnswer">Provjeri</button>
        <p>{{ result }}</p>
        <p>Bodovi: {{ score }}</p>
      </div>

      <div v-else>
        <p>Učitavanje slike...</p>
      </div>

      <!-- Admin panel: samo za ownera -->
      <div v-if="user.email === ownerEmail" class="admin-panel">
        <h3 style="margin-top: 20px">➕ Dodaj više riječi (odvojene zarezima, razmacima ili enterom)</h3>
        <textarea
          v-model="bulkWords"
          rows="6"
          cols="50"
          placeholder="npr. jabuka, stol, auto..."
        ></textarea>
        <br />
        <button @click="handleBulkAddWords">Dodaj više riječi</button>
        <p style="color: green" v-if="bulkAddSuccess">✅ Riječi dodane!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  collection,
  getDocs,
  addDoc
} from 'firebase/firestore'
import { auth, db } from './firebase'

// 🔑 Postavke
const API_KEY = 'AIzaSyB7IeZUYAroYlY1jCR1lGBF3rnfv126--o'
const CX_ID = '307beb65a74304a9c'
const ownerEmail = 'pi.eko013@gmail.com'

// 📧 Login / registracija
const email = ref('')
const password = ref('')
const error = ref('')
const mode = ref('login') // ili 'register'
const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}

// 👤 Auth korisnik
const user = ref(null)
const authChecked = ref(false)

// 🔤 Riječi i kviz
const wordList = ref([])
const imageUrl = ref('')
const correctWord = ref('')
const userAnswer = ref('')
const result = ref('')
const score = ref(0)

// ➕ Dodavanje riječi
const newWord = ref('')
const addSuccess = ref(false)
const bulkWords = ref('')
const bulkAddSuccess = ref(false)

// ✅ LOGIN
async function login() {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (e) {
    error.value = 'Greška: ' + e.message
  }
}

// ✅ REGISTRACIJA
async function register() {
  error.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
  } catch (e) {
    error.value = 'Greška: ' + e.message
  }
}

// ✅ ODJAVA
async function logout() {
  await signOut(auth)
  user.value = null
}

// 🔄 PRAĆENJE STANJA AUTENTIKACIJE
onAuthStateChanged(auth, async (u) => {
  user.value = u
  authChecked.value = true
  if (u) {
    await loadWords()
  }
})

// 📥 Učitaj riječi iz Firestore
async function loadWords() {
  const snapshot = await getDocs(collection(db, 'words'))
  wordList.value = snapshot.docs.map(doc => doc.data().word)
  await loadNewImage()
}

// 🔍 Dohvati sliku iz Google API-ja
async function fetchGoogleImage(query) {
  try {
    const res = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: API_KEY,
        cx: CX_ID,
        q: query,
        searchType: 'image',
        num: 1
      }
    })
    return res.data.items[0].link
  } catch (e) {
    console.error('Greška kod API-ja:', e)
    return ''
  }
}

// 🎯 Učitaj novu sliku
async function loadNewImage() {
  const word = wordList.value[Math.floor(Math.random() * wordList.value.length)]
  correctWord.value = word
  imageUrl.value = await fetchGoogleImage(word)
  userAnswer.value = ''
  result.value = ''
}

// ✅ Provjeri odgovor
function checkAnswer() {
  if (userAnswer.value.toLowerCase() === correctWord.value.toLowerCase()) {
    result.value = '✅ Točno!'
    score.value++
  } else {
    result.value = `❌ Netočno. Točan odgovor: ${correctWord.value}`
  }
  setTimeout(loadNewImage, 2500)
}

// ➕ Dodaj jednu riječ
// async function handleAddWord() {
//  if (user.value?.email !== ownerEmail) return
//  const word = newWord.value.trim().toLowerCase()
//  if (!word) return
//  await addDoc(collection(db, 'words'), { word })
//  addSuccess.value = true
//  newWord.value = ''
//  await loadWords()
//  setTimeout(() => (addSuccess.value = false), 3000)
// }

// ➕ Dodaj više riječi
async function handleBulkAddWords() {
  if (user.value?.email !== ownerEmail) return
  const input = bulkWords.value
  if (!input.trim()) return

  let wordsArray = input
    .split(/[\s,]+/)
    .map(word => word.toLowerCase().trim())
    .filter(word => word.length > 1)

  wordsArray = [...new Set(wordsArray)]

  try {
    const batchAdd = wordsArray.map(word =>
      addDoc(collection(db, 'words'), { word })
    )
    await Promise.all(batchAdd)

    bulkWords.value = ''
    bulkAddSuccess.value = true
    await loadWords()
    setTimeout(() => (bulkAddSuccess.value = false), 3000)
  } catch (err) {
    console.error('Greška kod dodavanja riječi:', err)
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  margin: 0;
}
.container {
  max-width: 650px;
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
