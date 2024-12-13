<template>
  <q-layout view="lHh Lpr lFf" class="bg-accent">
    <div v-if="screenWidth > 1100">
      <DesktopAgentInfo />
    </div>

    <div v-else class="text-white info-container q-pt-sm">
      <NavBar />
      <div class="back-button q-mt-xl">
        <router-link
          :to="{
            path: '/',
          }"
        >
          <q-btn
            align="left"
            class="btn-fixed-width q-mt-lg q-mb-lg q-ml-md"
            style="font-family: 'Tungsten'"
            color="accent"
            icon="arrow_back"
            ><span class="back-text q-ml-sm">BACK</span></q-btn
          >
        </router-link>
      </div>

      <div
        class="main-info-container q-pt-xl justify-center items-center q-mr-lg q-ml-lg"
      >
        <div class="main-info-text column items-center justify-center">
          <p class="role-title q-ma-none">
            {{ agentData.role.displayName.toUpperCase() }}
          </p>
          <h1 class="agent-title-name">
            {{ agentData.displayName.toUpperCase() }}
          </h1>
          <div class="horizontal-line">
            <hr class="name-line no-border bg-primary q-ma-none" />
          </div>
          <p class="desc text-center q-pr-lg q-pl-lg">
            {{ agentData.description }}
          </p>
        </div>

        <div
          class="mainInfo-img no-repeat flex items-center justify-center q-mt-xl"
          :style="{ backgroundImage: `url(${agentData.background})` }"
        >
          <img
            class="agentImg"
            :alt="agentData.displayName"
            :src="agentData.fullPortraitV2"
          />
        </div>
      </div>

      <div
        class="abilities-container row q-mt-md q-mb-md q-pt-xl flex items-center justify-center"
      >
        <h1 class="special-abilities q-mb-sm text-center col-12">
          SPECIAL ABILITIES
        </h1>
        <hr class="line-abilities no-border" />
        <div class="abilities q-mt-lg">
          <div
            class="ability-1"
            @click="toggleAbility(1)"
            @mouseover="hoverSkill(1)"
            @mouseleave="removeHover(1)"
          >
            <div
              class="key flex items-center justify-center q-mb-sm"
              :style="abilitiesBG[0]"
              ref="key1"
            >
              C
            </div>
            <div class="skillImg" ref="ability1" :style="skillImgBg">
              <img
                :src="agentData.abilities[0].displayIcon"
                :alt="agentData.abilities[0].displayName"
                class="ability-image1"
                ref="abilityImage1"
              />
            </div>
          </div>

          <div
            class="ability-2"
            @click="toggleAbility(2)"
            @mouseover="hoverSkill(2)"
            @mouseleave="removeHover(2)"
          >
            <div
              class="key flex items-center justify-center q-mb-sm"
              :style="abilitiesBG[1]"
              ref="key2"
            >
              Q
            </div>
            <div class="skillImg" ref="ability2" :style="skillImgBg">
              <img
                :src="agentData.abilities[1].displayIcon"
                :alt="agentData.abilities[1].displayName"
                class="ability-image2"
                ref="abilityImage2"
              />
            </div>
          </div>

          <div
            class="ability-3"
            @click="toggleAbility(3)"
            @mouseover="hoverSkill(3)"
            @mouseleave="removeHover(3)"
          >
            <div
              class="key flex items-center justify-center q-mb-sm"
              :style="abilitiesBG[2]"
              ref="key3"
            >
              E
            </div>
            <div class="skillImg" ref="ability3" :style="skillImgBg">
              <img
                :src="agentData.abilities[2].displayIcon"
                :alt="agentData.abilities[2].displayName"
                class="ability-image3"
                ref="abilityImage3"
              />
            </div>
          </div>

          <div
            class="ability-4"
            @click="toggleAbility(4)"
            @mouseover="hoverSkill(4)"
            @mouseleave="removeHover(4)"
          >
            <div
              class="key flex items-center justify-center q-mb-sm"
              :style="abilitiesBG[3]"
              ref="key4"
            >
              X
            </div>
            <div class="skillImg" ref="ability4" :style="skillImgBg">
              <img
                :src="agentData.abilities[3].displayIcon"
                :alt="agentData.abilities[3].displayName"
                class="ability-image4"
                ref="abilityImage4"
              />
            </div>
          </div>
        </div>

        <div class="ability-detail text-center">
          <h2>{{ skillData.displayName.toUpperCase() }}</h2>
          <p>{{ skillData.description }}</p>
        </div>

        <div class="agent-role flex justify-between items-center q-mt-xl">
          <div class="role-text text-left" style="width: 50%">
            <h1>{{ agentData.role.displayName.toUpperCase() }}</h1>
            <hr class="role-line" />
            <p class="q-mt-lg">{{ agentData.role.description }}</p>
          </div>

          <div class="role-img">
            <img
              :src="agentData.role.displayIcon"
              :alt="agentData.role.displayName"
              style="width: 90px"
            />
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import Search from "src/components/Search.vue";
import NavBar from "../pages/NavBar.vue";
import DesktopAgentInfo from "./DesktopAgentInfo.vue";

