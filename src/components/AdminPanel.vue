<template>
    <div class="admin-panel">
        <a href="#" @click.prevent="showForm = !showForm">
            {{ showForm ? '❌ Close' : '➕ Add Words' }}
        </a>
  
      <div v-if="showForm" class="form-popup">
        <textarea
          v-model="bulkWords"
          rows="6"
          cols="40"
          placeholder="like: dog, car, ball, ..."
        ></textarea>
        <br />
        <button @click="addMultiple">Add Words</button>
        <p style="color: green" v-if="bulkAddSuccess">✅ Words Added!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { db } from '../firebase'
  import { addDoc, collection } from 'firebase/firestore'
  
  const emit = defineEmits(['refresh'])
  
  const bulkWords = ref('')
  const bulkAddSuccess = ref(false)
  const showForm = ref(false)
  
  const addMultiple = async () => {
    let words = bulkWords.value
      .split(/[\s,]+/)
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length > 1)
    words = [...new Set(words)]
    const batch = words.map(w => addDoc(collection(db, 'words'), { word: w }))
    await Promise.all(batch)
    bulkWords.value = ''
    bulkAddSuccess.value = true
    emit('refresh')
    setTimeout(() => (bulkAddSuccess.value = false), 2000)
  }
  </script>
  