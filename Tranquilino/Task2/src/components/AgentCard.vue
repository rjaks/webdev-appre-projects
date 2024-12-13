<template>
  <div
    class="card-container cursor-pointer overflow-hidden"
    @mouseover="hoverImage"
    @mouseleave="hoverOutImage"
    ref="card"
  >
    <div class="background-image absolute-full" ref="bgImage"></div>
    <div class="img-agent flex items-center justify-center">
      <img :src="agentPortrait" class="agent-image" ref="imageAgent" />
    </div>

    <div class="agent-name absolute flex justify-center items-center q-pt-md">
      <h1 ref="nameAgent" class="text-white text-center">{{ agentName }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";

interface Props {
  data: {
    displayName: string;
    fullPortrait: string;
  };
}
const props = defineProps<Props>();
const agentName = ref(props.data.displayName.toUpperCase());
const agentPortrait = ref(props.data.fullPortrait);

const imageAgent = ref<HTMLElement | null>();
const nameAgent = ref<HTMLElement | null>();
const bgImage = ref<HTMLElement | null>();

const hoverImage = () => {
  if (imageAgent.value) {
    gsap.to(imageAgent.value, {
      duration: 0.3,
      scale: 1.1,
      ease: "power2.inOut",
    });
  }

  if (bgImage.value) {
    gsap.to(bgImage.value, {
      duration: 0.3,
      filter: "none",
      ease: "power2.inOut",
    });
  }

  if (nameAgent.value) {
    gsap.to(nameAgent.value, {
      duration: 0.3,
      scale: 1.2,
      ease: "power2.inOut",
    });
  }
};

const hoverOutImage = () => {
  if (imageAgent.value) {
    gsap.to(imageAgent.value, {
      duration: 0.3,
      scale: 1,
      ease: "power2.inOut",
    });
  }

  if (bgImage.value) {
    gsap.to(bgImage.value, {
      duration: 0.3,
      filter: "contrast(0)",
      ease: "power2.inOut",
    });
  }

  if (nameAgent.value) {
    gsap.to(nameAgent.value, {
      duration: 0.3,
      scale: 1,
      ease: "power2.inOut",
    });
  }
};
</script>

<style scoped>
.card-container {
  background-color: #19222d;
}
h1 {
  font-size: 20px;
}

.background-image {
  background-image: url("../assets/Background/VALORANT_TEXT-bg.png");
  background-size: 55%;
  background-repeat: no-repeat;
  background-position: center;
  filter: contrast(0);
  z-index: 1;
}

.agent-image {
  width: 300%;
  z-index: 2;
}

.agent-name {
  font-family: "Tungsten";
  top: 60%;
  height: 40%;
  width: 100%;
  background: rgb(244, 67, 78);
  background: linear-gradient(
    0deg,
    rgba(244, 67, 78, 1) 0%,
    rgba(244, 67, 78, 0) 100%
  );
  z-index: 2;
}

.agent-name h1 {
  font-size: 30px;
  letter-spacing: 1px;
  z-index: 2;
  position: inherit;
}

@media (min-width: 576px) {
  .agent-name h1 {
    font-size: 40px;
  }
}

@media (min-width: 768px) {
  .agent-name h1 {
    font-size: 55px;
  }
}

@media (min-width: 992px) {
  .agent-name h1 {
    font-size: 45px;
  }
}
</style>
