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
          <form action="#">
            <label for="lang">Event type</label>
            <select v-model="newEventType" name="type" id="event">
              <option value="DEFT">DEFT</option>
              <option value="Mana-Club">Mana Club</option>
              <option value="X-Massive">X-Massive</option>
              <option value="Vertex">Vertex</option>
              <option value="Andet">Andet</option>
            </select>
          </form>

          <input type="file" label="File input" @change="uploadImg">

          <!-- :disabled = restricting button until all inputs are filled -->
          <div class="button-glow">
            <button
              :disabled="!newEventTitle || !newEventDescription || !newEventDate || !newEventPlace || !newEventPrice || !newEventType"
              class="new-event-create">Create event</button>
          </div>

        </form>

      </div>



      <!-- <button class="new-event-close">Close window</button> -->

    </div>
  </div>
</template>

<script setup>
import { ref as refVue } from 'vue'
import { collection, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db } from '@/firebase'


// Add Event

// text input in forms
const newEventTitle = refVue('')
const newEventDescription = refVue('')
const newEventDate = refVue('')
const newEventPlace = refVue('')
const newEventPrice = refVue('')
const newEventPhoto = refVue('')
const newEventType = refVue('')

// create event function + db connection
const addEvent = () => {

  addDoc(collection(db, "events"), {
    title: newEventTitle.value,
    description: newEventDescription.value,
    date: newEventDate.value,
    place: newEventPlace.value,
    price: newEventPrice.value,
    imgURL: newEventPhoto.value,
    type: newEventType.value
  })
  newEventTitle.value = ''
  newEventDescription.value = ''
  newEventDate.value = ''
  newEventPlace.value = ''
  newEventPrice.value = ''
  newEventPhoto.value = ''
  newEventType.value = ''
}

const storage = getStorage();

// Firebase storage upload image + get download URL + enable button after image uploaded
const uploadImg = async (event) => {
  let file = event.target.files[0]; // get the file
  console.log("file", file)
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);

        newEventPhoto.value = downloadURL
        // addItemData.imgURL = downloadURL // update variable imgURL and put the image URL link in it. 
        // addItemData.uploadBtnDisabled = false // enable button after image uploaded is complete
      });
    }
  );
}




</script>

<style scoped>


.popup {
  /* position: absolute; */
  transform: translateX(-50%);
  top: 50%;
  left: 50%;
}

.popup-inner {
  background-color: var(--vt-c-black-mute);
  width: 60%;
  margin: 10px auto;

  --button-edge-size-h: 4em;
  --button-edge-size-v: 8em;

  clip-path: polygon(var(--button-edge-size-v) 0,
      100% 0,
      100% calc(100% - var(--button-edge-size-h)),
      calc(100% - var(--button-edge-size-v)) 100%,
      0 100%,
      0 var(--button-edge-size-h));
}

.event-form {
  display: flex;
  justify-content: center;
  /* margin-left: auto;
  margin-right: auto; */
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.event-form form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}


input {
  background-color: var(--vt-c-black);
  border: none;
  height: 40px;
  width: 70%;
  margin: 5px auto;
  color: white;
}

select {
  background-color: var(--vt-c-black);
  border: none;
  height: 40px;
  width: 70%;
  margin: 10px auto;
  color: white;
}

label {
  text-align: center;
  margin-top: 10px;
}

button {
  cursor: pointer;
  background: var(--vt-c-black-mute);
  background-blend-mode: color-burn;
  color: var(--vt-c-white-mute);
  /* box-shadow: 20px 25px 50px -25px var(--vt-c-white-mute); */
  /* box-shadow: inset 0px 0px 10px #fff; */
  /* filter: drop-shadow(10px 10px 20px #FFF); */
  padding: 0.5em 2em;
  margin: 20px auto 40px auto;
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

button:hover {
  background-color: var(--vt-c-black);
  transform: scale(1.02);
}

.button-glow {
  filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
  display: flex;
  justify-content: center;
  /* position: absolute;
  margin-top: 41%; */
}

@media (max-width: 1350px) {
  .popup-inner {
    width: 80%;
  }
}

@media (max-width: 1000px) {
  .popup-inner {
    width: 90%;
  }
}

@media (max-width: 400px) {
    .popup-inner input {
        height: 30px;
    }

    .popup-inner select {
        height: 30px;
    }
}

</style>