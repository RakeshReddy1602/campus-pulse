 <!-- components/Hero.vue -->
 <template>
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-gray-100">
      <!-- Abstract Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.1),rgba(37,99,235,0)_70%)]"></div>
        <!-- Animated Wave -->
        <div class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white/10"></div>
      </div>
  
      <div class="container mx-auto px-4 z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in">
            Revolutionize Your College Experience
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mb-8 opacity-0 animate-fade-in-delay">
            Connecting students to opportunities, clubs, and events
          </p>
          <button class="bg-blue-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Join Now
          </button>
        </div>
      </div>
    </section>
  </template>
  