const route = useRoute();
const agentData = ref(JSON.parse(route.query.data));

console.log("AGENT: ", agentData);

defineOptions({
  name: "AgentInfo",
});

const leftDrawerOpen = ref(false);

const screenWidth = ref(window.innerWidth);

const updateWidth = () => {
  screenWidth.value = window.innerWidth; // Update screenWidth on resize
};

// Add event listener when the component is mounted
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

// Remove event listener when the component is destroyed
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const abilitiesBG = ref<string[]>([
  "background-color: #FF4654;",
  "background-color: #757575;",
  "background-color: #757575;",
  "background-color: #757575;",
]);

const skillData = ref(agentData.value.abilities[0]);
const skillImgBg = ref("background-color: #1D1D1D");

//Ability Image
const abilityImage1 = ref();
const abilityImage2 = ref();
const abilityImage3 = ref();
const abilityImage4 = ref();

const toggleAbility = (num: number) => {
  skillImgBg.value = "background-color: #1D1D1D";
  abilitiesBG.value = abilitiesBG.value.map((_, index) =>
    index === num - 1
      ? "background-color: #FF4654;"
      : "background-color: #757575;"
  );
  skillData.value = agentData.value.abilities[num - 1];
  removeHover(num);
};

const hoverSkill = (num: number) => {
  if (abilitiesBG.value[num - 1] !== "background-color: #FF4654;") {
    switch (num) {
      case 1:
        gsap.to(abilityImage1.value, {
          duration: 0.2,
          scale: 1.2,
          ease: "power2.inOut",
        });
        break;
      case 2:
        gsap.to(abilityImage2.value, {
          duration: 0.2,
          scale: 1.2,
          ease: "power2.inOut",
        });
        break;
      case 3:
        gsap.to(abilityImage3.value, {
          duration: 0.2,
          scale: 1.2,
          ease: "power2.inOut",
        });
        break;
      case 4:
        gsap.to(abilityImage4.value, {
          duration: 0.2,
          scale: 1.2,
          ease: "power2.inOut",
        });
        break;
    }
  }
};

const removeHover = (num: number) => {
  switch (num) {
    case 1:
      gsap.to(abilityImage1.value, {
        duration: 0.2,
        scale: 1,
        ease: "power2.inOut",
      });
      break;
    case 2:
      gsap.to(abilityImage2.value, {
        duration: 0.2,
        scale: 1,
        ease: "power2.inOut",
      });
      break;
    case 3:
      gsap.to(abilityImage3.value, {
        duration: 0.2,
        scale: 1,
        ease: "power2.inOut",
      });
      break;
    case 4:
      gsap.to(abilityImage4.value, {
        duration: 0.2,
        scale: 1,
        ease: "power2.inOut",
      });
      break;
  }
};
</script>
<style scoped>
.info-container {
  background-color: #01061e;
  width: 100%;
  height: auto;
  padding-bottom: 100px;
  background-image: url("../assets/Background/SideBG.png");
  background-repeat: no-repeat;
}

