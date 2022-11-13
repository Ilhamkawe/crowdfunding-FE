<template>
  <div class="container mx-auto">
        <Navbar/>
        <div class="campaign-activity mt-16 h-full">
            <div class="activity-header text-center">
              <h1 class="font-bold text-4xl mb-8">{{ activity.data.name }}</h1>
              <p class="text-xl"># {{activity.data.campaign}}</p>
            </div>
            <div class="image w-full mt-16">
              <img class="w-full" style="height: 500px" :src="`${$axios.defaults.baseURL}` + '/' + activity.data.image_url" alt="">
            </div>
            <div class="description-activity mt-16" v-html="activity.data.description">
              
            </div>
        </div>
        <hr class="mt-16 text-gray">
        <Footer/>
    </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  async asyncData({$axios, params}){
    let activity = await $axios.$get("/api/v1/campaign/activity/find/"+params.id)
    return {activity}
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
