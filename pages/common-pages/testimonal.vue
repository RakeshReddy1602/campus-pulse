<template>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="relative">
            <div class="flex overflow-hidden">
              <div v-for="testimonial in testimonials" :key="testimonial.id"
                   class="w-full flex-shrink-0 transition-transform duration-500"
                   :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                  <p class="text-gray-700 text-lg mb-4">{{ testimonial.text }}</p>
                  <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                      <p class="text-gray-600">{{ testimonial.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button @click="prevSlide" class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12">
              <Icon name="ph:caret-left" class="w-8 h-8 text-gray-400 hover:text-gray-600" />
            </button>
            <button @click="nextSlide" class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12">
              <Icon name="ph:caret-right" class="w-8 h-8 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
<script setup>
      
  // Data for testimonials
  const testimonials = [
    {
      id: 1,
      text: 'The portal has transformed how we organize club activities.',
      name: 'Sarah Johnson',
      role: 'Student Council President'
    },
    {
      id: 2,
      text: 'Managing events has never been easier.',
      name: 'Mike Chen',
      role: 'Tech Club Leader'
    }
  ];

  function prevSlide() {

  }
  
  function nextSlide() {
    
  }


</script>