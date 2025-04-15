<template>
  <div v-if="isLoading" class="spinner-wrapper">
    <div class="spinner"></div>
    <p class="spinner-text">Generating image...</p>
  </div>
  <div v-else="imageUrl">
    <h2>What do you see?</h2>
    <img :src="imageUrl" />
  </div>
  <div>
    <input v-model="userAnswer" placeholder="Write here" />
    <button @click="checkAnswer">Check</button>
    <p>{{ result }}</p>
    <p>Points: {{ score }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  wordList: Array,
  fetchImage: Function
})

const imageUrl = ref('')
const correctWord = ref('')
const userAnswer = ref('')
const result = ref('')
const score = ref(0)
const isLoading = ref(false)

const loadNewImage = async () => {
  isLoading.value = true
  correctWord.value = props.wordList[Math.floor(Math.random() * props.wordList.length)]
  imageUrl.value = await props.fetchImage(correctWord.value)
  userAnswer.value = ''
  result.value = ''
  isLoading.value = false
}

const checkAnswer = () => {
  if (userAnswer.value.toLowerCase() === correctWord.value.toLowerCase()) {
    result.value = '✅ Correct!'
    score.value++
  } else {
    result.value = `❌ Wrong. Correct answer: ${correctWord.value}`
  }
  setTimeout(loadNewImage, 1000)
}

onMounted(loadNewImage)
</script>

<style scoped>
img {
  width: 275px;
  height: 275px;
  margin: 20px auto;
  display: block;
}
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 8px solid #eee;
  border-top: 8px solid #3e8ed0;
  border-radius: 50%;
  width: 275px;
  height: 275px;
  animation: spin 1s linear infinite;
}

.spinner-text {
  margin-top: 10px;
  font-size: 0.75rem;
  color: #333;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>