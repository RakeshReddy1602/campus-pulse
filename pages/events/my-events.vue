<template>
  <div v-if="!isShowingEventDetails" class="min-h-screen bg-gradient-to-br from-purple-500 via-pink-300 to-indigo-500 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-extrabold text-white">My Events</h1>
        <!-- Toggle Buttons -->
        <div class="flex items-center space-x-4">
          <button
            @click="fetchEvents('upcoming')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Upcoming
          </button>
          <button
            @click="fetchEvents('ongoing')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'ongoing' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Ongoing
          </button>
          <button
            @click="fetchEvents('completed')"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              view === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700',
            ]"
          >
            Completed
          </button>
        </div>
      </div>

      <!-- Event Cards -->
      <div v-if="loading" class="text-center text-xl text-white">
        Loading events...
      </div>
      <div v-else-if="events.length === 0" class="text-center text-xl text-white">
        No events found.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="event in events"
          :key="event.id"
          class="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          :class="[
            'border-2',
            view === 'upcoming' ? 'bg-purple-100 border-indigo-500' : (view === 'ongoing' ? 'bg-yellow-100 border-yellow-500' : 'bg-pink-100 border-pink-500'),
          ]"
        >
          <h2
            :class="[
              'text-2xl font-bold mb-3',
              view === 'upcoming' ? 'text-indigo-700' : (view === 'ongoing' ? 'text-yellow-700' : 'text-pink-700'),
            ]"
          >
            {{ event.name }}
          </h2>
          <p class="text-gray-600 mb-4">{{ event.description }}</p>
          <div class="text-gray-700">
            <p><span class="font-medium">Start Date:</span> {{ new Date(event.event_start_date).toLocaleDateString() }}</p>
            <p><span class="font-medium">End Date:</span> {{ new Date(event.event_end_date).toLocaleDateString() }}</p>
            <p><span class="font-medium">Location:</span> {{ event.location }}</p>
          </div>
          <!-- View Event Details Button -->
          <button
            class="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
            @click="displayEventDetails(event)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isShowingEventDetails">
    <Details :event="selectedEvent" @close="isShowingEventDetails = false" />
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp, useCookie } from '#imports';
import Details from '~/components/event-details.vue';
const { $axios } = useNuxtApp();
const events = ref([]);
const loading = ref(true);
const view = ref('upcoming');
const userCookie = useCookie('user');
const selectedEvent = ref(null);
const userId = userCookie.value?.id;
let isShowingEventDetails = ref(false);

const fetchEvents = async (viewType) => {
  loading.value = true;
  view.value = viewType;

  let shouldFetchExpired = false;
  let shouldFetchOngoing = false;
  let shouldFetchUpcoming = false;

  if (viewType === 'upcoming') {
    shouldFetchUpcoming = true;
  } else if (viewType === 'ongoing') {
    shouldFetchOngoing = true;
  } else if (viewType === 'completed') {
    shouldFetchExpired = true;
  }

  try {
    const response = await $axios.post('/api/events/fetch-my-events', {
      userId,
      shouldFetchExpired,
      shouldFetchOngoing,
      shouldFetchUpcoming,
    });
    events.value = response.data.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEvents('upcoming');
});
const displayEventDetails = (event) => {
  isShowingEventDetails.value = true;
  selectedEvent.value = event;
  console.log('Selected event:', event);
};
definePageMeta({
  title: 'My Events',
  description: 'View all your events in one place.',
  layout: 'common'
})

</script>

<style scoped>
body {
  background-color: #f1f5f9; /* Soft off-white background color */
}
</style>
