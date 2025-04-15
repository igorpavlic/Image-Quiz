<template>
  <footer>
    <p>&copy; {{ year }} Igor Pavlić</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  margin-top: 40px;
  font-size: 0.9em;
  color: #777;
}
</style>
