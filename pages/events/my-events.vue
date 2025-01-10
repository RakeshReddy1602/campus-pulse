<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-300 to-indigo-500 p-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-extrabold text-white">Events</h1>
          <!-- Toggle Button -->
          <div class="flex items-center space-x-2">
            <span class="text-lg font-medium text-white">Upcoming</span>
            <button
              @click="toggleView"
              :class="[ 
                'relative inline-flex items-center h-8 w-14 rounded-full transition-all duration-300', 
                isUpcoming ? 'bg-indigo-600' : 'bg-gray-300',
              ]"
            >
              <span
                :class="[ 
                  'inline-block w-7 h-7 bg-white rounded-full transform transition-transform', 
                  isUpcoming ? 'translate-x-6' : 'translate-x-0',
                ]"
              ></span>
            </button>
            <span class="text-lg font-medium text-white">Expired</span>
          </div>
        </div>
  
        <!-- Event Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            :class="[ 
              'border-2', 
              event.isUpcoming ? 'bg-purple-100 border-indigo-500' : 'bg-pink-100 border-pink-500',
            ]"
          >
            <h2
              :class="[ 
                'text-2xl font-bold mb-3', 
                event.isUpcoming ? 'text-indigo-700' : 'text-pink-700', 
              ]"
            >
              {{ event.name }}
            </h2>
            <p :class="[event.isUpcoming ? 'text-gray-600' : 'text-gray-600']" class="mb-4">
              {{ event.description }}
            </p>
            <div :class="[event.isUpcoming ? 'text-gray-700' : 'text-gray-700']">
              <p><span class="font-medium">Date:</span> {{ event.date }}</p>
              <p><span class="font-medium">Organizer:</span> {{ event.organizer }}</p>
            </div>
            <!-- View Event Details Button -->
            <button
              class="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-rose-700 transition-all"
            >
              <NuxtLink to="/events/details">View Details</NuxtLink>
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
  const events = ref([
    {
      id: 1,
      name: "Hackathon 2025",
      description: "A coding competition to challenge your skills.",
      date: "2025-05-15",
      organizer: "Alice",
      isUpcoming: true,
    },
    {
      id: 2,
      name: "Tech Talk on AI",
      description: "An in-depth discussion on Artificial Intelligence.",
      date: "2025-01-10",
      organizer: "Bob",
      isUpcoming: false,
    },
    {
      id: 3,
      name: "Cultural Night",
      description: "An evening filled with performances from students.",
      date: "2025-03-05",
      organizer: "Charlie",
      isUpcoming: true,
    },
    {
      id: 4,
      name: "Sports Meet 2024",
      description: "Annual sports meet for all students.",
      date: "2024-11-15",
      organizer: "Diana",
      isUpcoming: false,
    },
  ]);
  
  const isUpcoming = ref(true);
  
  const toggleView = () => {
    isUpcoming.value = !isUpcoming.value;
  };
  
  const filteredEvents = computed(() =>
    events.value.filter((event) => event.isUpcoming === isUpcoming.value)
  );
  </script>
  
  <style scoped>
  body {
    background-color: #f1f5f9; /* Soft off-white background color */
  }
  </style>
  