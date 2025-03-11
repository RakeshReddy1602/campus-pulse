<!-- filepath: c:\Users\asd14\Desktop\campus-pulse\pages\elections\create-new.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-10">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-extrabold text-white tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400">
        Create New Election
      </h1>
    </header>

    <form @submit.prevent="submitElection" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Election Name -->
      <div>
        <label for="name" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-vote-yea text-indigo-400 mr-2"></i> Election Name
        </label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="w-full px-4 py-3 border-2 border-indigo-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-800 text-white"
          placeholder="Enter election name"
          required
          @blur="touched.name = true"
        />
        <p v-if="errors.name && touched.name" class="text-sm text-red-400 mt-1">{{ errors.name }}</p>
      </div>

      <!-- Description -->
      <div class="col-span-1 md:col-span-2">
        <label for="description" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-align-left text-pink-400 mr-2"></i> Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          class="w-full px-4 py-3 border-2 border-pink-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 bg-gray-800 text-white"
          placeholder="Enter a brief description"
          required
          @blur="touched.description = true"
        ></textarea>
        <p v-if="errors.description && touched.description" class="text-sm text-red-400 mt-1">{{ errors.description }}</p>
      </div>

      <!-- Club Selection -->
      <div class="col-span-1 md:col-span-2">
        <label for="club" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-users text-teal-400 mr-2"></i> Select Club
        </label>
        <select
          id="club"
          v-model="form.clubId"
          class="w-full px-4 py-3 border-2 border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 bg-gray-800 text-white"
          required
          @blur="touched.clubId = true"
          @change="fetchClubMembers"
        >
          <option disabled value="">Select Club</option>
          <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.name }}</option>
        </select>
        <p v-if="errors.clubId && touched.clubId" class="text-sm text-red-400 mt-1">{{ errors.clubId }}</p>
      </div>

      <!-- Organizers -->
      <div>
        <label for="primaryCoordinator" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-user-tie text-green-400 mr-2"></i> Organizer 1
        </label>
        <select
          id="primaryCoordinator"
          v-model="form.primaryCoordinator"
          class="w-full px-4 py-3 border-2 border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 bg-gray-800 text-white"
          required
          @blur="touched.primaryCoordinator = true"
          :disabled="!form.clubId || clubMembers.length === 0"
        >
          <option disabled value="">{{ !form.clubId ? 'Select Club' : (clubMembers.length === 0 ? 'No Data Available' : 'Select Organizer 1') }}</option>
          <option v-for="member in clubMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
        </select>
        <p v-if="errors.primaryCoordinator && touched.primaryCoordinator" class="text-sm text-red-400 mt-1">{{ errors.primaryCoordinator }}</p>
      </div>

      <div>
        <label for="secondaryCoordinator" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-user-tie text-orange-400 mr-2"></i> Organizer 2
        </label>
        <select
          id="secondaryCoordinator"
          v-model="form.secondaryCoordinator"
          class="w-full px-4 py-3 border-2 border-orange-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 bg-gray-800 text-white"
          required
          @blur="touched.secondaryCoordinator = true"
          :disabled="!form.clubId || clubMembers.length === 0"
        >
          <option disabled value="">{{ !form.clubId ? 'Select Club' : (clubMembers.length === 0 ? 'No Data Available' : 'Select Organizer 2') }}</option>
          <option v-for="member in clubMembers" :key="member.id" :value="member.id">{{ member.name }}</option>
        </select>
        <p v-if="errors.secondaryCoordinator && touched.secondaryCoordinator" class="text-sm text-red-400 mt-1">{{ errors.secondaryCoordinator }}</p>
      </div>

      <!-- Election Start Date -->
      <div>
        <label for="electionStartDate" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-calendar-alt text-blue-400 mr-2"></i> Election Start Date
        </label>
        <input
          type="date"
          id="electionStartDate"
          v-model="form.electionStartDate"
          :min="today"
          class="w-full px-4 py-3 border-2 border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-gray-800 text-white"
          required
          @blur="touched.electionStartDate = true"
        />
        <p v-if="errors.electionStartDate && touched.electionStartDate" class="text-sm text-red-400 mt-1">{{ errors.electionStartDate }}</p>
      </div>

      <!-- Election End Date -->
      <div>
        <label for="electionEndDate" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-calendar-alt text-blue-400 mr-2"></i> Election End Date
        </label>
        <input
          type="date"
          id="electionEndDate"
          v-model="form.electionEndDate"
          :min="form.electionStartDate ? form.electionStartDate : today"
          class="w-full px-4 py-3 border-2 border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 bg-gray-800 text-white"
          required
          @blur="touched.electionEndDate = true"
        />
        <p v-if="errors.electionEndDate && touched.electionEndDate" class="text-sm text-red-400 mt-1">{{ errors.electionEndDate }}</p>
      </div>

      <!-- Is Open to All Club Members -->
      <div class="col-span-1 md:col-span-2">
        <label class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-users text-teal-400 mr-2"></i> Is Open to All Club Members
        </label>
        <div class="flex items-center mb-4">
          <input
            type="radio"
            id="openToAllYes"
            value="true"
            v-model="form.isOpenToAll"
            class="mr-2"
          />
          <label for="openToAllYes" class="text-gray-300 mr-4">Yes</label>
          <input
            type="radio"
            id="openToAllNo"
            value="false"
            v-model="form.isOpenToAll"
            class="mr-2"
          />
          <label for="openToAllNo" class="text-gray-300">No</label>
        </div>
      </div>

      <!-- Voter List -->
      <div v-if="form.isOpenToAll === 'false'" class="col-span-1 md:col-span-2">
        <label for="voters" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-users text-purple-400 mr-2"></i> Upload Voter List (if specific like faculty)
        </label>
        <input
          type="file"
          id="voters"
          @change="handleFileUpload"
          class="w-full px-4 py-3 border-2 border-purple-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 bg-gray-800 text-white"
        />
        <p class="text-sm text-gray-400 mt-2">Upload a CSV file with voter details</p>
      </div>

      <!-- Additional Details -->
      <div class="col-span-1 md:col-span-2">
        <label for="additionalDetails" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-info-circle text-purple-400 mr-2"></i> Additional Details
        </label>
        <textarea
          id="additionalDetails"
          v-model="form.additionalDetails"
          rows="3"
          class="w-full px-4 py-3 border-2 border-purple-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 bg-gray-800 text-white"
          placeholder="Enter any additional details"
        ></textarea>
      </div>

      <!-- Election Options -->
      <div class="col-span-1 md:col-span-2">
        <label for="options" class="block text-lg font-semibold text-gray-300 mb-2">
          <i class="fas fa-list text-teal-400 mr-2"></i> Election Options
        </label>
        <div v-for="(option, index) in form.options" :key="index" class="flex items-center mb-2">
          <input
            type="text"
            v-model="form.options[index]"
            class="w-full px-4 py-3 border-2 border-teal-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 bg-gray-800 text-white"
            placeholder="Enter option"
            required
          />
          <button v-if="form.options.length > 1" type="button" @click="removeOption(index)" class="ml-2 text-red-400 hover:text-red-600">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <button type="button" @click="addOption" class="mt-2 px-4 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400">
          Add Option
        </button>
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
import { ref, onMounted } from 'vue';
import { useNuxtApp, useCookie } from '#imports';

