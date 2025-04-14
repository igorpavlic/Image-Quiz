<template>
  <div class="container">
    <h1>🧠 Kviz: Prepoznaj predmet</h1>

    <div v-if="imageUrl">
      <h2>Koji je ovo predmet?</h2>
      <img :src="imageUrl" alt="Slika predmeta" />
      <input v-model="userAnswer" placeholder="Upiši naziv" />
      <button @click="checkAnswer">Provjeri</button>
      <p>{{ result }}</p>
      <p>Bodovi: {{ score }}</p>
    </div>

    <div v-else>
      <p>Učitavanje slike...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 🔑 Google Custom Search API podaci
const API_KEY = 'AIzaSyB7IeZUYAroYlY1jCR1lGBF3rnfv126--o'
const CX_ID = '307beb65a74304a9c'

const wordList = ['apple', 'car', 'dog', 'keyboard', 'lamp', 'bike', 'bottle']
const correctWord = ref('')
const userAnswer = ref('')
const result = ref('')
const imageUrl = ref('')
const score = ref(0)

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)]
}

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
  } catch (error) {
    console.error('Greška kod dohvaćanja slike:', error)
    return ''
  }
}

async function loadNewImage() {
  correctWord.value = getRandomWord()
  imageUrl.value = await fetchGoogleImage(correctWord.value)
  userAnswer.value = ''
  result.value = ''
}

function checkAnswer() {
  if (userAnswer.value.toLowerCase() === correctWord.value.toLowerCase()) {
    result.value = '✅ Točno!'
    score.value++
  } else {
    result.value = `❌ Netočno. Točan odgovor: ${correctWord.value}`
  }

  setTimeout(() => {
    loadNewImage()
  }, 2000)
}

onMounted(() => {
  loadNewImage()
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
}
.container {
  max-width: 600px;
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
input {
  padding: 10px;
  margin-top: 10px;
}
button {
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
