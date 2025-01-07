<template>
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="card in cards" :key="card.title"
               class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Icon :name="card.icon" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ card.title }}
            </h3>
            <p class="text-gray-600">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>

<script setup>
      // Data for feature cards
  const cards = [
    {
      icon: 'ph:calendar',
      title: 'Event Management',
      description: 'Organize and participate in college events seamlessly'
    },
    {
      icon: 'ph:chat-circle',
      title: 'Community Forums',
      description: 'Engage in discussions with fellow students'
    },
    {
      icon: 'ph:trophy',
      title: 'Achievement Tracking',
      description: 'Monitor and showcase your academic accomplishments'
    }
  ];
</script>