<template>
  <section class="py-20 bg-gradient-to-r from-orange-400 to-teal-300">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="card in cards" :key="card.title"
             class="bg-gradient-to-r p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
             :class="card.bgColor">
          <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
            <component :is="card.icon" class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">
            {{ card.title }}
          </h3>
          <p class="text-white">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import icons from @heroicons/vue
import { CalendarIcon, ChatBubbleLeftIcon, TrophyIcon } from '@heroicons/vue/24/solid';

const cards = [
  {
    icon: CalendarIcon, // Heroicon for Calendar
    title: 'Event Management',
    description: 'Organize and participate in college events seamlessly',
    bgColor: 'bg-gradient-to-r from-purple-500 to-blue-600' // Purple to Blue gradient
  },
  {
    icon: ChatBubbleLeftIcon, // Heroicon for Chat Bubble
    title: 'Community Forums',
    description: 'Engage in discussions with fellow students',
    bgColor: 'bg-gradient-to-r from-brown-400 to-teal-400' // Brown to Teal gradient
  },
  {
    icon: TrophyIcon, // Heroicon for Trophy
    title: 'Achievement Tracking',
    description: 'Monitor and showcase your academic accomplishments',
    bgColor: 'bg-gradient-to-r from-indigo-600 to-green-500' // Indigo to Green gradient
  }
];
</script>
