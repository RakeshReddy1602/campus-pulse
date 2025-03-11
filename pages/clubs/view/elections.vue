<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Club Elections</h2>
  
      <!-- Alert for Reschedule Message -->
      <div v-if="rescheduleMessage" class="mb-4 p-3 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded">
        {{ rescheduleMessage }}
      </div>
  
      <div class="space-y-4">
        <div
          v-for="election in elections"
          :key="election.id"
          class="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          :class="{
            'bg-red-100 border-red-500': election.status === 'Cancelled',
            'bg-green-100 border-green-500': election.status === 'Scheduled',
            'bg-gray-100 border-gray-500': election.status === 'Completed',
            'bg-yellow-100 border-yellow-500': election.status === 'Coming Soon'
          }"
        >
          <div>
            <p class="text-lg font-medium">{{ election.name }}</p>
            <p class="text-sm text-gray-600">Scheduled Date: {{ election.date }}</p>
            <p class="text-sm font-semibold"
              :class="{
                'text-red-700': election.status === 'Cancelled',
                'text-yellow-700': election.status === 'Coming Soon',
                'text-green-700': election.status === 'Scheduled',
                'text-gray-700': election.status === 'Completed'
              }">
              Status: {{ election.status }}
            </p>
          </div>
          <div class="space-x-2">
            <button
              v-if="election.status === 'Scheduled'"
              class="px-3 py-1 bg-red-500 text-white rounded"
              @click="cancelElection(election.id)"
            >
              Cancel
            </button>
            <button
              v-if="election.status === 'Scheduled'"
              class="px-3 py-1 bg-yellow-500 text-white rounded"
              @click="rescheduleElection"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
  
      <p v-if="elections.length === 0" class="text-center text-gray-500 mt-4">No elections scheduled.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
    
  definePageMeta({
    title: "Club Events",
    description: "View club events",
    layout: "club",
  })

  const elections = ref([
    { id: 1, name: "President Election", date: "2025-04-10", status: "Scheduled" },
    { id: 2, name: "Vice President Election", date: "2025-05-15", status: "Scheduled" },
    { id: 3, name: "Treasurer Election", date: "2025-06-20", status: "Scheduled" },
    { id: 4, name: "Secretary Election", date: "2025-02-01", status: "Completed" },
    { id: 5, name: "Event Coordinator Election", date: "2025-01-15", status: "Completed" },
  ]);
  
  const rescheduleMessage = ref("");
  
  const cancelElection = (id) => {
    const election = elections.value.find(e => e.id === id);
    if (election) election.status = "Cancelled";
  };
  
  const rescheduleElection = () => {
    rescheduleMessage.value = "Reschedule option is not there yet. Coming soon.";
  
    // Hide message after 3 seconds
    setTimeout(() => {
      rescheduleMessage.value = "";
    }, 3000);
  };
  </script>
  