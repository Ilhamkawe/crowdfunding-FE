<template>
    <div class="container mx-auto">
        <Navbar/>
         <div class="w-1/2 mx-auto text-center pt-10 pb-10">
            <h1 class="text-4xl font-bold">List Proyek</h1>
            <h3 class="text-2xl">Cari Ide Ide Kreatif Mahasiswa</h3>
        </div>
        <div class="content">
            <div class="grid grid-cols-8">
              <div class="flex flex-wrap  col-span-5">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Nama Proyek
                  </label>
                  <input v-model="search.name" class="w-full h-12 p-5 rounded-full bg-gray-white focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main" id="grid-password" type="text" placeholder="">
                </div>
              </div>
              <div class="w-full  px-3 mb-6 md:mb-0 col-span-2">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Kategori
                </label>
                <div class="relative">
                  <select v-model="search.cattegory" class=" h-12 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700  rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option value="semua">Semua</option>
                    <option v-for="cat in cattegory.data" :key="cat.ID" :value="cat.Name">{{cat.Name}}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div class="px-3"><button @click="searchItem" class="button h-12 button-primary text-md button-lg w-full rounded-full ">Cari</button></div>
            </div>
            <div class="result p-3 mt-6 text-2xl font-bold">
              <h1>Hasil ({{ campaigns.data.campaigns.length }})</h1>
            </div>
            <div class="grid grid-cols-3 gap-4 mt-6 pl-9">
                <nuxt-link :to="'/project/'+campaign.id" v-for="campaign in campaigns.data.campaigns" :key="campaign.id">
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
                          <p class="font-bold text-blue-main">{{ parseInt((campaign.current_amount / campaign.goal_amount) * 100 )+ '%' }}</p>
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
          <div class="flex items-center space-x-1 mt-8" v-if="campaigns.data.page_count != 0">
              <a v-if="campaigns.data.page != 1" @click="paginateAct('prev')" class="cursor-pointer flex items-center px-2 py-2 text-gray-500 bg-gray-300 rounded-md ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
              </a>
              <div v-for="index in parseInt(campaigns.data.page_count)" :key="index">
                <a  v-if="index === campaigns.data.page" class="cursor-pointer px-4 text-2xl py-2 text-gray-700 rounded-md bg-blue-main text-white" @click="movePage(index)" >
                  {{ index }}
                </a>
                <a v-else class="cursor-pointer px-4 text-2xl py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-main hover:text-white" @click="movePage(index)" >
                    {{ index }}
                </a>
                
              </div>
              
              <a v-if="campaigns.data.page != campaigns.data.page_count" @click="paginateAct('next')" class="cursor-pointer px-2  text-gray-500 bg-gray-300 rounded-md hover:text-blue-main">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
              </a>
          </div>
        </div>
        <Footer/>
     </div>
</template>

<script>
export default {
  data () {
    return {
      isSearch : false,
      search : {
        name : "", 
        cattegory : "", 
        limit : 9
      },
      campaigns: "",
    }
  },
  async asyncData({$axios}){
    const campaigns = await $axios.$post('/api/v1/campaigns/paginate?page=1', {
        limit : 9
    })
  const cattegory = await $axios.$get("/api/v1/cattegory")
    return { campaigns, cattegory }
  },
  methods : {
    
    async movePage(page){
      const campaigns = await this.$axios.$post('/api/v1/campaigns/paginate?page='+page, {
        limit : this.campaigns.data.limit
    })
    
    this.campaigns = campaigns
    },
    
    async paginateAct(action){
      var urlAct = this.isSearch ? "/api/v1/campaigns/paginate?page=" : "/api/v1/campaign/search/paginate?page="
      var page = this.campaigns.data.page
      if (page === 1){
        if (action === "next"){
          page++
        }
        const campaigns = await this.$axios.$post(urlAct+page, {
          limit : this.campaigns.data.limit
        })
        this.campaigns = campaigns
      }else if(page === this.campaigns.data.page_count) {
        if (action === "prev"){
          page--
        }
        const campaigns = await this.$axios.$post(urlAct+page, {
          limit : this.campaigns.data.limit
        })
        this.campaigns = campaigns
      }else {
        if (action === "next"){
          page++
        }else if (action === "prev"){
          page--
        }
        const campaigns = await this.$axios.$post(urlAct+page, {
          limit : this.campaigns.data.limit
        })
        this.campaigns = campaigns
      }
      
    },

    async searchItem(){
      this.isSearch = true;
      try{
        const campaigns = await this.$axios.$post("/api/v1/campaign/search/paginate?page=1", this.search)
        this.campaigns = campaigns
      }catch (error){
        console.log(error)
      }
    }
  }
}
</script>
<style>
body{
    margin-left : 6rem;
    margin-right : 6rem;
    margin-top: 3rem;
  }
</style>