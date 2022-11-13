<template>
    <div class="container mx-auto">
        <Navbar/>
        <Breadcrumb :crumbs=crumbs />
        <div class="user">
        <div class="flex mt-5">
                    <img :src="`${$axios.defaults.baseURL}` + '/' +$store.state.auth.user.image_url" class="w-36 h-36 rounded-full  mr-3" alt="">
                      <div class="desc w-full pt-2 flex flex-col">
                         <div class="flex justify-between">
                              <p class="text-xl overflow-hidden h-7 pt-1 font-bold">{{$store.state.auth.user.name}}</p>
                              <a @click="$router.push('Dashboard/user/edit')" class="text-xl hover:text-blue-main cursor-pointer"><font-awesome-icon icon="fa-solid fa-square-pen" /></a>
                         </div>
                          <p class="text-lg">{{$store.state.auth.user.occupation}}</p>
                      </div>
                </div>
        </div>
        <button class="button bg-green-new border-0 p-4 text-white object-right w-full " @click="$router.push('/Dashboard/project/create')">+ Ajukan Penggalangan Dana</button>
        <div class="grid grid-cols-1 mt-4">      
            <div class=" deskripsi">
                <div class="card">
                    <div class="card-body">
                      <ul class="navbar">
                        <li>
                          <a href="#/" class="tab active" data-id="home">
                            <span class="icon"><i class="fas fa-home"></i></span>
                            <span class="text">Proyek Saya</span>
                          </a>
                        </li>
                        <li>
                          <a href="#/" class="tab" data-id="profile">
                            <span class="icon"><i class="fas fa-user"></i></span>
                            <span class="text">Donasi Saya</span>
                          </a>
                        </li>
                      </ul>
              
                      <div class="tab-content">
                        <div class="tab-pane active" id="home">
                            <!-- print myproject -->
                            <div class=" px-6 sm:px-0 w-full mb-3" v-for="project in myProjects.data" :key="project.id">
                                <div class="relative group">
                                    <div role="hidden" class="absolute inset-0 w-full h-full rounded-3xl bg-white transition duration-300 shadow-xl group-hover:scale-105"></div>
                                    <div class="relative flex flex-wrap gap-6 p-6 sm:flex-nowrap">
                                        <div class="sm:w-5/12">
                                            <img :src="$axios.defaults.baseURL + '/' +project.image_url" class="h-full w-full object-cover rounded-2xl" alt="">
                                        </div>
                    
                                        <div class="space-y-4 sm:w-7/12">
                                            <h3 class="text-2xl font-bold text-gray-700">{{ project.name }}</h3>
                                            <p class="text-gray-600">{{ project.short_description }}</p>
                                            <span class="block py-2 px-4 rounded-xl bg-yellow-100 text-sm text-yellow-800 font-semibold" v-if="project.status == 'Pending'">Penggalangan dana untuk proyek ini sedang menunggu approval</span>
                                            <span class="block py-2 px-4 rounded-xl bg-green-100 text-sm text-green-800 font-semibold" v-else-if="project.status == 'Berjalan'">Penggalangan dana untuk proyek ini sedang berjalan</span>
                                            <span class="block py-2 px-4 rounded-xl bg-blue-100 text-sm text-blue-800 font-semibold" v-else-if="project.status == 'Dicairkan'">Penggalangan dana ini sudah selesai</span>
                                            <span class="block py-2 px-4 rounded-xl bg-red-100 text-sm text-red-800 font-semibold" v-else>Penggalangan dana untuk proyek ini Ditolak</span>
                                            <div class="pt-6 border-t flex gap-4">
                                                <button @click="$router.push('/dashboard/project/'+project.id)" class="button button-primary button-md mt-0 mb-0">Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="profile">
                           <!-- print mytransaction -->
                            <div class=" px-6 sm:px-0 w-full mb-3" v-for="transaction in myTransaction.data" :key="transaction.id">
                                <div class="relative group">
                                    <div role="hidden" class="absolute inset-0 w-full h-full rounded-3xl bg-white transition duration-300 shadow-xl group-hover:scale-105"></div>
                                    <div class="relative flex flex-wrap gap-6 p-6 sm:flex-nowrap">
                                        <div class="sm:w-5/12">
                                            <img :src="$axios.defaults.baseURL + '/' +transaction.campaign.image_url" class="h-52 w-full object-cover rounded-2xl" alt="">
                                        </div>
                    
                                        <div class="space-y-4 sm:w-7/12">
                                            <h3 class="text-2xl font-bold text-gray-700">{{ transaction.campaign.name }}</h3>
                                            <p class="text-gray-600">{{ 'Rp.'+new Intl.NumberFormat().format(transaction.amount) + ' - ' + transaction.created_at + ' - ' + transaction.status}}</p>
                                            <!-- <span class="block py-2 px-4 rounded-xl bg-yellow-100 text-sm text-yellow-800 font-semibold" v-if="project.status == 'Pending'">Penggalangan dana untuk proyek ini sedang menunggu approval</span>
                                            <span class="block py-2 px-4 rounded-xl bg-green-100 text-sm text-green-800 font-semibold" v-else-if="project.status == 'Berjalan'">Penggalangan dana untuk proyek ini sedang berjalan</span>
                                            <span class="block py-2 px-4 rounded-xl bg-red-100 text-sm text-red-800 font-semibold" v-else>Penggalangan dana untuk proyek ini Ditolak</span> -->
                                            <div class="pt-6 border-t flex gap-4">
                                                <!-- <button class="button button-primary button-md mt-0 mb-0">Detail</button> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              
                 
                </div>
        </div>
        <hr class="mt-16 text-gray">
        <Footer/>
    </div>
</template>
<script>
export default {
    middleware : 'auth',
    data (){
        return{
            crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Dashboard", path:"/Dashboard"}],
           
        }
    },
    async asyncData({$axios, app}){
        const myProjects =  await $axios.$get('/api/v1/campaigns?user_id=' +  app.$auth.user.id)
        const myTransaction = await $axios.$get('/api/v1/transactions')
        return {myProjects, myTransaction}
    }, 
    head() {
        return {
            script: [
                {
                    type: 'text/javascript',
                    src: '/js/tabs.js',
                },
            ]
        }
    },
}
</script>
<style scoped src="@/assets/css/detailtabs.css"></style>