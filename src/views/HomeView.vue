<script setup>

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
        <button class="read-more">Læs mere</button>
      </div>
      <div class="arrow">
        <span></span>
        <span></span>
      </div>
    </div>
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
  height: 700px;
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

.button-glow {
  filter: drop-shadow(0 0 4px var(--vt-c-white-mute));
  position: absolute;
  margin-top: 41%;
}

button:hover {
  background-color: var(--vt-c-black-mute);
  transform: scale(1.02);
}

.arrow {
  display: flex;
  margin-top: 46%;
  position: absolute;
  opacity: 50%;
}

span {
  
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
}</style>


