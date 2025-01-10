<template>
  <section class="py-20 bg-gradient-to-r from-orange-500 via-red-400 to-yellow-600">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left side: Image -->
        <div class="relative">
          <img 
            src="../../public/logo.jpg"
            alt="College Life"
            class="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full h-auto"
          />
        </div>
        
        <!-- Right side: Text content -->
        <div>
          <h2 class="text-3xl font-bold text-white mb-6">
            Why Choose Our Portal?
          </h2>
          <p class="text-lg text-white mb-8">
            Our platform offers a variety of features designed to make your college life easier and more enjoyable. From hackathons to resource sharing, join the community and take part in exciting opportunities.
          </p>
          <div class="space-y-6">
            <div v-for="(feature, index) in features" :key="index" class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <Icon :name="feature.icon" class="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-white">{{ feature.description }}</p>
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
