<template>
    <div class="p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Club Events</h2>
  
      <!-- Alert for Reschedule Message -->
      <div v-if="rescheduleMessage" class="mb-4 p-3 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded">
        {{ rescheduleMessage }}
      </div>
  
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          :class="{
            'bg-red-100 border-red-500': event.status === 'Cancelled',
            'bg-green-100 border-green-500': event.status === 'Scheduled',
            'bg-gray-100 border-gray-500': event.status === 'Completed',
            'bg-yellow-100 border-yellow-500': event.status === 'Coming Soon'
          }"
        >
          <div>
            <p class="text-lg font-medium">{{ event.name }}</p>
            <p class="text-sm text-gray-600">Date: {{ event.date }}</p>
            <p class="text-sm font-semibold"
              :class="{
                'text-red-700': event.status === 'Cancelled',
                'text-yellow-700': event.status === 'Coming Soon',
                'text-green-700': event.status === 'Scheduled',
                'text-gray-700': event.status === 'Completed'
              }">
              Status: {{ event.status }}
            </p>
          </div>
          <div class="space-x-2">
            <button
              v-if="event.status === 'Scheduled'"
              class="px-3 py-1 bg-red-500 text-white rounded"
              @click="cancelEvent(event.id)"
            >
              Cancel
            </button>
            <button
              v-if="event.status === 'Scheduled'"
              class="px-3 py-1 bg-yellow-500 text-white rounded"
              @click="rescheduleEvent"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
  
      <p v-if="events.length === 0" class="text-center text-gray-500 mt-4">No events scheduled.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  definePageMeta({
    title: "Club Events",
    description: "View club events",
    layout: "club",
  })

  const events = ref([
    { id: 1, name: "Coding Hackathon", date: "2025-04-10", status: "Scheduled" },
    { id: 2, name: "AI Workshop", date: "2025-05-15", status: "Scheduled" },
    { id: 3, name: "Sports Meet", date: "2025-06-20", status: "Scheduled" },
    { id: 4, name: "Tech Talk", date: "2025-02-01", status: "Completed" },
    { id: 5, name: "Networking Event", date: "2025-01-15", status: "Completed" },
  ]);
  
  const rescheduleMessage = ref("");
  
  const cancelEvent = (id) => {
    const event = events.value.find(e => e.id === id);
    if (event) event.status = "Cancelled";
  };
  
  const rescheduleEvent = () => {
    rescheduleMessage.value = "Reschedule option is not there yet. Coming soon.";
  
    // Hide message after 3 seconds
    setTimeout(() => {
      rescheduleMessage.value = "";
    }, 3000);
  };
  </script>
  