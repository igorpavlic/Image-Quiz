<template>
  <div>
    <h2>Register</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="register">Register</button>
    <p style="color: red">{{ error }}</p>
    <p><button @click="$emit('toggle')">Have an account? Log In!</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref('')

const emit = defineEmits(['authenticated', 'toggle'])

const register = async () => {
  error.value = ''
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    emit('authenticated')
  } catch (e) {
    error.value = e.message
  }
}
</script>
