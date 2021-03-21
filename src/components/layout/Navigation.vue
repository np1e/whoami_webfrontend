<template>
    <nav class="nav">
        <div class="nav-screen relative flex justify-left border-b-2 border-gray-100 items-center md:px-xl px-md">
            <div class="nav__responsive-menu-button inset-y-0 left-0 flex items-center sm:hidden">
                <button v-on:click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <!-- Icon when menu is closed. -->
                    <svg :class="[menuOpen ? 'hidden' : 'block']" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <!-- Icon when menu is open. -->
                    <svg :class="[menuOpen ? 'block' : 'hidden']" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="nav__logo mr-12">
                <nav-link route="/">Who Am I?</nav-link>
            </div>
            <div class="nav__items flex justify-between items-center flex-grow">
                <div class="nav__items-left items center space-x-8 hidden sm:flex">
                        <nav-link route="/how">How it works</nav-link>
                        <nav-link route="/about">About</nav-link>
                </div>
                <div class="nav__items-right items-center space-x-8 hidden sm:flex">
                <nav-link route="/submit">Submit collections</nav-link>
                </div>
            </div>
        </div>
        <!--
        Mobile menu, toggle classes based on menu state.

        Menu open: "block", Menu closed: "hidden"
        -->
        <div :class="[menuOpen ? 'block' : 'hidden']" class="sm:hidden" v-scroll-lock="menuOpen">
            <div class="nav__items nav__items-responsive flex flex-col bg-background h-full w-screen px-md items-start space-y-1">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <nav-link route="/how">How it works</nav-link>
                <nav-link route="/about">About</nav-link>
                <nav-link route="/submit">Submit collections</nav-link>
            </div>
        </div>
    </nav>
</template>

<script>
import NavLink from '../NavLink.vue';

export default {
    name: "Navigation",
    data: function() {
      return {
        menuOpen: false
      }
    },
    components: {
        NavLink,
    },
    methods: {
      toggleMenu: function() {
        this.menuOpen = !this.menuOpen;
      },
    },
    watch:{
        $route: function(){
            console.log("route changed");
            this.menuOpen = false;
        }
} 
   
}
</script>

<style lang="scss">
.nav {
    
    font-size: 16px;

    .nav-screen {
      min-height: 80px;
  }

  .nav__items {
    font-weight: 500;

    &.nav__items-responsive {
        position: fixed;
      z-index: 1;
      font-size: 25px;
    }
  }

  .nav__logo {
    font-size: 26px;
    font-weight: 700;
    color: var(--primary);
  }
}
</style>