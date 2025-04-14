<template>
    <div>
      <h2>Prijava</h2>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Lozinka" type="password" />
      <div>
        <button @click="login">Prijava</button>
      </div>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  
  const emit = defineEmits(['logged-in'])
  
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      emit('logged-in')
    } catch (err) {
      error.value = 'Greška: ' + err.message
    }
  }
  </script>
  