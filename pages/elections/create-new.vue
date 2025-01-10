<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 p-10">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-pink-600 to-purple-600">
          Create New Election
        </h1>
      </header>
  
      <form @submit.prevent="submitElection" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Election Name -->
        <div>
          <label for="name" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-vote-yea text-indigo-600 mr-2"></i> Election Name
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
            placeholder="Enter election name"
            required
          />
        </div>
  
        <!-- Description -->
        <div class="col-span-1 md:col-span-2">
          <label for="description" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-align-left text-pink-500 mr-2"></i> Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 border-2 border-pink-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500"
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>
  
        <!-- Organizers -->
        <div>
          <label for="organizer1" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-user-tie text-green-500 mr-2"></i> Organizer 1
          </label>
          <select
            id="organizer1"
            v-model="form.organizer1"
            class="w-full px-4 py-3 border-2 border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
            required
          >
            <option disabled value="">Select Organizer 1</option>
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
          </select>
        </div>
  
        <div>
          <label for="organizer2" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-user-tie text-orange-500 mr-2"></i> Organizer 2
          </label>
          <select
            id="organizer2"
            v-model="form.organizer2"
            class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
            required
          >
            <option disabled value="">Select Organizer 2</option>
            <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
          </select>
        </div>
  
        <!-- Election Date -->
        <div>
          <label for="date" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-calendar-alt text-blue-500 mr-2"></i> Election Date
          </label>
          <input
            type="date"
            id="date"
            v-model="form.date"
            class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            required
          />
        </div>
  
        <!-- Voter List -->
        <div class="col-span-1 md:col-span-2">
          <label for="voters" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-users text-purple-500 mr-2"></i> Upload Voter List (if specific like faculty)
          </label>
          <input
            type="file"
            id="voters"
            @change="handleFileUpload"
            class="w-full px-4 py-3 border-2 border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
          />
          <p class="text-sm text-gray-500 mt-2">Upload a CSV file with voter details</p>
        </div>
  
        <!-- Additional Details -->
        <div class="col-span-1 md:col-span-2">
          <label for="additionalDetails" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-info-circle text-purple-500 mr-2"></i> Additional Details
          </label>
          <textarea
            id="additionalDetails"
            v-model="form.additionalDetails"
            rows="3"
            class="w-full px-4 py-3 border-2 border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
            placeholder="Enter any additional details"
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <div class="col-span-1 md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            class="px-12 py-4 text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-indigo-700 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            <i class="fas fa-paper-plane mr-2"></i> Create Election
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: "",
          description: "",
          organizer1: "",
          organizer2: "",
          date: "",
          additionalDetails: "",
        },
        users: [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
          { id: 3, name: "Charlie" },
          { id: 4, name: "Diana" },
        ],
      };
    },
    methods: {
      goBack() {
        alert("Navigating back...");
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        alert(`Uploaded file: ${file.name}`);
      },
      submitElection() {
        if (!this.form.organizer1 || !this.form.organizer2) {
          alert("Both organizers are required!");
          return;
        }
        alert("Election Created Successfully!");
        this.form = {
          name: "",
          description: "",
          organizer1: "",
          organizer2: "",
          date: "",
          additionalDetails: "",
        };
      },
    },
  };
  </script>

<script setup>
definePageMeta({
  layout: 'common'
})
</script>
  