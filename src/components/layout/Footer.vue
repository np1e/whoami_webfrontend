<template>
    <footer class="footer bg-primary sticky space-y-4">
        <div class="footer-top px-xl">
            <nav class="footer-nav">
                <ul class="footer-nav__items flex items-center">
                    <li>
                        <footer-link route="/about">About</footer-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="footer-bottom pb-lg pt-md px-xl border-t-1 flex justify-between items-center">
            <p class="flex place-items-center">Made with 
                <svg class="h-4 w-4 mx-1 hover:opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg> 
                in Wiesbaden
            </p>
            <div class="footer-bottom__legal flex space-x-4">
                <footer-link route='/legal/terms'>Terms of Service</footer-link>
                <footer-link route='/legal/privacy'>Privacy Policy</footer-link>
            </div>
        </div>
    </footer>
</template>

<script>
import FooterLink from '../FooterLink.vue';

export default {
    name: "custom-footer",
    components: {
        FooterLink
    }
}
</script>

<style lang="scss">
footer {
    color: var(--light-gray);

    .footer-top {
        
    }

    .footer-nav {

        border-bottom: solid 1px rgba(210, 213, 217, 0.5);

        a {
            line-height: 70px;
            border-bottom: solid 2px var(--primary);
            display: inline-block;

            &:hover {
                border-color: white;
            }
        }

        .footer__item {            
            font-weight: 500;
        }
    }

    .footer-bottom__legal {
        a {

            opacity: 0.9;

            &:hover {
               opacity: 1; 
            }
        }
    }
}
</style>