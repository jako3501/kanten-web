<template>
    <div class="events">

        <div class="new-event">
            <h2>Create new event</h2>
            <div class="button-glow">
                <button @click="switchShow()">Add event</button>
            </div>
            <popup v-show="notShow">
                <h3>Create event</h3>
            </popup>

        </div>

        <div class="event-card-container">
            <div v-for="event in events" :class="event.type"  class="event-glow">
                <div  class="event-card" :class="event.type">
                    
                    <div class="event-img-glow" :class="event.type">
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
                     <button @click="deleteEvent(event.id)" class="delete-event">&cross;</button> 
        
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
import popup from '../components/EventForm.vue'
import newEventPhoto from '../components/EventForm.vue'



// events

let notShow = ref(false)

let switchShow = () => {
    notShow.value = !notShow.value
    console.log(notShow)
}

const events = ref([
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
                imgURL: doc.data().imgURL,
                type: doc.data().type
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
.DEFT {
    filter: drop-shadow(0 0 5px orange);
}

.X-Massive {
    filter: drop-shadow(0 0 5px green);
}

.Vertex {
    filter: drop-shadow(0 0 5px blue);
}

.Mana-Club {
    filter: drop-shadow(0 0 5px purple);
}

.Andet {
    filter: drop-shadow(0 0 5px var(--vt-c-white-mute));
}


h3 {
    text-align: center;
    padding-top: 20px;
    font-size: var(--fs-medium);
}


.new-event {
    margin: 20% auto 20px auto;
    width: 50%;
    padding: 10px;
}



.new-event h2 {
    text-align: center;
    font-size: var(--fs-medium)
}

.new-event p {
    text-align: center;
}

.new-event button {
    cursor: pointer;
    background: var(--vt-c-black);
    background-blend-mode: color-burn;
    color: var(--vt-c-white-mute);
    /* box-shadow: 20px 25px 50px -25px var(--vt-c-white-mute); */
    /* box-shadow: inset 0px 0px 10px #fff; */
    /* filter: drop-shadow(10px 10px 20px #FFF); */
    padding: 0.5em 2em;
    font-size: var(--fs-button);
    font-weight: 400;
    letter-spacing: .2ch;
    margin: 20px;
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

.button-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
    display: flex;
    justify-content: center;
    /* position: absolute;
  margin-top: 41%; */
}

.events {
    height: 1500px;
    margin: 20px auto;
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
/* .event-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
} */

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
/* .event-img-glow {
    filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
} */

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
    text-align: left;
    color: var(--vt-c-white-mute);
}

.event-card p {
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

button:hover {
    background-color: var(--vt-c-black-mute);
    transform: scale(1.02)
}


@media (max-width: 900px) {
    .new-event {
        width: 60%;
    }
}

@media (max-width: 685px) {
    .new-event {
        width: 70%;
    }
}

@media (max-width: 600px) {
    .new-event {
        width: 80%;
    }
}

@media (max-width: 400px) {
    .new-event {
        width: 90%;
    }
}

@media (max-width: 850px) {

.event-card-container {
  width: 100%;
  margin: 20px 0;
  padding: 20px 0;
  flex-direction: row;
  flex-wrap: wrap;
}

.event-card {
  width: 250px;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px 0;
}

.event-card-text {
width: 200px;
text-align: left;
padding: 0;
}

.event-card-text h3 {
  margin-top: 20px;
}

.event-card-img {
  display: flex;
  justify-content: center;

  clip-path: polygon(0 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 0);
}

.event-card:first-child {
--card-edge-size-h: 4em;
--card-edge-size-v: 8em;

clip-path: polygon(0 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 0);
}

.event-card:last-child {
--card-edge-size-h: 4em;
--card-edge-size-v: 8em;

clip-path: polygon(0 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 0);
}

.event-card:hover {
background-color: var(--vt-c-black-mute);
transform: scale(1.01)
}


.browse-container {
  width: 60%;
}


}

@media (max-width: 685px) {
.browse-container {
  width: 75%;
}
}

@media (max-width: 598px) {
.browse-container {
  width: 80%;
  flex: 1 1 40%;
}

.footer-item {
  margin-bottom: 40px;
}
}

@media (max-width: 330px) {
.event-card {
  width: 220px;
}
}
</style>