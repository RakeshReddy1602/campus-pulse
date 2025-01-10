<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-500 via-rose-300 to-teal-500 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-extrabold text-white">Elections</h1>
          <!-- Toggle Button -->
          <div class="flex items-center space-x-2">
            <span class="text-lg font-medium text-white">Upcoming</span>
            <button
              @click="toggleView"
              :class="[ 
                'relative inline-flex items-center h-8 w-14 rounded-full transition-all duration-300', 
                isUpcoming ? 'bg-teal-600' : 'bg-gray-300',
              ]"
            >
              <span
                :class="[ 
                  'inline-block w-7 h-7 bg-white rounded-full transform transition-transform', 
                  isUpcoming ? 'translate-x-6' : 'translate-x-0',
                ]"
              ></span>
            </button>
            <span class="text-lg font-medium text-white">Completed</span>
          </div>
        </div>
  
        <!-- Election Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="election in filteredElections"
            :key="election.id"
            class="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            :class="[ 
              'border-2', 
              election.isUpcoming ? 'bg-green-100 border-teal-500' : 'bg-red-100 border-red-500',
            ]"
          >
            <h2
              :class="[ 
                'text-2xl font-bold mb-3', 
                election.isUpcoming ? 'text-teal-700' : 'text-red-700', 
              ]"
            >
              {{ election.name }}
            </h2>
            <p :class="[election.isUpcoming ? 'text-gray-600' : 'text-gray-600']" class="mb-4">
              {{ election.description }}
            </p>
            <div :class="[election.isUpcoming ? 'text-gray-700' : 'text-gray-700']">
              <p><span class="font-medium">Date:</span> {{ election.date }}</p>
              <p><span class="font-medium">Organizer:</span> {{ election.organizer }}</p>
            </div>
            <!-- Cast Vote Button -->
            <button
              v-if="election.isUpcoming"
              class="mt-4 py-2 px-6 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
            >
             <NuxtLink to="/elections/cast-vote">Cast Vote</NuxtLink>
            </button>
            <button
              class="mt-4 ml-12 py-2 px-6 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all"
            >
             <NuxtLink to="/elections/details">View Details</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  definePageMeta({
      layout: 'common'
  })

  // Data
  const elections = ref([
    {
      id: 1,
      name: "Student Council Election",
      description: "Electing the new student council representatives.",
      date: "2025-02-15",
      organizer: "Alice",
      isUpcoming: true,
    },
    {
      id: 2,
      name: "Tech Club President Election",
      description: "Choosing the next president for the tech club.",
      date: "2025-01-05",
      organizer: "Bob",
      isUpcoming: false,
    },
    {
      id: 3,
      name: "Cultural Fest Committee Election",
      description: "Selecting members for the cultural fest committee.",
      date: "2025-03-10",
      organizer: "Charlie",
      isUpcoming: true,
    },
    {
      id: 4,
      name: "Sports Committee Election",
      description: "Forming a new sports committee for 2025.",
      date: "2024-12-20",
      organizer: "Diana",
      isUpcoming: false,
    },
  ]);
  
  const isUpcoming = ref(true);
  
  const toggleView = () => {
    isUpcoming.value = !isUpcoming.value;
  };
  
  const filteredElections = computed(() =>
    elections.value.filter((election) => election.isUpcoming === isUpcoming.value)
  );
  </script>
  
  <style scoped>
  body {
    background-color: #f1f5f9; /* Soft off-white background color */
  }
  </style>
  