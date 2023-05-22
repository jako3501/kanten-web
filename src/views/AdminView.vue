<template>
    <div class="events">

        <div class="new-event">
            <h2>Create new event</h2>
            <button @click="switchShow()">Add event</button>
            <popup v-show="notShow">
                <h2>Create event</h2>
            </popup>

        </div>

        <div class="event-card-container">
            <div v-for="event in events" class="event-card">
                <div class="event-card-img">
                    <img :src="event.imgURL"
                        alt="">
                </div>
                <div class="event-card-text">
                    <h3>{{ event.title }}</h3>
                    <p>{{ event.place }}</p>
                    <p>{{ event.date }}</p>
                    <p>{{ event.price }}</p>
                    <button class="read-more">Læs mere</button>
                </div>
                <button @click="deleteEvent(event.id)" class="delete-event">&cross;</button>
            </div>




        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { db } from '@/firebase'

// new event popup
import popup from '../components/EventForm.vue'
import newEventPhoto from '../components/EventForm.vue'



// events

let notShow = ref(false) 

let switchShow = () => {
    notShow.value = !notShow.value
    console.log(notShow)
}

const events = ref([
    // {
    //     id: 'id1',
    //     title: 'FABRÄK',
    //     place: 'Finsensgade 1, 6700 Esbjerg',
    //     price: '200 DKK',
    //     date: '02/06/2023'
    // },
    // {
    //     id: 'id2',
    //     title: 'Lars Guitarsen',
    //     place: 'Finsensgade 1, 6700 Esbjerg',
    //     price: '9000 DKK',
    //     date: '10/06/2023'
    // }
])

// Get events from firebase
onMounted( () => {
    onSnapshot(collection(db, "events"), (querySnapshot) => {
        const fbEvents = []
        querySnapshot.forEach((doc) => {
            // insert parameters for events from the database here
            const event = {
                id: doc.id,
                title: doc.data().title,
                place: doc.data().place,
                price: doc.data().price,
                date: doc.data().date,
                imgURL: doc.data().imgURL
            }
            fbEvents.push(event)
        })
        events.value = fbEvents
    });
})


// delete event
const deleteEvent = id => {
    deleteDoc(doc(collection(db, "events"), id))
}




</script>

<style scoped>
.new-event {
    margin: 20px auto;
    width: 50%;
    padding: 10px;
}

.new-event h2 {
    text-align: center;
}

.new-event p {
    text-align: center;
}

.new-event button {
    display: block;
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

.events {
    height: 1500px;
    margin: 20px auto;
}

.event-card-container {
    background-color: #ffffff25;
    margin: 40px auto;
    padding: 20px;
    width: 600px;
    border-radius: 15px;
    /* display: flex;
    flex-wrap: wrap; */

}

.event-card {
    /* background-color: blue; */
    padding: 20px;
    display: flex;
    border-radius: 15px;

}

.event-card-img {
    height: 100px;
    width: 200px;

}

.event-card-img img {
    height: 100px;
    width: 200px;
    border-radius: 15px;
}

.event-card-text {
    float: right;
    padding: 0 20px 10px 20px;
    width: 100%;
}

.event-card-text h3 {
    font-size: 25px;
}

.event-card p {}

.event-card-text .read-more {
    float: right;
    background: none;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 15px;
    border-color: #ffffff;
    border-width: 4px;
    cursor: pointer;
    font-size: 15px;
    transform: translateY(-40px);
}

.event-card .delete-event {
    float: left;
    height: 30px;
    transform: scale(150%);
    color: red;
    background: none;
    border: none;
    cursor: pointer;

}
</style>