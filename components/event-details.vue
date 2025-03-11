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
        <p class="text-lg text-gray-600"><span class="font-medium">Organizer 1:</span> {{ event.primary_coordinator?.name }}</p>
        <p class="text-lg text-gray-600"><span class="font-medium">Organizer 2:</span> {{ event.secondary_coordinator?.name }}</p>
      </div>

      <!-- Event Date -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-purple-600 mb-2">Event Date</h3>
        <p class="text-lg text-gray-600">{{ formattedDate }}</p>
      </div>

      <!-- Location -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-purple-600 mb-2">Location</h3>
        <p class="text-lg text-gray-600">{{ event.location }}</p>
      </div>

      <!-- Additional Details -->
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-purple-600 mb-2">Additional Details</h3>
        <p class="text-lg text-gray-600">{{ event.additional_details || 'No additional details available.' }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center">
        <button
          @click="emit('close')"
          class="px-6 py-3 text-lg font-semibold bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  event: Object
});

const emit = defineEmits(["close"]);

const formattedDate = computed(() => {
  return `${new Date(event.event_start_date).toLocaleDateString()} - ${new Date(event.event_end_date).toLocaleDateString()}`;
});
</script>
 