<template>
    <nav class="flex justify-between mt-10">
            <div>
                <h1 class="font-bold text-blue-main">UTY Funds Point</h1>
            </div>
            <div>
                <nuxt-link to="/" class="nav-link ml-5 active-nav" href="">Beranda</nuxt-link>
                <nuxt-link to="/list" class="nav-link ml-5">Proyek</nuxt-link>
                <nuxt-link to="/faq" class="nav-link ml-5">FAQ</nuxt-link>
            </div>
            <div v-if="!this.$store.state.auth.loggedIn">
                <nuxt-link to="/login" class="nav-link mr-6">Masuk</nuxt-link>
                <nuxt-link class="nav-link" to="/register">Daftar</nuxt-link>
            </div>
            <div class="flex akun" v-else>
                <div class="dropdown inline-block relative z-18">
                    <button class="text-black font-semibold  pr-6 rounded inline-flex items-center  w-40  overflow-hidden whitespace-nowrap">
                            <img class="h-10 w-10 rounded-full mr-2" :src="$axios.defaults.baseURL +'/'+$store.state.auth.user.image_url" alt="">
                            
                            <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                    </button>
                    <ul
                        class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow-lg w-full -mt-2 "
                    >
                        <li class="">
                        <a
                            class="bg-white hover:bg-gray-100 hover:text-blue-secondary py-2 px-4 block whitespace-no-wrap"
                            href="/dashboard"
                            >Dasbor saya</a
                        >
                        </li>
                        <li class="">
                        </li>
                        <li class="">
                        <a
                            class="cursor-pointer rounded-b bg-white hover:bg-gray-100 hover:text-blue-secondary py-2 px-4 block whitespace-no-wrap"
                            @click="logout()"
                            >Keluar</a
                        >
                        </li>
                    </ul>
                    
                </div>
            </div>
      </nav>
</template>

<script>
export default {
    methods : {
        async logout(){
            await this.$auth.logout()
        }
    }
}
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
            display: block;
        }
</style>