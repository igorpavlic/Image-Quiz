<template>
  <div style="display: none"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import axios from 'axios'

// const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
// const GOOGLE_CX_ID = import.meta.env.VITE_GOOGLE_CX_ID
const DEEPAI_API_KEY = import.meta.env.VITE_DEEPAI_API_KEY

// Emits
const emit = defineEmits(['wordsLoaded', 'imageFetcherReady'])

// Funkcija za dohvat riječi
const loadWords = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'words'))
    const words = snapshot.docs.map(doc => doc.data().word)
    emit('wordsLoaded', words)
  } catch (err) {
    console.error('Greška kod učitavanja riječi:', err)
    emit('wordsLoaded', [])
  }
}

// Funkcija za dohvat slike Google Custom Search API
/*
const fetchImage = async (query) => {
    const params = new URLSearchParams({
      key: GOOGLE_API_KEY,
      cx: GOOGLE_CX_ID,
      q: query,
      searchType: 'image',
      num: '1'
    })

    const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`)
    const data = await response.json()
    return data.items?.[0]?.link || ''
}
  */

// Funkcija za generiranje slike pomoću DeepAI API-ja
const fetchImage = async (prompt) => {
    const response = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
        'Api-Key': DEEPAI_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ text: prompt })
    })

    const data = await response.json()
    return data.output_url || ''
}

// Pozovi kod mountanja
onMounted(() => {
  loadWords()
  emit('imageFetcherReady', fetchImage)
})
</script>
