<template>
  <div class="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-orange-200 p-10">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-600">
        {{ election.name }}
      </h1>
      <p class="text-lg text-gray-600">{{ election.description }}</p>
    </header>

    <div class="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
      <!-- Election Details -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Election Details</h2>
        <p><strong>Start Date:</strong> {{ new Date(election.start_date).toLocaleDateString() }}</p>
        <p><strong>End Date:</strong> {{ new Date(election.end_date).toLocaleDateString() }}</p>
        <p><strong>Creator:</strong> {{ election.creator.name }} ({{ election.creator.registration_number }})</p>
        <p><strong>Primary Coordinator:</strong> {{ election.primary_coordinator.name }} ({{ election.primary_coordinator.registration_number }})</p>
        <p><strong>Secondary Coordinator:</strong> {{ election.secondary_coordinator.name }} ({{ election.secondary_coordinator.registration_number }})</p>
      </div>

      <!-- Candidates -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Candidates</h2>
        <ul>
          <li v-for="candidate in election.options" :key="candidate.id" class="mb-2">
            <p>{{ candidate.name }}</p>
          </li>
        </ul>
      </div>

      <!-- Votes -->
      <div v-if="election.electionWinner" class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Votes</h2>
        <ul>
          <li v-for="vote in election.votes" :key="vote.electionOptionId" class="mb-2">
            <p>{{ vote.electionOptionName }}: {{ vote.voteCount }} votes</p>
          </li>
        </ul>
      </div>

      <!-- Election Winner -->
      <div v-if="election.electionWinner" class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Election Winner</h2>
        <p>{{ election.electionWinner.name }}</p>
      </div>

      <div class="flex justify-between">
        <button
          @click="goBack"
          class="py-2 px-6 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  election: Object,
});

const emit = defineEmits(['close']);

const goBack = () => {
  emit('close');
};
</script>

<style scoped>
body {
  background-color: #f1f5f9;
}

button:hover {
  transform: scale(1.05);
}
</style>
