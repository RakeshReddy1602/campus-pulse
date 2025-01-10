<template>
    <div class="min-h-screen bg-gradient-to-br from-teal-100 via-orange-100 to-yellow-100 p-10">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600">
          Create New Event
        </h1>
      </header>
  
      <form @submit.prevent="submitEvent" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Event Name -->
        <div>
          <label for="name" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-calendar-alt text-teal-600 mr-2"></i> Event Name
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            placeholder="Enter event name"
            required
          />
        </div>
  
        <!-- Description -->
        <div class="col-span-1 md:col-span-2">
          <label for="description" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-align-left text-orange-500 mr-2"></i> Description
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>
  
        <!-- Event Date -->
        <div>
          <label for="date" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-calendar-check text-yellow-500 mr-2"></i> Event Date
          </label>
          <input
            type="date"
            id="date"
            v-model="form.date"
            class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
            required
          />
        </div>
  
        <!-- Location -->
        <div>
          <label for="location" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-map-marker-alt text-teal-500 mr-2"></i> Location
          </label>
          <input
            type="text"
            id="location"
            v-model="form.location"
            class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            placeholder="Enter event location"
            required
          />
        </div>
  
        <!-- Upload Flyer -->
        <div class="col-span-1 md:col-span-2">
          <label for="flyer" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-image text-orange-500 mr-2"></i> Upload Event Flyer
          </label>
          <input
            type="file"
            id="flyer"
            @change="handleFileUpload"
            class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
          />
          <p class="text-sm text-gray-500 mt-2">Upload a flyer for the event</p>
        </div>
  
        <!-- Additional Details -->
        <div class="col-span-1 md:col-span-2">
          <label for="additionalDetails" class="block text-lg font-semibold text-gray-700 mb-2">
            <i class="fas fa-info-circle text-yellow-500 mr-2"></i> Additional Details
          </label>
          <textarea
            id="additionalDetails"
            v-model="form.additionalDetails"
            rows="3"
            class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
            placeholder="Enter any additional details"
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <div class="col-span-1 md:col-span-2 flex justify-center mt-6">
          <button
            type="submit"
            class="px-12 py-4 text-xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-teal-700 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            <i class="fas fa-paper-plane mr-2"></i> Create Event
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
          date: "",
          location: "",
          additionalDetails: "",
        },
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        alert(`Uploaded file: ${file.name}`);
      },
      submitEvent() {
        if (!this.form.name || !this.form.description || !this.form.date || !this.form.location) {
          alert("Please fill in all the required fields!");
          return;
        }
        alert("Event Created Successfully!");
        this.form = {
          name: "",
          description: "",
          date: "",
          location: "",
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
  