<template>
    <div>
        <h1>Sign in to an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email"></p>
        <p><input type="text" placeholder="Password" v-model="password"></p>
        <p v-if="errMsg">{{ errMsg }}</p>
        <p><button @click="register">Sign in</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {useRouter} from 'vue-router';
const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter()

// SIGN IN AUTH
const register = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log(data)
            console.log(auth.currentUser)
            router.push('/admin')
        })
        .catch((error) => {
            console.log(error.code)
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errMsg.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errMsg.value = 'No account with that email was found'
                    break
                case 'auth/wrong-password':
                    errMsg.value = 'Incorrect password'
                    break
            }

            alert(error.message)
        })
}

</script>

<style scoped></style>