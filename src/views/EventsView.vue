<template>
    <div class="events">
        <div class="event-hero">

        </div>

        <!-- <div class="new-event">
            <h2>Create new event</h2>
            <button @click="switchShow()">Add event</button>
            <popup v-show="notShow">
                <h2>Create event</h2>
            </popup>

        </div> -->

        <div class="event-card-container">
            <div class="event-glow">
                <div v-for="event in events" class="event-card">
                    <div class="event-img-glow">
                        <div class="event-card-img">
                            <img :src="event.imgURL" alt="">
                        </div>
                    </div>
                    <div class="event-card-text">
                        <h3>{{ event.title }}</h3>
                        <p>{{ event.place }}</p>
                        <p>{{ event.date }}</p>
                        <p>{{ event.price }}</p>
                        <!-- <button class="read-more">Læs mere</button> -->
                    </div>
                    <!-- <button @click="deleteEvent(event.id)" class="delete-event">&cross;</button> -->
                </div>
            </div>




        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { db } from '@/firebase'

// new event popup
// import popup from '../components/EventForm.vue'
// import newEventPhoto from '../components/EventForm.vue'



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
onMounted(() => {
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
/* const deleteEvent = id => {
    deleteDoc(doc(collection(db, "events"), id))
} */




</script>

<style scoped>
.events {
    height: 1500px;
    margin: 20px auto;
}

.event-hero {
    height: 500px;
    background-color: green;
    background-image: url(https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80);
    max-width: 100%;
    object-fit: cover;
}

.event-card-container {
    /* background-color: #ffffff25; */
    margin: 40px auto;
    padding: 20px;
    width: 100%;
    /* display: flex;
    flex-wrap: wrap; */

}

.event-card {
    background-color: var(--vt-c-black);
    padding: 20px 60px;
    width: 600px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    transition: all 0.1s;
    cursor: pointer;

    


        /* Cut edges css */

    /* 
        --card-edge-size-h: 4em;
        --card-edge-size-v: 8em;

    clip-path: polygon(var(--card-edge-size-v) 0,
            100% 0,
            100% calc(100% - var(--card-edge-size-h)),
            calc(100% - var(--card-edge-size-v)) 100%,
            0 100%,
            0 var(--card-edge-size-h)); */

    

}

.event-card:first-child {
    --card-edge-size-h: 4em;
    --card-edge-size-v: 8em;

    clip-path: polygon(var(--card-edge-size-v) 0,
            100% 0,
            100% 100%,
            100% 100%,
            0 100%,
            0 var(--card-edge-size-h));
}

.event-card:last-child {
    --card-edge-size-h: 4em;
    --card-edge-size-v: 8em;

    clip-path: polygon(0 0,
            100% 0,
            100% calc(100% - var(--card-edge-size-h)),
            calc(100% - var(--card-edge-size-v)) 100%,
            0 100%,
            0 0);
}

.event-card:hover {
    background-color: var(--vt-c-black-mute);
    transform: scale(1.01)
}


/* Change to event-type color */
.event-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
}

.event-card-img {
    height: 100px;
    width: 200px;


    --img-edge-size-h: 3em;
    --img-edge-size-v: 6.1em;

    clip-path: polygon(var(--img-edge-size-v) 0,
            100% 0,
            100% 100%,
            100% 100%,
            0 100%,
            0 var(--img-edge-size-h));

}

.event-card-img img {
    height: 100px;
    width: 200px;
    object-fit: cover;
}

/* Change to event-type color */
.event-img-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
}

.event-card-text {
    float: right;
    padding-left: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;


}

.event-card-text h3 {
    font-size: var(--fs-medium);
    text-transform: uppercase;
    font-weight: 600;
}

.event-card-text p {
    font-size: var(--fs-small);
}

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