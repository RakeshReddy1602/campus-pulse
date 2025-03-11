<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-rose-300 to-teal-500 p-6">
    <div v-if="uiState === 0" class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-extrabold text-white">Elections</h1>
        <!-- Toggle Buttons -->
        <div class="flex items-center space-x-4">
          <button
            @click="fetchElections('upcoming')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'upcoming' ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Upcoming
          </button>
          <button
            @click="fetchElections('ongoing')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'ongoing' ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Ongoing
          </button>
          <button
            @click="fetchElections('completed')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'completed' ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Completed
          </button>
        </div>
      </div>

      <!-- Election Cards -->
      <div v-if="loading" class="text-center text-xl text-white">
        Loading elections...
      </div>
      <div v-else-if="elections.length === 0" class="text-center text-xl text-white">
        No elections found.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="election in elections"
          :key="election.id"
          class="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          :class="[
            'border-2',
            view === 'upcoming' ? 'bg-green-100 border-teal-500' : (view === 'ongoing' ? 'bg-yellow-100 border-yellow-500' : 'bg-red-100 border-red-500'),
          ]"
        >
          <h2
            :class="[
              'text-2xl font-bold mb-3',
              view === 'upcoming' ? 'text-teal-700' : (view === 'ongoing' ? 'text-yellow-700' : 'text-red-700'),
            ]"
          >
            {{ election.name }}
          </h2>
          <p class="text-gray-600 mb-4">{{ election.description }}</p>
          <div class="text-gray-700">
            <p><span class="font-medium">Start Date:</span> {{ new Date(election.start_date).toLocaleDateString() }}</p>
            <p><span class="font-medium">End Date:</span> {{ new Date(election.end_date).toLocaleDateString() }}</p>
            <p><span class="font-medium">Organizer:</span> {{ election.primary_coordinator?.name }}</p>
          </div>
          <!-- Cast Vote Button -->
          <button
            v-if="view === 'ongoing'"
            @click="handleCastVote(election.id)"
            class="mt-4 py-2 px-6 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
          >
            Cast Vote
          </button>
          <button
            @click="handleViewDetails(election.id)"
            class="mt-4 ml-12 py-2 px-6 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Cast Vote Component -->
    <cast-vote
      v-if="uiState === 1"
      :election="selectedElection"
      @close="uiState = 0"
    />

    <!-- Election Details Component -->
    <election-details
      v-if="uiState === 2"
      :election="selectedElection"
      @close="uiState = 0"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp, useCookie } from '#imports';
import CastVote from '~/components/cast-vote.vue';
import ElectionDetails from '~/components/election-details.vue';

const { $axios } = useNuxtApp();
const elections = ref([]);
const loading = ref(true);
const view = ref('upcoming');
const userCookie = useCookie('user');
const userId = userCookie.value?.id;
const uiState = ref(0); // 0: Show elections, 1: Show cast vote, 2: Show election details
const selectedElection = ref(null);

const fetchElections = async (viewType) => {
  loading.value = true;
  view.value = viewType;

  let shouldFetchExpired = false;
  let shouldFetchOngoing = false;
  let shouldFetchUpcoming = false;

  if (viewType === 'upcoming') {
    shouldFetchUpcoming = true;
  } else if (viewType === 'ongoing') {
    shouldFetchOngoing = true;
  } else if (viewType === 'completed') {
    shouldFetchExpired = true;
  }

  try {
    const response = await $axios.post('/api/elections/fetch-my-elections', {
      userId,
      shouldFetchExpired,
      shouldFetchOngoing,
      shouldFetchUpcoming,
    });
    elections.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch elections:', error);
  } finally {
    loading.value = false;
  }
};

const handleCastVote = async (electionId) => {
  try {
    const response = await $axios.post('/api/elections/fetch-election-details-for-user', {
      userId,
      electionId,
    });
    selectedElection.value = response.data.data;
    uiState.value = 1;
  } catch (error) {
    console.error('Failed to fetch election details:', error);
  }
};

const handleViewDetails = async (electionId) => {
  try {
    const response = await $axios.post('/api/elections/fetch-election-details-for-user', {
      userId,
      electionId,
    });
    selectedElection.value = response.data.data;
    uiState.value = 2;
  } catch (error) {
    console.error('Failed to fetch election details:', error);
  }
};

onMounted(() => {
  fetchElections('upcoming');
});

definePageMeta({
  title: 'My Elections',
  description: 'View all your elections in one place.',
  layout: 'club-admin'
});
</script>

<style scoped>
body {
  background-color: #f1f5f9; /* Soft off-white background color */
}
</style>
