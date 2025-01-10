<!-- 
  <template>
    <div>
      <Hero />
      <About :features="features" />
      <Features :cards="cards" />
      <Testimonials :testimonials="testimonials" />
      <Footer :links="links" :socials="socials" />
    </div>
  </template>
  
  <script setup>
  // Data for features



  // Footer data
  const links = [
    { text: 'Home', url: '/' },
    { text: 'Events', url: '/events' },
    { text: 'Clubs', url: '/clubs' },
    { text: 'Contact', url: '/contact' }
  ];
  

  </script>
  
  <style>
  .animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
  }
  
  .animate-fade-in-delay {
    animation: fadeIn 1s ease-out 0.5s forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style> -->

  <template>
     <div>
      <Hero/>
      <About :features="features" />
      <Features :cards="cards" />
      <Testimonials :testimonials="testimonials" />
      <Footer :links="links" :socials="socials" /> 
    </div>
  </template>
  
  <script setup>
    import Hero from './common-pages/hero.vue';
    import About from './common-pages/about.vue';
    import Features from './common-pages/features.vue';
    import Testimonials from './common-pages/testimonal.vue';
    import Footer from './common-pages/footer.vue';

  </script>
  
  <style lang="scss" scoped>
  
  </style>