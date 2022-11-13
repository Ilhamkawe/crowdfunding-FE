<template>
    <div class="container mx-auto">
        <Navbar/>
        <div class="profile mt-10">
                <div class="flex flex-col text-center">
                    <div class="relative w-36 h-36 mx-auto">   
                        <img :src="`${$axios.defaults.baseURL}` + '/' +$store.state.auth.user.image_url" class="w-36 h-36 rounded-full mx-auto" alt="">
                    </div>
                    <div class="desc pt-2 flex flex-col">
                        <p class="text-2xl overflow-hidden h-7 pt-1 font-bold">{{$store.state.auth.user.name}}</p>                       
                        <p class="text-xl">{{$store.state.auth.user.email}}</p>
                        <p class="text-xl">{{$store.state.auth.user.occupation}}</p>
                    </div>
                </div>
            </div>
            <div class="user-campaign-info flex flex-row mt-14">
                <a href="" class="mr-8 font-semibold">Proyek</a>
                <a href="" class="mr-8 text-gray-label">Donasi</a>
            </div>
            <hr class="w-full text-gray mt-6">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5" >  
                <nuxt-link :to="'/project/'+campaign.id" v-for="campaign in campaigns.data" :key="campaign.id">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg hover:-translate-y-1">
                      <div v-if='campaign.image_url != "" '>
                        <img  class="w-full" :src="$axios.defaults.baseURL + '/' +campaign.image_url">
                      </div>
                      <div v-else>
                        <img  class="w-full" src="/image/404-error-page-free-psd-template-image-2815404_o.jpg">
                      </div>
                      <div class="px-6 py-4">
                          <p class="text-blue-cat">{{ campaign.cattegory }}</p>
                        <div class="font-bold text-lg mb-2">{{ campaign.name }}</div>
                        <p class="text-gray overflow-hidden h-11 text-base">
                          {{ campaign.short_description }}
                        </p>
                        <div class="flex justify-between mt-4">
                          <p class="font-bold text-blue-main">{{ parseInt((campaign.current_amount / campaign.goal_amount) * 100) + '%'}}</p>
                          <p class="font-bold">Rp. {{ new Intl.NumberFormat().format(campaign.goal_amount) }}</p>
                        </div>
                        <div class="h-4 relative max-w-xl rounded-full overflow-hidden">
                          <div class="w-full h-full bg-gray absolute"></div>
                          <div class="h-full bg-gradient-to-r from-blue-secondary to-blue-main absolute" :style="'width:' + (campaign.current_amount / campaign.goal_amount) * 100 + '%'"></div>
                      </div>
                      <div class="flex justify-between">
                          <div>
                              <img class="time-icon inline-block" src="/image/clock-circular-outline.svg" width="15px">
                              <span class="text-gray inline-block">2 jam lagi</span>
                          </div>
                          <!-- <p class="text-gray">Terkumpul</p> -->
                      </div>
                      <div class="flex mt-5">
                          <img :src="`${$axios.defaults.baseURL}` + '/' + campaign.user.image_url" class="w-11 h-11 rounded-full  mr-3" alt="">
                            <div class="desc overflow-hidden h-11">
                                <span class="text-gray">Dibuat oleh</span>
                                <p class="author">{{campaign.author}}</p>
                            </div>
                      </div>
                      </div>
                    </div>
                  </nuxt-link>   
                </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }, 

    async asyncData({$axios, params}){

        let campaigns = await $axios.$get("/api/v1/campaigns?user_id="+params.id)

        return {
            campaigns
        }

    }
}
</script>