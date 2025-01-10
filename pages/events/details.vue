<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 p-10">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Event Details
        </h1>
      </header>
  
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
        <!-- Event Name -->
        <div class="mb-6">
          <h2 class="text-3xl font-semibold text-purple-700 mb-2">
            {{ event.name }}
          </h2>
          <p class="text-lg text-gray-700 mb-4">{{ event.description }}</p>
        </div>
  
        <!-- Organizers -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-purple-600 mb-2">Organizers</h3>
          <p class="text-lg text-gray-600 mb-2"><span class="font-medium">Organizer 1:</span> {{ event.organizer1 }}</p>
          <p class="text-lg text-gray-600"><span class="font-medium">Organizer 2:</span> {{ event.organizer2 }}</p>
        </div>
  
        <!-- Event Date -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-purple-600 mb-2">Event Date</h3>
          <p class="text-lg text-gray-600">{{ event.date }}</p>
        </div>
  
        <!-- Location -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-purple-600 mb-2">Location</h3>
          <p class="text-lg text-gray-600">{{ event.location }}</p>
        </div>
  
        <!-- Flyer -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-purple-600 mb-2">Flyer</h3>
          <p class="text-lg text-gray-600">{{ event.flyer ? 'Uploaded' : 'No Flyer Uploaded' }}</p>
        </div>
  
        <!-- Additional Details -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-purple-600 mb-2">Additional Details</h3>
          <p class="text-lg text-gray-600">{{ event.additionalDetails || 'No additional details available.' }}</p>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4">
          <button
            @click="goBack"
            class="px-6 py-3 text-lg font-semibold bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300 transition-all"
          >
            Back
          </button>
          <button
            v-if="event.isUpcoming"
            @click="attendEvent"
            class="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Attend Event
          </button>
          <button
            v-if="!event.isUpcoming"
            @click="attendEvent"
            class="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Event Expired
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  definePageMeta({
  layout: 'common'
})
  // Sample event data
  const event = ref({
    name: "Tech Conference 2025",
    description: "A groundbreaking conference for tech enthusiasts.",
    organizer1: "John",
    organizer2: "Doe",
    date: "2025-03-10",
    location: "Tech Park Auditorium",
    flyer: true,
    additionalDetails: "This event features workshops, keynotes, and networking opportunities.",
    isUpcoming: true,
  });
  
  // Go back function
  const goBack = () => {
    navigateTo("/events/my-events");
  };
  
  // Attend event function
  const attendEvent = () => {
    alert('Coming Soon !!');
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
  