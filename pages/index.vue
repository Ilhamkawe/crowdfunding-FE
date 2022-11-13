<template>
  <div class="container mx-auto">
        <Navbar/>
        <section>
            <div class="container-fluid flex mt-36">
                <div class="container w-3/5 mt-16">
                    <h1 class="text-5xl font-bold leading-snug">Galang Dana Sebagai Solusi Mewujudkan Ide Kreatif .</h1>
                    <h3 class="text-gray text-2xl w-1/2 mt-5 leading-snug">Ayo bantu teman teman kita untuk mewujudkan ide keratifnya bersama</h3>
                    <button class="button button-lg button-primary">Donasi Sekarang</button>
                    <button @click="$router.push('/Dashboard/project/create')" class="button button-lg button-secondary">Galang Dana</button>
                </div>
                <div class="container w-2/5">
                    <img src="/image/intellectual-property.svg" class="transform -rotate-45 animate-bounce w-auto" alt="">
                </div>
            </div>
        </section>
        <section class="container mx-auto pt-24">
            <div class="flex justify-between items-center mb-10">
              <div class="w-auto">
                <h2 class="text-3xl text-gray-900 mb-8">
                  Hanya butuh 3 langkah untuk <br />
                  mewujudkan ide kreatif mu.
                </h2>
              </div>
            </div>
            <div class="flex">
              <div class="w-full px-56 mb-5">
                <img src="/image/line-step.svg" alt="" class="w-full" />
              </div>
            </div>
            <div class="flex justify-between items-center text-center">
              <div class="w-1/3">
                <figure class="flex justify-center items-center">
                  <img src="/step-1-illustration.svg" alt="" class="h-30 mb-8" />
                </figure>
                <div class="step-content">
                  <h3 class="font-medium">Daftar</h3>
                  <p class="font-light">
                    Daftarkan akun mu dan mulai <br />Penggalangan
                  </p>
                </div>
              </div>
              <div class="w-1/3">
                <figure class="flex justify-center items-center -mt-24">
                  <img src="/step-2-illustration.svg" alt="" class="h-30 mb-8" />
                </figure>
                <div class="step-content">
                  <h3 class="font-medium">Buka Proyek</h3>
                  <p class="font-light">
                    Pilih ide kreatif mu, <br />
                   dan mulai penggalangan
                  </p>
                </div>
              </div>
              <div class="w-1/3">
                <figure class="flex justify-center items-center -mt-48">
                  <img src="/step-3-illustration.svg" alt="" class="h-30 mb-8" />
                </figure>
                <div class="step-content">
                  <h3 class="font-medium">Laksanakan</h3>
                  <p class="font-light">
                    Waktunya buat ide kratifmu <br />
                    menjadi nyata
                  </p>
                </div>
              </div>
            </div>
          </section>
        <section class="campaign-cards mt-16">
            <div class="mx-auto">
                <h2 class="text-center text-2xl font-bold">Proyek Sedang Berjalan</h2>
                <hr class="bg-blue-main m-auto h-1 border-0 mt-1" width="10%">
            </div>
            <div class="grid grid-cols-3 gap-4 mt-16  pl-9">
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
                          <p class="font-bold text-blue-main">{{ (campaign.current_amount / campaign.goal_amount) * 100 + '%'}}</p>
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
            <div class="flex items-center justify-center mt-16">
                <button @click="$router.push({name: 'list'})" class="button button-md button-primary">Lihat Selengkapya</button>
            </div>
        </section>
        <hr class="mt-16 text-gray">
        <Footer/>
    </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const campaigns = await $axios.$get('/api/v1/campaigns/L/3')
    return { campaigns }
  }, 
  mounted(){
    console.log(this.$store.state.auth.user)
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
