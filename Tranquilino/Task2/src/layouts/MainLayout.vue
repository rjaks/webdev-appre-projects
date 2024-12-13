<template>
  <q-layout view="lHh Lpr lFf" class="bg-accent">
    <NavBar />
    <q-page-container>
      <Search @search="searchAgent" :isFound="agentFound" />
    </q-page-container>

    <q-page-container class="q-pa-lg">
      <AllAgents />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Search from "src/components/Search.vue";
import AllAgents from "src/components/AllAgents.vue";
import NavBar from "../pages/NavBar.vue";

const router = useRouter();

defineOptions({
  name: "MainLayout",
});

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const allAgents = ref();
const agentFound = ref(true);

const searchAgent = (agent: string) => {
  allAgents.value.forEach((agentName: any) => {
    if (agent.toUpperCase() === agentName.displayName.toUpperCase()) {
      router.push({
        path: `/agentInfo/${encodeURIComponent(agent.displayName)}`,
        query: { data: JSON.stringify(agentName) },
      });
      agentFound.value = true;
    }
  });
  if (!agentFound.value) {
    agentFound.value = false;
  }
};

onMounted(() => {
  fetch("https://valorant-api.com/v1/agents")
    .then((res) => res.json())
    .then((data) => {
      allAgents.value = data.data.filter((agent: any) => {
        return agent.isPlayableCharacter;
      });
    })
    .catch((err) => console.log(err.message));
});
</script>

<style scoped>
.riot-logo {
  width: 60px;
}
.valo-logo {
  width: 60px;
}
</style>
