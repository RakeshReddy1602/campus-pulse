<template>
    <div class="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-orange-200 p-10">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-amber-600">
          Cast Your Vote
        </h1>
      </header>
  
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
        <!-- Election Name -->
        <div class="mb-6">
          <h2 class="text-3xl font-semibold text-teal-700 mb-2">
            {{ election.name }}
          </h2>
          <p class="text-lg text-gray-700 mb-4">{{ election.description }}</p>
        </div>
  
        <!-- Organizers -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-teal-600 mb-2">Organizers</h3>
          <p class="text-lg text-gray-600 mb-2"><span class="font-medium">Organizer 1:</span> {{ election.organizer1 }}</p>
          <p class="text-lg text-gray-600"><span class="font-medium">Organizer 2:</span> {{ election.organizer2 }}</p>
        </div>
  
        <!-- Election Date -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-teal-600 mb-2">Election Date</h3>
          <p class="text-lg text-gray-600">{{ election.date }}</p>
        </div>
  
        <!-- Voter List -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-teal-600 mb-2">Voter List</h3>
          <p class="text-lg text-gray-600">{{ election.voterList ? 'Uploaded' : 'No Voter List Uploaded' }}</p>
        </div>
  
        <!-- User Dropdown to Vote -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-teal-600 mb-2">Select a Candidate</h3>
          <select
            v-model="selectedUser"
            class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled>Select a candidate</option>
            <option v-for="user in userList" :key="user.id" :value="user">
              {{ user.name }} - {{ user.role }}
            </option>
          </select>
        </div>
  
        <!-- OTP Field -->
        <div class="mb-6">
          <h3 class="text-2xl font-semibold text-teal-600 mb-2">Enter 6 digits OTP</h3>
          <input
            v-model="otp"
            type="text"
            class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter OTP"
          />
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
            @click="castVote"
            :disabled="!selectedUser || otp.length < 6"
            class="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-teal-600 to-amber-500 text-white rounded-full shadow-lg hover:from-teal-700 hover:to-amber-600 transition-all"
          >
            Vote
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
  // Sample election data
  const election = ref({
    name: "Student Council Election 2025",
    description: "Electing the new student council representatives.",
    organizer1: "Alice",
    organizer2: "Bob",
    date: "2025-02-15",
    voterList: true,
    additionalDetails: "This election is important for the future of our student body.",
    isUpcoming: true,
  });
  
  // Sample user list (candidates)
  const userList = ref([
    { id: 1, name: "John Doe", role: "President" },
    { id: 2, name: "Jane Smith", role: "Vice President" },
    { id: 3, name: "Emily Clark", role: "Secretary" },
  ]);
  
  // Selected user for voting
  const selectedUser = ref(null);
  
  // OTP value
  const otp = ref("");
  
  // Go back function
  const goBack = () => {
    navigateTo("/elections/my-elections");
  };
  
  // Cast vote function
  const castVote = () => {
    alert("Vote casted successfully!");
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
  