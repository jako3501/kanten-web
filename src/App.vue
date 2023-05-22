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
        <RouterLink to="/admin">Admin</RouterLink>
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

div .field {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 400px;
}

.input {
  align-items: center;
  margin: 10px;
  width: 350px;
  height: 25px;
}

.card {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.card-green {
  background-color: rgb(106, 147, 106);
  display: flex;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}

.card p {
  float: left;
}

.card .text-green p {
  float: left;
  color: green;
  text-decoration: line-through;
}



.card .button-y {
  background-color: lightgrey;
  border: none;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.card .button-y-green {
  background-color: rgb(87, 116, 54);
  border: none;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}



.card .button-n {
  background-color: red;
  border: none;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.button {
  padding: 10px;
  cursor: pointer;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
