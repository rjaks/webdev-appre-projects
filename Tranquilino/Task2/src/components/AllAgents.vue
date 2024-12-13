<template>
  <div class="all-agents-container agents">
    <div class="row">
      <h1 class="text-white agents-title q-mb-xs col-12">AGENTS</h1>
      <div class="filter-buttons flex q-gutter-sm">
        <q-btn
          v-if="!agentRolesToggled[0]"
          color="secondary"
          label="INITIATORS"
          rounded
          @click="toggleRole(0)"
        />
        <q-btn
          v-if="agentRolesToggled[0]"
          rounded
          color="primary"
          icon-right="close"
          label="INITIATORS"
          @click="unToggleRole(0)"
        />

        <q-btn
          v-if="!agentRolesToggled[1]"
          color="secondary"
          label="DUELISTS"
          rounded
          @click="toggleRole(1)"
        />
        <q-btn
          v-if="agentRolesToggled[1]"
          rounded
          color="primary"
          icon-right="close"
          label="DUELISTS"
          @click="unToggleRole(1)"
        />

        <q-btn
          v-if="!agentRolesToggled[2]"
          color="secondary"
          label="CONTROLLERS"
          rounded
          @click="toggleRole(2)"
        />
        <q-btn
          v-if="agentRolesToggled[2]"
          rounded
          color="primary"
          icon-right="close"
          label="CONTROLLERS"
          @click="unToggleRole(2)"
        />

        <q-btn
          v-if="!agentRolesToggled[3]"
          color="secondary"
          label="SENTINELS"
          rounded
          @click="toggleRole(3)"
        />
        <q-btn
          v-if="agentRolesToggled[3]"
          rounded
          color="primary"
          icon-right="close"
          label="SENTINELS"
          @click="unToggleRole(3)"
        />
      </div>
    </div>
    <div class="row grid-container q-mt-lg">
      <div v-for="agent in agents" :key="agent.uuid">
        <router-link
          :to="{
            path: `/agentInfo/${encodeURIComponent(agent.displayName)}`,
            query: { data: JSON.stringify(agent) },
          }"
        >
          <div class="card-holder">
            <AgentCard :data="agent" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AgentCard from "./AgentCard.vue";
import { useRouter, useRoute } from "vue-router";

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

const router = useRouter();
const route = useRoute();

const agents = ref<Object[]>([]);
const allAgents = ref<Object[]>([]);

let filteredAgents = <Object[]>[];

//Agent Roles Toggled = Initiator, Duelists, Controllers, sentinels
const agentRolesToggled = ref<boolean[]>([false, false, false, false]);

defineProps({
  searchAgent: Function,
  agentFound: Boolean,
});

const searchAgent = (agentName: string) => {
  console.log("CALLED: ", agentName);
  allAgents.value.forEach((agent: any) => {
    if (agent.displayName.toUpperCase() === agentName.toUpperCase()) {
      router.push({
        path: `/agentInfo/${agent}`,
        query: { data: JSON.stringify(agent) },
      });
    }
  });
};

//Agent Rolge Toggled
const toggleRole = (num: number) => {
  agentRolesToggled.value = agentRolesToggled.value.map(
    (item: boolean, index: number) => (index === num ? !item : item)
  );

  agentRolesToggled.value.map((item: boolean, index: number) => {
    if (item && index == num) {
      switch (index) {
        case 0:
          allAgents.value.forEach((item: any) => {
            if (item.role.displayName == "Initiator") {
              filteredAgents.push(item);
            }
          });
          break;
        case 1:
          allAgents.value.forEach((item: any) => {
            if (item.role.displayName == "Duelist") {
              filteredAgents.push(item);
            }
          });
          break;
        case 2:
          allAgents.value.forEach((item: any) => {
            if (item.role.displayName == "Controller") {
              filteredAgents.push(item);
            }
          });
          break;
        case 3:
          allAgents.value.forEach((item: any) => {
            if (item.role.displayName == "Sentinel") {
              filteredAgents.push(item);
            }
          });
          break;
      }
    }
  });

  //Updates the value inside the agents array of objects
  agents.value = [...filteredAgents];
};

const unToggleRole = (num: number) => {
  agentRolesToggled.value = agentRolesToggled.value.map(
    (item: boolean, index: number) => (index === num ? !item : item)
  );

  agentRolesToggled.value.map((item: boolean, index: number) => {
    if (!item) {
      switch (index) {
        case 0:
          filteredAgents = filteredAgents.filter((agent: any) => {
            return agent.role.displayName != "Initiator";
          });
          break;
        case 1:
          filteredAgents = filteredAgents.filter((agent: any) => {
            return agent.role.displayName != "Duelist";
          });
          break;
        case 2:
          filteredAgents = filteredAgents.filter((agent: any) => {
            return agent.role.displayName != "Controller";
          });
          break;
        case 3:
          filteredAgents = filteredAgents.filter((agent: any) => {
            return agent.role.displayName != "Sentinel";
          });
          break;
      }
    }
  });

  //Updates the value inside the agents array of objects
  agents.value = [...filteredAgents];

  //If all are untoggled or all false (show all agents)
  if (agentRolesToggled.value.every((value) => value === false))
    agents.value = [...allAgents.value];
};
onMounted(() => {
  fetch("https://valorant-api.com/v1/agents")
    .then((res) => res.json())
    .then((data) => {
      allAgents.value = data.data.filter((agent: any) => {
        return agent.isPlayableCharacter;
      });
      agents.value = [...allAgents.value];
    })
    .catch((err) => console.log(err.message));
});
</script>

<style scoped>
.agents-title {
  font-family: "Valorant";
  font-size: 45px;
}

.filter-buttons .q-btn {
  font-size: 13px;
  height: 10px;
}

.card-holder {
  width: 100%; /* Allow the card to fill the container's width */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.card-holder {
  position: relative;
  width: 100%; /* Allow the card to fill the container's width */
  padding-top: 170%; /* This creates a 16:9 aspect ratio (height/width = 9/16) */
}

.card-holder > * {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@media (min-width: 576px) {
  .grid-container {
    gap: 20px;
  }
  .agents .agentsText {
    font-size: 55px;
    margin: 0 0 70px 0;
  }
}

@media (min-width: 768px) {
  .agents {
    padding: 50px 30px 0 30px;
  }
  .agents .agentsText {
    font-size: 65px;
    margin: 0 0 80px 0;
  }
}

@media (min-width: 992px) {
  .grid-container {
    gap: 24px;
    grid-template-columns: repeat(4, 1fr);
  }
  .agents {
    padding: 50px 50px 0 50px;
  }
  .agents .agentsText {
    font-size: 70px;
    margin: 0 0 90px 0;
  }
}

@media (min-width: 1250px) {
  .agents {
    width: 1200px !important;
    padding: 0;
    margin: auto;
    margin-top: 100px;
  }
  .grid-container {
    width: 1200px;
    margin: auto;
  }

  .filter-buttons {
    margin-bottom: 50px;
  }

  .agents-title {
    font-size: 60px;
  }
}
</style>
