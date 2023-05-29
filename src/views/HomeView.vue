<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { db } from '@/firebase'
import { RouterLink, RouterView } from 'vue-router'

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

</script>

<template>
  <main>
    <div class="herobox">
      <img src="../assets/img/party-4114985_1920.jpg" alt="">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.55 229.9">
        <defs></defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_2-2" data-name="Layer 2">
            <path
              d="M268.55,37.43h0L203.73,0,0,117.62v74.86l60.19,34.75h0l4.63,2.67,4.63-2.67h0l199.1-114.95h0ZM203.73,10.7,250,37.43,64.82,144.36l-46.3-26.74ZM9.26,187.17V123l50.93,29.41v64.16Zm250-80.24L69.45,216.54V152.38L259.29,42.77v64.16Z" />
            <polygon
              points="137.37 143.36 137.32 123.64 147.66 117.67 147.78 160.98 126.39 153.99 126.44 172.71 116.15 178.66 116.03 136.34 137.37 143.36" />
            <polygon
              points="182.46 97.89 182.49 108.77 173.21 114.13 173.29 145.66 162.7 151.78 162.61 120.25 153.33 125.61 153.3 114.72 182.46 97.89" />
            <polygon
              points="212.42 80.28 212.45 91.48 198.68 99.43 198.69 104.99 210.5 98.18 210.52 107.74 198.72 114.55 198.74 120.75 213.26 112.37 213.29 122.57 188.22 137.04 188.11 94.31 212.42 80.28" />
            <polygon
              points="240.92 83.57 240.87 63.85 251.21 57.88 251.32 102.33 229.93 94.21 229.99 112.93 219.7 118.87 219.58 76.56 240.92 83.57" />
            <g class="cls-1">
              <polygon
                points="92.61 146.7 75.32 202.45 87.15 195.56 94.26 171.09 101.87 187.13 111.13 181.78 92.61 146.7" />
            </g>
            <polygon
              points="53.84 159.4 39.54 169.62 52.86 201.57 40.88 194.66 32.7 174.62 28.77 177.34 28.72 187.63 18.53 181.78 18.53 139.01 28.71 144.86 28.82 163.86 43.66 153.49 53.84 159.4" />
          </g>
        </g>
      </svg>
      <h1>Esbjergs nye kulturfællesskab</h1>
      <div class="button-glow">
        <button class="read-more">
          <RouterLink to="/about">Læs mere</RouterLink>
        </button>
      </div>
      <div class="arrow">
        <span class="arrows"></span>
        <span class="arrows"></span>
      </div>
    </div>

    <div class="events">
      <div class="event-heading">
        <p>Upcoming</p>
        <h2>Events</h2>
      </div>
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
      <p>Click <RouterLink to="/events">here</RouterLink> to see all events</p>
    </div>

    <div class="browse-container">

      <RouterLink to="/events" class="browse-item">
        <h3>Events</h3>
      </RouterLink>


      <RouterLink to="/volunteer" class="browse-item">
        <h3>Volunteer</h3>
      </RouterLink>


      <RouterLink to="kraftvarket" class="browse-item">
        <h3>Kraftværket</h3>
      </RouterLink>


      <RouterLink to="about" class="browse-item">
        <h3>About</h3>
      </RouterLink>

    </div>



    <!--End mc_embed_signup-->

    <footer>
      <div class="footer-item">
        <h4>Find os på</h4>
        <p>Finsensgade 1</p>
        <p>6700, Esbjerg</p>
        <h4>Kontakt</h4>
        <p>MAIL: husmail@kanten.dk</p>
        <p>TLF: (+45) xx xx xx xx</p>
        <p>CVR: xx xx xx xx</p>
      </div>
      <div class="footer-item">
        <p>Tilmeld dig vores</p>
        <h4>Nyhedsbrev</h4>
        <div class="footer-glow">

          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <form
              action="https://gmail.us9.list-manage.com/subscribe/post?u=398bc3c070cb723809534dd0b&amp;id=b9adaf1e74&amp;f_id=00132be1f0"
              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
              target="_self">
              <div id="mc_embed_signup_scroll">
                <!-- <h2>Subscribe</h2> -->
                <!-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> -->
                <div class="mc-field-group">
                  <!-- <label for="mce-EMAIL">Email Address <span class="asterisk">*</span>
            </label> -->
                  <input type="email" placeholder="E-mail" value="" name="EMAIL" class="required email" id="mce-EMAIL"
                    required>
                  <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
                </div>
                <div id="mce-responses" class="clear foot">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
                    name="b_398bc3c070cb723809534dd0b_b9adaf1e74" tabindex="-1" value=""></div>
                <div class="optionalParent">
                  <div class="clear foot">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                    <!-- <p class="brandingLogo"><a href="http://eepurl.com/isft2c"
                  title="Mailchimp - email marketing made easy and fun"><img
                    src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"></a></p> -->
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- <input class="nyhedsbrev-input" type="text" placeholder="E-mail">

          <br>

          <button>Tilmeld</button> -->
        </div>
      </div>
      <div class="footer-item">
        <h4>Sociale Medier</h4>
        <svg class="fb" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
        </svg>
        <svg class="ig" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zm-3.233 10.62c-2.269 0-4.108-1.839-4.108-4.108 0-2.269 1.84-4.108 4.108-4.108s4.108 1.839 4.108 4.108c0 2.269-1.839 4.108-4.108 4.108zm4.271-7.418c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96zm-1.604 3.31c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667zm4.333-12h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654-.039-.853-.048-1.125-.048-3.298 0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653.854-.04 1.125-.049 3.298-.049s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z" />
        </svg>
        <br>
        <svg class="logo-small" width="100" height="100" viewBox="0 0 129.65 149.7">
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_2-2" data-name="Layer 2">
              <path
                d="M129.65,37.43h0L64.82,0,0,37.43v74.85L60.19,147h0l4.63,2.67L69.45,147h0l60.19-34.75h0ZM64.82,10.7l46.3,26.73L64.82,64.16,18.52,37.43ZM9.26,107V42.78L60.19,72.19v64.15Zm111.12,0L69.45,136.34V72.18l50.93-29.41v64.16Z" />
              <polygon
                points="53.83 79.21 39.54 89.42 52.85 121.38 40.88 114.46 32.7 94.42 28.76 97.14 28.72 107.44 18.52 101.58 18.53 58.81 28.71 64.66 28.81 83.67 43.65 73.3 53.83 79.21" />
            </g>
          </g>
        </svg>

      </div>
    </footer>
  </main>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.herobox {
  margin-top: 51px;
  width: 100%;
  display: flex;
  place-items: center;
  flex-direction: column;
  position: relative;

}

