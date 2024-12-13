<template>
  <q-layout view="lHh Lpr lFf" class="bg-accent q-pt-xl layout-container">
    <NavBar />
    <div class="back-button q-mt-xl" style="padding-left: 50px; margin: auto">
      <router-link
        :to="{
          path: '/',
        }"
      >
        <q-btn
          align="left"
          class="btn-fixed-width q-mt-lg q-mb-lg q-ml-xs"
          style="font-family: 'Tungsten'"
          color="accent"
          icon="arrow_back"
          ><span class="back-text q-ml-sm" style="font-size: 25px"
            >BACK</span
          ></q-btn
        >
      </router-link>
    </div>

    <div class="desktop-container text-white q-mt-md">
      <div class="desktop-agentInfos-container">
        <div class="mainInfo-text">
          <p class="role-title-desktop text-white">
            {{ agentData.role.displayName.toUpperCase() }}
          </p>
          <h1 class="q-mt-none q-mb-none" style="font-family: 'Tungsten'">
            {{ agentData.displayName.toUpperCase() }}
          </h1>
          <hr
            class="name-line q-mt-md"
            style="
              width: 180px;
              float: left;
              height: 3px;
              background-color: #ff4654;
              border: none;
            "
          />
          <p class="desc q-mt-xl q-mb-xl">{{ agentData.description }}</p>
        </div>

        <div class="abilities-container">
          <div
            class="special-abilities flex justify-between items-center q-pr-lg"
          >
            <div class="ability-text-container">
              <h6 class="ability-title" style="font-size: 10px">
                SPECIAL ABILITIES
              </h6>
              <hr
                class="line-abilities"
                style="
                  width: 120px;
                  margin: auto auto 25px auto;
                  height: 3px;
                  background-color: #ff4654;
                  border: 0;
                "
              />
            </div>

            <div class="abilities" style="width: 500px; transform: scale(0.9)">
              <div
                class="ability-1"
                @click="toggleAbility(1)"
                @mouseover="hoverSkill(1)"
                @mouseleave="removeHover(1)"
              >
                <div class="key" :style="abilitiesBG[0]" ref="key1">C</div>
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
                <div class="key" :style="abilitiesBG[1]" ref="key2">Q</div>
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
                <div class="key" :style="abilitiesBG[2]" ref="key3">E</div>
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
                <div class="key" :style="abilitiesBG[3]" ref="key4">X</div>
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
          </div>

          <div class="ability-detail row flex items-center q-mt-lg">
            <h2 class="col-5" style="font-family: 'Tungsten'; font-size: 35px">
              {{ skillData.displayName.toUpperCase() }}
            </h2>
            <p class="col-6">{{ skillData.description }}</p>
          </div>

          <div class="agent-role row flex items-center q-mt-xl">
            <div class="role-text col-9">
              <h1
                class="q-ma-none"
                style="font-size: 55px; font-family: 'Tungsten'"
              >
                {{ agentData.role.displayName.toUpperCase() }}
              </h1>
              <hr
                class="role-line"
                style="
                  width: 120px;
                  height: 3px;
                  background-color: #ff4654;
                  border: 0;
                  float: left;
                  margin: 1px 0 0 0;
                "
              />
              <p class="q-mt-lg" style="width: 470px">
                {{ agentData.role.description }}
              </p>
            </div>

            <div class="role-img col-3">
              <img
                :src="agentData.role.displayIcon"
                :alt="agentData.role.displayName"
                style="width: 90px"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="desktop-agentImg-container flex items-center justify-center"
        :style="{ backgroundImage: `url(${agentData.background})` }"
      >
        <img
          class="desktop-agentImg"
          :alt="agentData.displayName"
          :src="agentData.fullPortraitV2"
        />
      </div>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import gsap from "gsap";
import Search from "src/components/Search.vue";
import NavBar from "../pages/NavBar.vue";

const route = useRoute();
const agentData = ref(JSON.parse(route.query.data as string));

defineOptions({
  name: "AgentInfo",
});

const leftDrawerOpen = ref(false);

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
.desktop-agentInfos-container {
  width: 100%;
  background-image: url("../assets/Background/SideBG.png");
  background-repeat: no-repeat;
  padding: 0 0 0 40px;
}

.desktop-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #01061e;
  color: white;
  padding: 0 5%;
  background-image: url("../assets/Background/EffectsBG.png");
  height: 900px;
}

.desktop-agentInfos-container .abilities-container {
  margin: 0;
  width: 700px;
}

.ability-title {
  font-size: 50px !important;
  font-family: "Tungsten";
  padding: 0 50px 0 0;
  margin: 20px 0 0 0;
  line-height: normal;
}

.mainInfo-text .desc {
  font-size: 15px;
}

.desktop-agentInfos-container .mainInfo-text h1 {
  font-size: 128px;
}

.desktop-agentInfos-container .mainInfo-text p {
  text-align: left;
  padding: 0 85px 0 0;
}

.ability-1,
.ability-2,
.ability-3,
.ability-4 {
  height: 80px;
  cursor: pointer;
}

.ability-image1,
.ability-image2,
.ability-image3,
.ability-image4 {
  width: 45px;
  padding: 5px;
}

.abilities {
  height: 100px;
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(4, 1fr);
}

.key {
  background-color: #757575;
  margin: 0 0 7px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 23px;
  font-family: "Tungsten";
}

.skillImg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  height: 70px;
}

.ability-text-container {
  width: 120px;
}

.special-abilities {
  width: 700px;
}

.role-title-desktop {
  font-size: 20px !important;
}

.desktop-agentImg-container {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%;
  margin-top: 50px;
  height: 700px;
  overflow: hidden;
  position: inherit;
  width: 300px;
  right: 0;
}

.desktop-agentImg {
  width: 730px;
  z-index: 1;
  position: relative;
}
.layout-container {
  padding-bottom: 100px;
}

@media (min-width: 1250px) {
  .mainInfo-text .desc {
    font-size: 15px;
  }

  .desktop-agentImg {
    width: 880px;
    z-index: 1;
    position: relative;
  }

  .desktop-agentImg-container {
    background-size: 120%;
    margin-top: 10px;
    height: 800px;
    width: 400px;
    right: 0;
  }

  .desktop-container p {
    font-size: 15px;
  }

  .desktop-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: #01061e;
    color: white;
    margin: auto;
    width: 1200px;
    padding: 0;
  }
  .back-button {
    width: 1350px;
  }
}
</style>
