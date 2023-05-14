<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <div class="event-form">
                <form @submit.prevent="addEvent">
                    <!-- v-model = link to JSS "text input in forms" -->
                    <input v-model="newEventTitle" class="title" type="text" placeholder="Title">
                    <input v-model="newEventDescription" class="decription" type="text" placeholder="Description">
                    <input v-model="newEventDate" class="date" type="text" placeholder="Date">
                    <input v-model="newEventPlace" class="place" type="text" placeholder="Place">
                    <input v-model="newEventPrice" class="price" type="text" placeholder="Price">

                    <!-- :disabled = restricting button until all inputs are filled -->
                    <button
                        :disabled="!newEventTitle || !newEventDescription || !newEventDate || !newEventPlace || !newEventPrice"
                        class="new-event-create">Create event</button>

                </form>
            </div>

            <button class="new-event-close">Close window</button>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from "firebase/firestore"
import { db } from '@/firebase'

// Add Event


// text input in forms
const newEventTitle = ref('')
const newEventDescription = ref('')
const newEventDate = ref('')
const newEventPlace = ref('')
const newEventPrice = ref('')

// create event function + db connection
const addEvent = () => {

    addDoc(collection(db, "events"), {
        title: newEventTitle.value,
        description: newEventDescription.value,
        date: newEventDate.value,
        place: newEventPlace.value,
        price: newEventPrice.value
    })
    newEventTitle.value = ''
    newEventDescription.value = ''
    newEventDate.value = ''
    newEventPlace.value = ''
    newEventPrice.value = ''
}




</script>

<style scoped>
.event-form {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 25%;
    margin-top: 20px;
    margin-bottom: 20px;
}

input {
    background-color: #000000;
    border: solid 2px #ffffff25;
    height: 30px;
    margin: 5px;
    color: white;
}

button {
    display: flex;
    flex-flow: row wrap;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    background: none;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 15px;
    border-color: #ffffff;
    border-width: 4px;
    cursor: pointer;
    font-size: 15px;
}
</style>