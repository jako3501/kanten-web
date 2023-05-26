<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { db } from '@/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router';


// SIGN OUT FUNCTION
const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
signOut(auth).then(() => {
  router.push('/')
})
}

</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
        <RouterLink to="/kraftvaerket">Kraftværket</RouterLink>
        <RouterLink to="/merch">Merch</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/admin" v-if="isLoggedIn">Admin</RouterLink>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
      </nav>
    </div>
  </header>
  <RouterView />

  
</template>


<style scoped>

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0;
  background-color: var(--vt-c-black-mute);
  position: fixed;
  top: 0;
  z-index: 10;
}

nav a {
  display: inline-block;
  padding: 1rem;
  color: var(--vt-c-white-mute);
  /* border-left: 1px solid var(--color-border); */
}

nav a:first-of-type {
  border: 0;
}
</style>
