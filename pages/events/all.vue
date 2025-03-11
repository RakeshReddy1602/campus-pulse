<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-100 via-orange-100 to-yellow-100 p-10">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-extrabold text-gray-800 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-orange-600">
        All Events
      </h1>
    </header>

    <div v-if="loading" class="text-center text-xl text-gray-700">
      Loading events...
    </div>

    <div v-else-if="events.length === 0" class="text-center text-xl text-gray-700">
      No events found.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ event.name }}</h2>
        <p class="text-gray-600 mb-4">{{ event.description }}</p>
        <p class="text-gray-600 mb-2"><strong>Start Date:</strong> {{ new Date(event.event_start_date).toLocaleDateString() }}</p>
        <p class="text-gray-600 mb-2"><strong>End Date:</strong> {{ new Date(event.event_end_date).toLocaleDateString() }}</p>
        <p class="text-gray-600 mb-4"><strong>Location:</strong> {{ event.location }}</p>
        <button
          @click="registerEvent(event.id)"
          class="px-4 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp, useCookie } from '#imports';

const { $axios } = useNuxtApp();
const events = ref([]);
const loading = ref(true);
const userCookie = useCookie('user');
const userId = userCookie.value?.id;

const fetchEvents = async () => {
  try {
    const response = await $axios.post('/api/events/fetch-all', { userId });
    events.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
  } finally {
    loading.value = false;
  }
};

const registerEvent = async (eventId: number) => {
  try {
    const response = await $axios.post('/api/events/register', { eventId, userId });
    fetchEvents();
    alert(`Response: ${response.data.message}`);
  } catch (error) {
    alert(`Failed to register for event. Error: ${error.response?.data?.message || error.message}`);
  }
};

onMounted(() => {
  fetchEvents();
});

definePageMeta({
  title: 'All Events',
  description: 'View all events available for registration.',
  layout: 'common'
})
</script>

<style>
/* Add any additional styles here */
</style>