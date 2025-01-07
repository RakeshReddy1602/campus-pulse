<template>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <img 
            src = '../../public/favicon.ico'
              alt="College Life"
              class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Our Portal?
            </h2>
            <div class="space-y-6">
              <div v-for="(feature, index) in features" :key="index" 
                   class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon :name="feature.icon" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    {{ feature.title }}
                  </h3>
                  <p class="text-gray-600">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
  const features = [
    {
      icon: 'ph:code',
      title: 'Hackathons',
      description: 'Join exciting coding challenges and showcase your skills'
    },
    {
      icon: 'ph:users',
      title: 'Club Elections',
      description: 'Participate in democratic club leadership selection'
    },
    {
      icon: 'ph:book',
      title: 'Resource Sharing',
      description: 'Access and share study materials with your peers'
    }
  ];
  
</script>