<template>
    <div class="container mx-auto">
        <Navbar/>
        <Breadcrumb :crumbs=crumbs />
        <div class="grid grid-cols-4">
            <div class="col-span-2 pr-10 pt-4 pb-10">
                <div class="tumbnail  w-full h-3/4">
                    <div class="main-image h-full">
                        <img :src="default_image" class="w-full h-full mt-5" alt="" srcset="">
                    </div> 
                </div>
                <div class="tumbnail  w-full h-full flex justify-evenly">
                    <div v-for="images in project.data.images" :key="images.id" class="group sub-image w-1/4 h-1/5 m-1 relative cursor-pointer" @click="changeImage(images.image_url)">
                        <img :src="`${$axios.defaults.baseURL}` + '/' + images.image_url" class="w-full h-full" alt="" srcset="">
                        <div class="opacity-0 h-full group-hover:opacity-60 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end text-xl bg-blue-main text-white font-semibold"></div>
                    </div> 
                </div>
            </div>
            <div class="col-span-2 pt-4 pb-10">
                <button class="button button-primary bg-blue-main w-44 h-12 p-2 text-lg cat-button shadow-2xl">{{ project.data.cattegory }}</button>
                <h1 class="font-bold text-3xl mt-6 w-full">{{ project.data.name }}</h1>
                <p class="mt-3 w-full text-lg overflow-hidden h-12">{{ project.data.short_description }}</p>
                <div class="flex mt-5">
                    <img :src="`${$axios.defaults.baseURL}` + '/' + project.data.user.image_url" class="w-11 h-11 rounded-full  mr-3" alt="">
                      <div class="desc w-full pt-2 flex">
                          <p class="overflow-hidden h-7 w-1/3 pt-1 font-bold">{{ project.data.user.name }}</p>
                          <img src="/image/calendar-interface-symbol-tool.svg" class="w-6 -mt-1" alt="">
                          <!-- <p class="ml-3 pt-1">29 feb 2021</p> -->
                      </div>
                </div>
                <div class="flex mx-auto justify-evenly mt-5">
                    <div class="flex flex-col bg-blue-tr text-center rounded-md p-6 w-44">
                        <h1 class="text-xl">{{new Intl.NumberFormat().format(project.data.current_amount / 1000) }}k</h1>
                        <p class="text-gray-stat">Terkumpul</p>
                    </div>
                    <div class="flex flex-col bg-blue-tr text-center rounded-md p-6 w-44">
                        <h1 class="text-xl">{{ project.data.backer_count }}</h1>
                        <p class="text-gray-stat">Donatur</p>
                    </div>
                    <!-- <div class="flex flex-col bg-blue-tr text-center rounded-md p-6 w-44">
                        <h1 class="text-xl">10</h1>
                        <p class="text-gray-stat">Hari Lagi</p>
                    </div> -->
                </div>
                <div class="stat">
                    <div class="flex justify-between mt-4">
                        <p class="font-bold text-blue-main">{{ parseInt((project.data.current_amount / project.data.goal_amount) * 100 )+ '%' }}</p>
                        <p class="font-bold">Rp.{{ new Intl.NumberFormat().format(project.data.goal_amount) }}</p>
                      </div>
                      <div class="h-4 relative w-full rounded-full overflow-hidden">
                        <div class="w-full h-full bg-gray absolute"></div>
                        <div class="h-full bg-gradient-to-r from-blue-secondary to-blue-main absolute" :style="'width:' + (project.data.current_amount / project.data.goal_amount) * 100 + '%'"></div>
                    </div>
                </div>
                <button @click="$router.push('/paid/'+$route.params.id)" class="button button-md button-primary rounded-full">
                    Donasi Sekarang 
                </button>
            </div>
        </div>
        <div class="grid grid-cols-4 mt-8">
            
            <div class="col-span-3 info">
                <div class="card detail">
                    <div class="card-body">
                      <ul class="navbar">
                        <li>
                          <a href="#/" class="tab active" data-id="home">
                            <span class="icon"><i class="fas fa-home"></i></span>
                            <span class="text">Deskripsi</span>
                          </a>
                        </li>
                        <li>
                          <a href="#/" class="tab" data-id="activity">
                            <span class="icon"><i class="fas fa-user"></i></span>
                            <span class="text">Aktivitas</span>
                          </a>
                        </li>
                      </ul>
              
                      <div class="tab-content">
                        <div class="tab-pane active desc-html-render" id="home" v-html="project.data.description">

                        </div>
                        <div class="tab-pane" id="activity">
                           <div class="p-10">  
                                <!--Card 1-->
                                <div class="w-full cursor-pointer rounded overflow-hidden shadow-lg mb-4"  v-for="act, index in activity.data" :key="index" @click="$router.push('/project/activity/'+act.id)">
                                <img class="w-full h-80" :src="`${$axios.defaults.baseURL}` + '/' + act.image_url" alt="Mountain">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{{act.name}}</div>
                                    <p class="text-gray-700 text-base">
                                    {{ act.short_description }}
                                    </p>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{act.campaign}}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="col-span-1" >
                <div class="reward p-10 mb-10 bg-white shadow-2xl rounded-md" v-for="reward in project.data.reward" :key="reward.id">
                    <h1 class="font-bold text-lg">Hadiah</h1>
                    <h3><span class="text-lg font-bold text-blue-main">Rp.{{new Intl.NumberFormat().format(reward.min_donate / 1000) }}k</span> atau lebih</h3> 
                    <br>
                    <p class="text-gray-stat">anda akan mendapatkan hadiah berupa: </p>
                    <ol class="list-disc ml-5">
                        <li v-for="perk in reward.perks" :key="perk.id">
                            {{ perk }}
                        </li>
                    </ol>
                    <br>
                    <button @click="$router.push('/paid/'+$route.params.id+'/#/')" class="button button-primary button-md font-bold rounded-full w-3/5 h-14 text-sm">Donasi Sekarang<span class="fas fa-arrow-right"></span></button>
                </div>
            </div>
        </div>
        <hr class="mt-16 text-gray">
        <Footer/>
     </div>
</template>

<script>
export default {
    // middleware : 'auth',
    data () {
        return {
            default_image : "",
            crumbs : [{name: "Beranda", path:"/"},{name: "Proyek", path:"/list"},{name: "Detail", path:""}]
        }
    },
    methods: {
        changeImage(url){
            this.default_image = this.$axios.defaults.baseURL + "/" + url;
        }
    },head() {
        return {
            script: [
                {
                    type: 'text/javascript',
                    src: '/js/tabs.js',
                },
            ]
        }
    },
    async asyncData ({$axios, params}){
            const project = await $axios.$get("/api/v1/campaigns/" + params.id)
            const activity = await $axios.$get("/api/v1/campaign/activity/" + params.id)
            return { project, activity }
        },
    mounted () {
        this.default_image = this.$axios.defaults.baseURL + "/" + this.project.data.image_url
    }
}
</script>

<style scoped src="@/assets/css/detailtabs.css"></style>

<style scoped>
body{
    margin-left : 6rem;
    margin-right : 6rem;
    margin-top: 3rem;
  }
  
</style>