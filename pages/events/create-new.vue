<!-- filepath: c:\Users\asd14\Desktop\campus-pulse\pages\events\create-new.vue -->
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
          autofocus
          @blur="touched.name = true"
        />
        <p v-if="errors.name && touched.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
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
          @blur="touched.description = true"
        ></textarea>
        <p v-if="errors.description && touched.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
      </div>

      <!-- Event Start Date -->
      <div>
        <label for="eventStartDate" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-calendar-check text-yellow-500 mr-2"></i> Event Start Date
        </label>
        <input
          type="date"
          id="eventStartDate"
          v-model="form.eventStartDate"
          :min="today"
          class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
          required
          @blur="touched.eventStartDate = true"
        />
        <p v-if="errors.eventStartDate && touched.eventStartDate" class="text-sm text-red-600 mt-1">{{ errors.eventStartDate }}</p>
      </div>

      <!-- Event End Date -->
      <div>
        <label for="eventEndDate" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-calendar-check text-yellow-500 mr-2"></i> Event End Date
        </label>
        <input
          type="date"
          id="eventEndDate"
          v-model="form.eventEndDate"
          :min="form.eventStartDate ? form.eventStartDate : today"
          class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500"
          required
          @blur="touched.eventEndDate = true"
        />
        <p v-if="errors.eventEndDate && touched.eventEndDate" class="text-sm text-red-600 mt-1">{{ errors.eventEndDate }}</p>
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
          @blur="touched.location = true"
        />
        <p v-if="errors.location && touched.location" class="text-sm text-red-600 mt-1">{{ errors.location }}</p>
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
          accept=".jpg,.jpeg"
        />
        <p class="text-sm text-gray-500 mt-2">Upload a flyer for the event (optional, jpg/jpeg only)</p>
      </div>

      <!-- List of Clubs -->
      <div>
        <label for="club" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-users text-teal-500 mr-2"></i> Club
        </label>
        <select
          id="club"
          v-model="form.clubId"
          class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          required
          @blur="touched.clubId = true"
        >
          <option value="" disabled>Select Club</option>
          <option v-for="club in clubs" :key="club.id" :value="club.id">{{ club.name }}</option>
        </select>
        <p v-if="errors.clubId && touched.clubId" class="text-sm text-red-600 mt-1">{{ errors.clubId }}</p>
      </div>

      <!-- Number of Attendees -->
      <div>
        <label for="attendees" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-user-friends text-teal-500 mr-2"></i> Number of Attendees
          <span class="flex text-xs text-gray-500">(Leave this blank if there is no restriction on the number of attendees)</span>
        </label>
        <input
          type="number"
          id="attendees"
          v-model="form.attendees"
          class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          placeholder="Enter number of attendees"
          @blur="touched.attendees = true"
        />
        <p v-if="errors.attendees && touched.attendees" class="text-sm text-red-600 mt-1">{{ errors.attendees }}</p>
      </div>

      <!-- Coordinators -->
      <div class="col-span-1 md:col-span-2">
        <label for="coordinators" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-user-tie text-teal-500 mr-2"></i> Coordinators
        </label>
        <div v-for="(coordinator, index) in form.coordinators" :key="index" class="mb-4">
          <select
            v-model="form.coordinators[index]"
            class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
            required
            @blur="touched.coordinators[index] = true"
            :disabled="!form.clubId || clubMembers.length === 0"
          >
            <option value="" disabled>{{ !form.clubId ? 'Select Club' : (clubMembers.length === 0 ? 'Selected Club does not have any members' : 'Select Coordinator') }}</option>
            <option v-for="member in clubMembers" :key="member.id" :value="member.id">
              {{ member.name }} ({{ member.registration_number }})
            </option>
          </select>
          <p v-if="errors.coordinators && touched.coordinators[index]" class="text-sm text-red-600 mt-1">{{ errors.coordinators }}</p>
        </div>
      </div>

      <!-- Registration Required -->
      <div class="col-span-1 md:col-span-2">
        <label class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-clipboard-check text-teal-500 mr-2"></i> Registration Required
        </label>
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input
              type="radio"
              v-model="form.registrationRequired"
              :value="true"
              class="form-radio text-teal-600"
            />
            <span class="ml-2">Yes</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              v-model="form.registrationRequired"
              :value="false"
              class="form-radio text-teal-600"
            />
            <span class="ml-2">No</span>
          </label>
        </div>
        <p v-if="errors.registrationRequired && touched.registrationRequired" class="text-sm text-red-600 mt-1">{{ errors.registrationRequired }}</p>
      </div>

      <!-- Registration Start Date -->
      <div v-if="form.registrationRequired">
        <label for="registrationStartDate" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-calendar-alt text-teal-500 mr-2"></i> Registration Start Date
        </label>
        <input
          type="date"
          id="registrationStartDate"
          v-model="form.registrationStartDate"
          :min="today"
          class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          required
          @blur="touched.registrationStartDate = true"
        />
        <p v-if="errors.registrationStartDate && touched.registrationStartDate" class="text-sm text-red-600 mt-1">{{ errors.registrationStartDate }}</p>
      </div>

      <!-- Registration End Date -->
      <div v-if="form.registrationRequired">
        <label for="registrationEndDate" class="block text-lg font-semibold text-gray-700 mb-2">
          <i class="fas fa-calendar-alt text-teal-500 mr-2"></i> Registration End Date
        </label>
        <input
          type="date"
          id="registrationEndDate"
          v-model="form.registrationEndDate"
          :min="form.registrationStartDate ? form.registrationStartDate : today"
          :max="form.eventStartDate"
          class="w-full px-4 py-3 border-2 border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500"
          required
          @blur="touched.registrationEndDate = true"
        />
        <p v-if="errors.registrationEndDate && touched.registrationEndDate" class="text-sm text-red-600 mt-1">{{ errors.registrationEndDate }}</p>
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
          :disabled="!isFormValid"
          class="px-12 py-4 text-xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-teal-700 hover:to-orange-600 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50"
        >
          <i class="fas fa-paper-plane mr-2"></i> Create Event
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useCookie } from '#app';
import { useNuxtApp } from '#imports';

