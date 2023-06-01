<template>
    <div>
        <h1>Sign in to an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email"></p>
        <p><input type="text" placeholder="Password" v-model="password"></p>
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="button-glow">
            <p><button @click="register">Sign in</button></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router';
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

<style scoped>
h1 {
    margin: 50px auto;
}

div {
    height: 500px;
    display: flex;
    justify-content: center;
    place-items: center;
    flex-direction: column;
}

input {
    background-color: var(--vt-c-black-mute);
    border: none;
    height: 40px;
    width: 250px;
    margin: 5px auto;
    color: white;
}

button {
    cursor: pointer;
    background: var(--vt-c-black);
    background-blend-mode: color-burn;
    color: var(--vt-c-white-mute);
    /* box-shadow: 20px 25px 50px -25px var(--vt-c-white-mute); */
    /* box-shadow: inset 0px 0px 10px #fff; */
    /* filter: drop-shadow(10px 10px 20px #FFF); */
    padding: 0.5em 3em;
    font-size: var(--fs-button);
    font-weight: 400;
    letter-spacing: .2ch;
    font-family: Poppins;
    border: none;
    transition: all 0.1s;


    /* edges for buttons */
    --button-edge-size-h: 1.2em;
    --button-edge-size-v: 2.2em;

    clip-path: polygon(var(--button-edge-size-v) 0,
            100% 0,
            100% calc(100% - var(--button-edge-size-h)),
            calc(100% - var(--button-edge-size-v)) 100%,
            0 100%,
            0 var(--button-edge-size-h));
}

button a {
    color: var(--vt-c-white-mute);
}

button a:hover {
    background: none;
}

.button-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
    height: 100px;
    width: 100%;
}

button:hover {
    background-color: var(--vt-c-black-mute);
    transform: scale(1.02);
}
</style>