.mainInfo-text p:nth-child(1) {
  font-size: 13px;
  margin: 0;
}

.main-info-text h1 {
  font-family: "Tungsten";
  margin: 0;
  font-size: 70px;
}

.name-line {
  width: 110px;
  height: 3px;
}

.main-info-text .desc {
  font-size: 13px;
  line-height: 18px;
  margin: 30px 0 0 0;
}

.mainInfo-img {
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 200px;
}

.agentImg {
  width: 850px;
  object-fit: fill;
  transform: translateY(-80px);
}

.abilities-container {
  font-family: "Tungsten";
  font-size: 22px;
  letter-spacing: 1px;
  height: auto;
  width: 85%;
  margin: auto;
}

.line-abilities {
  width: 180px;
  margin: auto auto 25px auto;
  height: 3px;
  background-color: #ff4654;
}

.special-abilities {
  font-size: 65px;
  line-height: 65px;
}

.ability-image1,
.ability-image2,
.ability-image3,
.ability-image4 {
  width: 40px;
  padding: 5px;
}

.ability-1,
.ability-2,
.ability-3,
.ability-4 {
  cursor: pointer;
}

.abilities {
  width: 100%;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, 1fr);
  height: 100px;
}

.skillImg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  height: 60px;
}

.ability-detail h2 {
  font-size: 35px;
}
.ability-detail p {
  font-size: 11px;
  line-height: 15px;
  font-family: "Roboto";
}

.role-line {
  width: 120px;
  height: 3px;
  background-color: #ff4654;
  border: 0;
  float: left;
  margin: 1px 0 0 0;
}

.role-text h1 {
  font-family: "Tungsten";
  font-size: 55px;
  margin: 0;
}

.agent-role p {
  font-family: "Roboto";
  font-size: 11px;
}

.back-button {
  font-size: 30px;
}

.back-text {
  font-size: 23px;
  letter-spacing: 1px;
}

@media (min-width: 576px) {
  .back-button {
    padding-top: 40px;
  }
  .back-text {
    font-size: 30px;
  }

  .role-title {
    font-size: 20px;
  }

  h1.agent-title-name {
    font-size: 90px !important;
  }

  .agentImg {
    width: 1000px;
    object-fit: fill;
    transform: translateY(-100px);
  }

  .key {
    font-size: 30px;
  }

  .desc {
    width: 500px;
    font-size: 16px !important;
    line-height: normal !important;
  }

  .special-abilities {
    font-size: 80px;
  }

  .line-abilities {
    width: 300px;
  }

  .ability-image1,
  .ability-image2,
  .ability-image3,
  .ability-image4 {
    width: 50px;
    padding: 5px;
  }

  .skillImg {
    height: 70px;
  }

  /* ABILITY TITLE AND DETAIL */
  .ability-detail {
    margin: 60px 0 60px 0;
  }

  .ability-detail h2 {
    font-size: 50px;
  }

  .ability-detail p {
    font-size: 16px;
    line-height: normal;
  }

  .agent-role {
    margin-top: 10px !important;
  }
  .role-text h1 {
    font-size: 80px;
  }

  .role-text p {
    font-size: 16px;
    line-height: normal;
  }

  .ability-detail {
    width: 600px;
  }

  .role-img img {
    width: 110px !important;
  }

  .mainInfo-img {
    height: 250px;
    background-size: 800px;
    margin-top: 70px;
  }

  .mainInfo-img img {
    width: 1000px;
  }
}

@media (min-width: 768px) {
  .desc {
    width: 600px;
  }
}

@media (min-width: 1100px) {
}
</style>
