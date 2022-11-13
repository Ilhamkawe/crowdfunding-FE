<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <notifications group="success"  position="bottom left"/>
    <div class="grid mt-8">
            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 info">
                <div class="header-info flex mb-3 justify-between relative">
                    <h1 class="text-xl font-bold p-4">Pengolahan Aktivitas proyek</h1>
                    <a @click="$router.push('/dashboard/project/'+$route.params.id+'/activity/create')" class="text-blue-600 cursor-pointer" >Tambah Activity</a>
                </div>
                <hr width="50%">
                <br>
                <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5" >  
                    <div class="w-full rounded overflow-hidden shadow-lg" v-for="act, index in activity.data" :key="index" >
                        <div class="relative">
                            <img class="w-full" :src="`${$axios.defaults.baseURL}` + '/' + act.image_url" alt="">
                            <font-awesome-icon @click="deleteActivity(act.id)" class="absolute right-0 top-0 text-2xl hover:font-bold cursor-pointer text-red-remove" icon="fa-solid fa-circle-xmark"/>
                        </div>
                        
                        <div class="px-6 py-4">
                            <div class="flex justify-between">
                                <div class="font-bold text-xl mb-2 cursor-pointer" @click="$router.push('/project/activity/'+act.id)">{{act.name}}</div>
                                <a @click="$router.push('/dashboard/project/'+$route.params.id+'/activity/'+act.id+'/edit')" class="text-xl hover:text-blue-main cursor-pointer"><font-awesome-icon icon="fa-solid fa-square-pen" /></a>
                            </div>
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

</template>
 
<script>
export default {
    middleware : 'auth',
    async asyncData({$axios,params}){
        const activity = await $axios.$get("/api/v1/campaign/activity/" + params.id)
        return {
            activity
        }
    },
    data (){
        return{
            crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Dashboard", path:"/Dashboard"},{name: "Proyek", path:"/dashboard/project/"+this.$route.params.id},{name: "Aktivitas", path:""}],
        }
    },
    methods : {
        async load(){
            const activity = await this.$axios.$get("/api/v1/campaign/activity/" + this.$route.params.id)
            this.activity = activity
        },
        async deleteActivity(actid){
             try {
                 await this.$axios.request("/api/v1/campaign/activity", {
                    data : {
                        campaign_id : parseInt(this.$route.params.id),
                        activity_id : parseInt(actid)
                    }, 
                    method : "delete"
                })
                this.load()
                 this.$notify({
                    group : "success",
                    title: "Success!",
                    type : "success",
                    text: "Aktivitas Berhasil Dihapus"
                });
             } catch (e) {
                 console.log(e)
             }
        }
    }
}
</script>
<style scoped>
body{
    margin-left : 6rem;
    margin-right : 6rem;
    margin-top: 3rem;
  }
  
</style>