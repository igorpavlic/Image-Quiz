<template>
  <div>
    <h2>Log In</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="login">Log In</button>
    <p style="color: red">{{ error }}</p>
    <p><button @click="$emit('toggle')">No Account? Register!</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref('')

const emit = defineEmits(['authenticated', 'toggle'])

const login = async () => {
  error.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    emit('authenticated')
  } catch (e) {
    error.value = e.message
  }
}
</script>