.herobox img {
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  z-index: -1;
  filter: brightness(65%);
  max-height: 1250px;
}

.herobox svg {
  fill: var(--vt-c-white-mute);
  width: 25%;
  height: auto;
  margin: 7% auto;
  z-index: 1;
  position: absolute;
}

.herobox h1 {
  color: var(--vt-c-white-mute);
  font-weight: 700;
  position: absolute;
  margin-top: 35%;
  font-size: var(--fs-large);
}

.herobox button {
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
  ;
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

.herobox button a {
  color: var(--vt-c-white-mute);
}

.herobox button a:hover {
  background: none;
}

.button-glow {
  filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
  position: absolute;
  margin-top: 41%;
}

.herobox button:hover {
  background-color: var(--vt-c-black-mute);
  transform: scale(1.02);
}

/* Arrow below */
.arrow {
  display: flex;
  margin-top: 46%;
  position: absolute;
  opacity: 50%;
}

.arrows {
  width: 5px;
  height: 28px;
  /* border-radius: 5px; */
  background-color: var(--vt-c-white-mute);
  margin: 6px;
  animation: move 1.1s infinite ease-in-out;
}

span:nth-child(1) {
  transform: rotate(-45deg);
}

span:nth-child(2) {
  transform: rotate(45deg);
}

/* Arrow animation */
@keyframes move {
  0% {
    margin-top: 0;
  }

  50% {
    margin-top: 20px;
  }

  100% {
    margin-top: 0;
  }
}

.events {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10%;
  flex-direction: column;
}

.event-heading p {
  background: none;
  text-align: center;
  font-size: var(--fs-medium);
  text-transform: uppercase;
  line-height: 0;
  letter-spacing: 4px;
}

.event-heading h2 {
  text-align: center;
  font-size: var(--fs-xl);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vt-c-white-mute);
}