const { $axios } = useNuxtApp();
const managedClubsCookie = useCookie('managedClubs', { path: '/', secure: false, sameSite: 'lax' });

const form = ref({
  name: "",
  description: "",
  eventStartDate: "",
  eventEndDate: "",
  location: "",
  additionalDetails: "",
  clubId: "",
  attendees: "",
  coordinators: ["", ""],
  registrationRequired: false,
  registrationStartDate: "",
  registrationEndDate: "",
});

const errors = ref({});
const touched = ref({
  name: false,
  description: false,
  eventStartDate: false,
  eventEndDate: false,
  location: false,
  clubId: false,
  attendees: false,
  coordinators: [false, false],
  registrationRequired: false,
  registrationStartDate: false,
  registrationEndDate: false,
});
const clubs = ref([]);
const clubMembers = ref([]);
const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

onMounted(async () => {
  // Fetch clubs from managedClubs cookie
  const managedClubs = managedClubsCookie.value || [];
  clubs.value = managedClubs;
  console.log('Managed Clubs:', clubs.value);

  // Fetch club members
  if (form.value.clubId) {
    await fetchClubMembers(form.value.clubId);
  }
});

watch(() => form.value.clubId, async (newClubId) => {
  if (newClubId) {
    await fetchClubMembers(newClubId);
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
    alert(`Uploaded file: ${file.name}`);
  } else {
    alert('Only jpg/jpeg files are allowed.');
  }
};

const fetchClubMembers = async (clubId) => {
  try {
    const { data } = await $axios.post('/api/clubs/fetch-club-members', { clubId });
    clubMembers.value = data.data;
  } catch (error) {
    console.error("Failed to fetch club members:", error);
  }
};

const validateForm = () => {
  const newErrors = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of today for accurate comparison

  if (!/^[a-zA-Z].{4,}$/.test(form.value.name)) {
    newErrors.name = 'Event name must start with a letter and have at least 5 characters.';
  }

  if (form.value.description.length < 15) {
    newErrors.description = 'Description must have at least 15 characters.';
  }

  if (!form.value.eventStartDate) {
    newErrors.eventStartDate = 'Event start date is mandatory.';
  } else if (new Date(form.value.eventStartDate) < today) {
    newErrors.eventStartDate = 'Event start date cannot be in the past.';
  }

  if (!form.value.eventEndDate) {
    newErrors.eventEndDate = 'Event end date is mandatory.';
  } else if (new Date(form.value.eventEndDate) < today) {
    newErrors.eventEndDate = 'Event end date cannot be in the past.';
  }

  if (form.value.eventStartDate && form.value.eventEndDate && 
      new Date(form.value.eventEndDate) < new Date(form.value.eventStartDate)) {
    newErrors.eventEndDate = 'Event end date must be after the start date.';
  }

  if (!form.value.location) {
    newErrors.location = 'Location is mandatory.';
  }

  if (!form.value.clubId) {
    newErrors.clubId = 'Club selection is mandatory.';
  }

  if (!form.value.coordinators[0] || !form.value.coordinators[1]) {
    newErrors.coordinators = 'Both coordinators are mandatory.';
  } else if (form.value.coordinators[0] === form.value.coordinators[1]) {
    newErrors.coordinators = 'Coordinators cannot be the same.';
  }

  if (form.value.registrationRequired) {
    if (!form.value.registrationStartDate) {
      newErrors.registrationStartDate = 'Registration start date is required when registration is required.';
    } else if (new Date(form.value.registrationStartDate) < today) {
      newErrors.registrationStartDate = 'Registration start date cannot be in the past.';
    } else if (new Date(form.value.registrationEndDate) < new Date(form.value.eventStartDate)) {
      newErrors.registrationStartDate = 'Registration End date cannot be less than event start date.';
    }

    if (!form.value.registrationEndDate) {
      newErrors.registrationEndDate = 'Registration end date is required when registration is required.';
    } else if (new Date(form.value.registrationEndDate) < today) {
      newErrors.registrationEndDate = 'Registration end date cannot be in the past.';
    } else if (form.value.registrationStartDate && 
               new Date(form.value.registrationEndDate) < new Date(form.value.registrationStartDate)) {
      newErrors.registrationEndDate = 'Registration end date must be after the start date.';
    }
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const isFormValid = computed(() => {
  return validateForm();
});

const submitEvent = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const response = await $axios.post('/api/events/create-new', form.value);
    alert(`Event Created Successfully! Response: ${JSON.stringify(response.data)}`);
    // Reset form after successful submission
    form.value = {
      name: "",
      description: "",
      eventStartDate: "",
      eventEndDate: "",
      location: "",
      additionalDetails: "",
      clubId: "",
      attendees: "",
      coordinators: ["", ""],
      registrationRequired: false,
      registrationStartDate: "",
      registrationEndDate: "",
    };
    touched.value = {
      name: false,
      description: false,
      eventStartDate: false,
      eventEndDate: false,
      location: false,
      clubId: false,
      attendees: false,
      coordinators: [false, false],
      registrationRequired: false,
      registrationStartDate: false,
      registrationEndDate: false,
    };
  } catch (error) {
    alert(`Failed to create event. Error: ${error.response?.data?.message || error.message}`);
  }
};

definePageMeta({
  layout: 'common'
});
</script>