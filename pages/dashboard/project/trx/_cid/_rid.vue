<template>
    <div class="container mx-auto">
        <Navbar/>
        <div class="profile mt-10">
                <div class="mb-4 w-full grid grid-cols-3 gap-4">
                          <div class="mr-4 img">
                            <img :src="`${$axios.defaults.baseURL}` + '/' + project.data.image_url" alt="">
                          </div>
                          <div class="title">
                            <h1 class="text-lg font-bold mb-2">{{project.data.name}}</h1>
                            <p><span class="">oleh</span> {{project.data.user.name}}</p>
                          </div>
                        </div>
            </div>
            <h1 class="text-2xl font-bold  mt-14">Transaksi Donasi</h1>
            <div class="user-campaign-info flex flex-row  mt-4">
                <div v-for="rw, index in project.data.reward" :key="index">
                    <a :href="rw.id" class="mr-8 font-semibold cursor-pointer" >Reward {{index + 1}}</a>
                </div>
            </div>
            <hr class="w-full text-gray mt-6">
            <div class="w-full p-10 " >  
                  
                <div class="flex mt-5 w-full" v-for="(trx, index) in transaction.data.campaigns" :key="index">
                    <img :src="`${$axios.defaults.baseURL}` + '/' + trx.User.AvatarFileName" class="w-36 h-36 rounded-full  mr-3" alt="">
                      <div class="desc w-full pt-2 flex flex-col">
                         <div class="flex justify-between">
                              <p class="text-xl overflow-hidden h-7 pt-1 font-bold">{{trx.User.Name}}</p>
                              <a @click="$router.push('Dashboard/user/edit')" class="text-xl text-blue-main cursor-pointer font-bold">Rp. {{new Intl.NumberFormat().format(trx.amount)}}</a>
                         </div>
                          <p class="text-lg">{{trx.User.Email}}</p>
                          <p class="text-lg">{{trx.User.Occupation}}</p>
                      </div>
                </div>

                </div>
                <div class="flex items-center space-x-1 mt-8">
                    <a @click="paginateAct('prev')" class="cursor-pointer flex items-center px-2 py-2 text-gray-500 bg-gray-300 rounded-md ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </a>
                    <div v-for="index in parseInt(transaction.data.page_count)" :key="index">
                        <a  v-if="index === transaction.data.page" class="cursor-pointer px-4 text-2xl py-2 text-gray-700 rounded-md bg-blue-main text-white" @click="movePage(index)" >
                        {{ index }}
                        </a>
                        <a v-else class="cursor-pointer px-4 text-2xl py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-main hover:text-white" @click="movePage(index)" >
                            {{ index }}
                        </a>
                        
                    </div>
                    
                    <a @click="paginateAct('next')" class="cursor-pointer px-2  text-gray-500 bg-gray-300 rounded-md hover:text-blue-main">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
    </div>
</template>

<script>
   export default {
        middleware : "auth", 
        data(){
            return{}
        },
        async asyncData ({$axios,params}){
            try {
                const project = await $axios.$get("/api/v1/campaign/" + params.cid + "/user")
                    const transaction = await $axios.$post("/api/v1/campaigns/transactions/"+params.rid+"/reward?campaign_id="+params.cid+"&page=1", {
                        limit : 9
                    })
                    return { project, transaction }
            }catch(e){
                console.log(e)
            }
    },
    methods : {
        async movePage(page){
        const transaction = await this.$axios.$post("/api/v1/campaigns/transactions/"+this.$route.params.rid+"/reward?campaign_id="+this.$route.params.cid+"&page="+page, {
            limit : this.transaction.data.limit
        })
        
        this.transaction = transaction
        },
        async paginateAct(action){
        var page = this.transaction.data.page
        if (page === 1){
            if (action === "next"){
            page++
            }
           const transaction = await this.$axios.$post("/api/v1/campaigns/transactions/"+this.$route.params.rid+"/reward?campaign_id="+this.$route.params.cid+"&page="+page, {
            limit : this.transaction.data.limit
            })
            this.transaction = transaction
        }else if(page === this.transaction.data.page_count) {
            if (action === "prev"){
            page--
            }
            const transaction = await this.$axios.$post("/api/v1/campaigns/transactions/"+this.$route.params.rid+"/reward?campaign_id="+this.$route.params.cid+"&page="+page, {
            limit : this.transaction.data.limit
            })
            this.transaction = transaction
        }else {
            if (action === "next"){
            page++
            }else if (action === "prev"){
            page--
            }
            const transaction = await this.$axios.$post("/api/v1/campaigns/transactions/"+this.$route.params.rid+"/reward?campaign_id="+this.$route.params.cid+"&page="+page, {
            limit : this.transaction.data.limit
             })
            this.transaction = transaction
        }
        
        },
    }
   }
</script>