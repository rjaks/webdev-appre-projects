<template>
  <div>
    <q-header class="bg-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-md"
          v-if="screenWidth < 1100"
        />
        <a href="https://www.riotgames.com/en" target="_blank">
          <img
            v-if="screenWidth < 1100"
            src="../assets/Logo/riotLogo.png"
            class="riot-logo"
          />
          <img
            v-else
            src="../assets/Logo/riotLogo.png"
            class="riot-logo q-ml-xl"
          />
        </a>
        <a href="https://playvalorant.com/en-sg/" target="_blank">
          <img
            v-if="screenWidth < 1100"
            src="../assets/Logo/valorantLogo.png"
            class="valo-logo"
          />
          <img
            v-else
            src="../assets/Logo/valorantLogo.png"
            class="valo-logo q-ml-sm"
          />
        </a>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-secondary text-white"
      v-if="screenWidth < 1100"
    >
    </q-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

defineOptions({
  name: "NavBar",
});

const screenWidth = ref(window.innerWidth);

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<style scoped>
.riot-logo {
  width: 60px;
}
.valo-logo {
  width: 60px;
}
</style>
