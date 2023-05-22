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

          <input type="file" label="File input" @change="uploadImg">

          <!-- :disabled = restricting button until all inputs are filled -->
          <button :disabled="!newEventTitle || !newEventDescription || !newEventDate || !newEventPlace || !newEventPrice"
            class="new-event-create">Create event</button>

        </form>

      </div>



      <button class="new-event-close">Close window</button>

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

// create event function + db connection
const addEvent = () => {

  addDoc(collection(db, "events"), {
    title: newEventTitle.value,
    description: newEventDescription.value,
    date: newEventDate.value,
    place: newEventPlace.value,
    price: newEventPrice.value,
    imgURL: newEventPhoto.value
  })
  newEventTitle.value = ''
  newEventDescription.value = ''
  newEventDate.value = ''
  newEventPlace.value = ''
  newEventPrice.value = ''
  newEventPhoto.value = ''
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
  background-color: green;
  width: 100%;
}

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