export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        clubId: "",
        primaryCoordinator: "",
        secondaryCoordinator: "",
        electionStartDate: "",
        electionEndDate: "",
        additionalDetails: "",
        options: [""],
        isOpenToAll: "true", // Default to true
      },
      errors: {},
      touched: {
        name: false,
        description: false,
        clubId: false,
        primaryCoordinator: false,
        secondaryCoordinator: false,
        electionStartDate: false,
        electionEndDate: false,
      },
      clubs: [],
      clubMembers: [],
      today: new Date().toISOString().split('T')[0], // Get today's date in YYYY-MM-DD format
      userId: null, // Add userId to the data
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      alert(`Uploaded file: ${file.name}`);
    },
    addOption() {
      this.form.options.push("");
    },
    removeOption(index) {
      this.form.options.splice(index, 1);
    },
    async fetchClubMembers() {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.post('/api/clubs/fetch-club-members', { clubId: this.form.clubId });
        this.clubMembers = response.data.data;
      } catch (error) {
        console.error('Failed to fetch club members:', error);
        this.clubMembers = [];
      }
    },
    validateForm() {
      const newErrors = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today for accurate comparison

      if (!this.form.name || this.form.name.length < 5) {
        newErrors.name = 'Election name must be at least 5 characters long.';
      }

      if (!this.form.description || this.form.description.length < 10) {
        newErrors.description = 'Description must be at least 10 characters long.';
      }

      if (!this.form.electionStartDate || new Date(this.form.electionStartDate) < today) {
        newErrors.electionStartDate = 'Election start date cannot be in the past.';
      }

      if (!this.form.electionEndDate || new Date(this.form.electionEndDate) < new Date(this.form.electionStartDate)) {
        newErrors.electionEndDate = 'Election end date cannot be before the start date.';
      }

      if (!this.form.clubId) {
        newErrors.clubId = 'Club selection is mandatory.';
      }

      if (!this.form.primaryCoordinator) {
        newErrors.primaryCoordinator = 'Organizer 1 is required.';
      }

      if (!this.form.secondaryCoordinator) {
        newErrors.secondaryCoordinator = 'Organizer 2 is required.';
      } else if (this.form.primaryCoordinator === this.form.secondaryCoordinator) {
        newErrors.secondaryCoordinator = 'Organizers cannot be the same.';
      }

      // Validate options
      const uniqueOptions = new Set();
      this.form.options = this.form.options.map(option => option.trim().toLowerCase());
      for (const option of this.form.options) {
        if (uniqueOptions.has(option)) {
          newErrors.options = 'Each option must be unique.';
          break;
        }
        uniqueOptions.add(option);
      }

      this.errors = newErrors;
      return Object.keys(newErrors).length === 0;
    },
    async submitElection() {
      this.touched = {
        name: true,
        description: true,
        clubId: true,
        primaryCoordinator: true,
        secondaryCoordinator: true,
        electionStartDate: true,
        electionEndDate: true,
      };

      if (!this.validateForm()) {
        return;
      }

      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.post('/api/elections/create-new', {
          ...this.form,
          userId: this.userId, // Include userId in the payload
        });
        alert(`Election Created Successfully! Response: ${response.data.message}`);
        this.form = {
          name: "",
          description: "",
          clubId: "",
          primaryCoordinator: "",
          secondaryCoordinator: "",
          electionStartDate: "",
          electionEndDate: "",
          additionalDetails: "",
          options: [""],
          isOpenToAll: "true", // Default to true
        };
        this.touched = {
          name: false,
          description: false,
          clubId: false,
          primaryCoordinator: false,
          secondaryCoordinator: false,
          electionStartDate: false,
          electionEndDate: false,
        };
      } catch (error) {
        alert(`Failed to create election. Error: ${error.response?.data?.message || error.message}`);
      }
    },
  },
  async mounted() {
    const managedClubsCookie = useCookie('managedClubs', { path: '/', secure: false, sameSite: 'lax' });
    this.clubs = managedClubsCookie.value || [];

    const userCookie = useCookie('user', { path: '/', secure: false, sameSite: 'lax' });
    this.userId = userCookie.value?.id || null; // Retrieve userId from the cookie
  },
};
</script>

<script setup>
definePageMeta({
  layout: 'common'
})
</script>