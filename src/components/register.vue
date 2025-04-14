<template>
  <div>
    <h2>Registracija</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Lozinka" type="password" />
    <div>
      <button @click="register">Registriraj se</button>
    </div>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref('')

const emit = defineEmits(['registered'])

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    emit('registered')
  } catch (err) {
    error.value = 'Greška: ' + err.message
  }
}
</script>