.event-card-container {
  /* background-color: #ffffff25; */
  margin: 40px auto 0 auto;
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
  color: var(--vt-c-white-mute);
  text-transform: uppercase;
  font-weight: 600;
}

.event-card-text p {
  font-size: var(--fs-small);
}

.browse-container {
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto 100px auto;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 400px;
  filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
}

.browse-item {
  background-color: var(--vt-c-black);
  color: var(--vt-c-white-mute);
  height: auto;
  aspect-ratio: 1;
  /* width: 200px; */
  margin: 10px;
  /* flex-basis: 100%; */
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
}

.browse-item:first-child {
  --browse-edge-size-h: 4em;
  --browse-edge-size-v: 8em;

  clip-path: polygon(var(--browse-edge-size-v) 0,
      100% 0,
      100% 100%,
      100% 100%,
      0 100%,
      0 var(--browse-edge-size-h));
}

.browse-item:last-child {
  --browse-edge-size-h: 4em;
  --browse-edge-size-v: 8em;

  clip-path: polygon(0 0,
      100% 0,
      100% calc(100% - var(--browse-edge-size-h)),
      calc(100% - var(--browse-edge-size-v)) 100%,
      0 100%,
      0 0);
}

.browse-item:hover {
  background-color: var(--vt-c-black-mute);
  transform: scale(1.02)
}

footer {
  /* height: 300px; */
  background-color: var(--vt-c-black-mute);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 50px;
  flex: 1 1 30%;
}

footer .footer-item {
  padding: 10px;
}

footer h4 {
  color: var(--vt-c-white-mute);
  text-transform: uppercase;
  font-size: var(--fs-medium-small);
  font-weight: 600;
}

footer p {
  font-size: var(--fs-small)
}

footer h4:nth-child(2) {
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

footer p:nth-child(1) {
  text-align: center;
  text-transform: uppercase;
  line-height: 5px;
  letter-spacing: 1px;
}



footer .email {
  background-color: var(--vt-c-black-mute);
  border: none;
  border-radius: 0;
  color: var(--vt-c-white-mute);
  text-align: center;
  font-size: var(--fs-input);
  font-weight: 400;
  letter-spacing: .2ch;
  padding: 0.5em 2em;
  height: 30px;
  width: 90%;

  --button-edge-size-h: 1.2em;
  --button-edge-size-v: 2.2em;

  clip-path: polygon(var(--button-edge-size-v) 0,
      100% 0,
      100% 100%,
      100% 100%,
      0 100%,
      0 var(--button-edge-size-h));
}

footer .button {
  cursor: pointer;
  background: var(--vt-c-black-mute);
  background-blend-mode: color-burn;
  color: var(--vt-c-white-mute);
  /* box-shadow: 20px 25px 50px -25px var(--vt-c-white-mute); */
  /* box-shadow: inset 0px 0px 10px #fff; */
  /* filter: drop-shadow(10px 10px 20px #FFF); */
  padding: auto;
  margin-top: 20px;
  max-width: 100%;
  height: 30px;
  font-size: var(--fs-input);
  font-weight: 400;
  letter-spacing: .2ch;
  width: 90%;
  font-family: Poppins;
  border: none;
  transition: all 0.1s;


  /* edges for buttons */
  --button-edge-size-h: 1.2em;
  --button-edge-size-v: 2.2em;

  clip-path: polygon(0 0,
      100% 0,
      100% calc(100% - var(--button-edge-size-h)),
      calc(100% - var(--button-edge-size-v)) 100%,
      0 100%,
      0 0);

}

.footer-glow {
  filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

footer .button a {
  color: var(--vt-c-white-mute);
}

footer .button a:hover {
  background: none;
}

footer .button:hover {
  background-color: var(--vt-c-black);
  transform: scale(1.02);
}






@media (max-width: 850px) {
  .browse-container {
    width: 60%;
  }
}

@media (max-width: 685px) {
  .browse-container {
    width: 75%;
  }
}

@media (max-width: 550px) {
  .browse-container {
    width: 80%;
    flex: 1 1 40%;
  }
}
</style>


