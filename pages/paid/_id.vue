<template>
     <div class="container mx-auto">
        <Navbar/>
        <Breadcrumb :crumbs=crumbs />
        <div class="grid mt-8">
            <div class="form">
                <h1 class="text-center font-bold text-2xl">Formulir Donasi</h1>
                <!-- Progress bar -->
                <div class="progressbar">
                  <div class="progress" id="progress"></div>
                  
                  <div
                    class="progress-step progress-step-active"
                    data-title="Pilihan"
                  ></div>
                  <div class="progress-step" data-title="Donasi"></div>
                  <div class="progress-step" data-title="Invoice"></div>
                  <!-- <div class="progress-step" data-title="Password"></div> -->
                </div>
          
                <!-- Steps -->
                <div class="form-step form-step-active">
                  <div v-if="project.data.reward != 0" class="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-700 p-4 mb-4" role="alert">
                      <p class="font-bold">Peringatan</p>
                      <p><span class="font-bold">Kami tidak menjamin hadiah yang ditawarkan!</span>, author akan mengirimkan survei melalui email untuk claim hadiah setelah donasi selesai dilakukan</p>
                    </div>
                  <div class="container radio">
                    <div class="form__item" @click="subamount = 0">
                        <input v-model="donate.reward_id" value="0" name="reward" id="radio-0" type="radio" class="form__input" @change="SetAmount(0)" checked/>
                        <label for="radio-0" class="form__label">
                            <div class="form-data">
                                <span>
                                   Donasi tanpa imbalan
                                </span>
                            </div>
                        </label>
                    </div>
                    <div class="form__item" v-for="(r,index) in project.data.reward" :key="r.id">
                        <input v-model="donate.reward_id" :value="r.id" name="reward" :id="'radio-'+(index+1)" type="radio" class="form__input" @change="SetAmount(r.min_donate)"/>
                        <label :for="'radio-'+(index+1)" class="form__label">
                            <div class="form-data">
                                <span>
                                    <b>Donasi : Rp. {{ Number(r.min_donate).toLocaleString() }}</b>
                                    <br>
                                    <br>
                                    {{ r.description }}
                                  <br>
                                </span>
                                    <p>Dengan memilih pilihan ini, anda akan mendapat : </p>
                                  <ol class="mt-4 list-disc pl-6">
                                    <li v-for="p in r.perks" :key="p.id">{{p}}</li>
                                  </ol>  
                            </div>
                            
                        </label>
                    </div>
                </div>
                <br>
                  <div class="">
                    <a href="#/" class="btn btn-next width-50 ml-auto">Selanjutnya</a>
                  </div>
                </div>
                <!-- step 2 -->
                <div class="form-step">
                    <div class="container form_data">
                            <div class="flex flex-wrap -mx-3 mb-4" v-if="donate.reward_id != 0">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city" disabled>
                                Nominal
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" :value="new Intl.NumberFormat().format(subamount)" disabled>
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                                Bonus (optional)
                              </label>
                              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" placeholder="0" v-model.number="bonus">
                            </div>
                          </div>
                            <div class="w-full  mb-4 md:mb-0" v-else>
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Nominal
                              </label>
                              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="number" min="1" v-model.number="$v.subamount.$model" placeholder="0">
                              <p class="text-xs text-red-500" v-if="!$v.subamount.required">Minimal Donasi Rp 10.0000</p>
                              <p class="text-xs text-red-500" v-if="!$v.subamount.minValue">Minimal Donasi Rp 10.0000</p>
                              <p class="text-xs text-red-500" v-if="!$v.subamount.maxValue">Maximal Donasi Rp 100.0000.000</p>
                            </div>
                    </div>
                    <div class="btns-group mt-6">
                      <a href="#/" class="btn btn-prev">Sebelumnya</a>
                      <a v-show="$v.subamount.minValue && $v.subamount.required && $v.subamount.maxValue" href="#/" class="btn btn-next" @click="CheckTotal()">Selanjutnya</a>
                    </div>
                  </div>
                  <!-- step akhir -->
                  <div class="form-step">
                    <div v-if="donate.reward_id != 0" class="bg-yellow-100 border-l-4 border-yellow-600 text-yellow-700 p-4 mb-4" role="alert">
                      <p class="font-bold">Peringatan</p>
                      <p><span class="font-bold">Kami tidak menjamin hadiah yang ditawarkan!</span>, author akan mengirimkan survei melalui email untuk claim hadiah setelah donasi selesai dilakukan</p>
                    </div>
                    <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-4" role="alert">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p>Konfirmasi Pembayaran akan dikirim melalui email, setelah anda sudah memiilih metode. pastikan data yang dimasukan valid!</p>
                  </div>
                    <div class="container form_data">
                        <div class="mb-4 w-full grid grid-cols-3 gap-4">
                          <div class="mr-4 img">
                            <img :src="`${$axios.defaults.baseURL}` + '/' + project.data.image_url" alt="">
                          </div>
                          <div class="title">
                            <h1 class="text-lg font-bold mb-2">{{project.data.name}}</h1>
                            <p><span class="">oleh</span> {{ project.data.user.name }}</p>
                          </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                              Nama
                            </label>
                            <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" v-model="$store.state.auth.user.name">
                          </div>
                          
                          <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2 uppercase" for="email">
                              Email
                            </label>
                            <input disabled class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="email" placeholder="email" v-model="donate.email">
                            
                          </div>
                            <div class="w-full  mb-4 md:mb-0">  
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Nominal
                              </label>
                              <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="text" placeholder="0" min="" :value="'Rp.' + new Intl.NumberFormat().format(donate.amount)">
                            </div>
                            <!-- <div v-if="donate.reward_id != 0" class="w-full  mt-4 md:mb-0">
                              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                Hadiah
                              </label>
                              <input disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="grid-city" type="text" placeholder="perk1,perk2,perk3">
                            </div> -->
                          
                    </div>
                    <div class="btns-group mt-6">
                      <a href="#/" class="btn btn-prev">Sebelumnya</a>
                      <button @click="CreateTransaction()" type="submit" class="btn btn-finish">Selesai</button>
                    </div>
                  </div>
              </div>
        </div>
        <hr class="mt-16 text-gray">
        <Footer/>
     </div>
</template>
<script>
import {required, minValue, maxValue} from 'vuelidate/lib/validators'
export default {
  middleware : "auth",
  data (){
    return {
      crumbs : [{name: "Beranda", path:"/"},{name: "Proyek", path:"/list"},{name: "Donasi", path:""}],
      bonus : 0,
      subamount : 0,
      donate : {
        reward_id : 0, 
        campaign_id : parseInt(this.$route.params.id) ,  
        amount : 0,
        email : this.$store.state.auth.user.email
      }
    }
  },
  validations : {
    subamount : {
      required,
      minValue : minValue(10000), 
      maxValue : maxValue(100000000),
    }
  },
  methods : {
    async CreateTransaction(){
      try {
        let response = await this.$axios.$post("/api/v1/transactions", this.donate)
        window.location = response.data.payment_url
      } catch (e) {
        console.log(e)
      }
    },
    SetAmount(subamount){
      this.subamount = subamount
    },
    MakeTransaction(){

    }, 
    CheckTotal(){
      this.donate.amount = this.subamount + this.bonus
    }, 
    
  },
    async asyncData({$axios, params}){
      const project = await $axios.$get("/api/v1/campaigns/" + params.id)
      return {project}
    },
    head() {
        return {
            script: [
                {
                    type: 'text/javascript',
                    src: '/js/script.js',
                }
            ]
        }
    },
    beforeMount () {
       if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
    } 
}
</script>

<style scoped src="@/assets/css/multistep.css"></style>

<style scoped>
        form {
            display: flex;
            flex-direction: column;
        }

        .form__item {
            margin-bottom: 10px;
            /* background-color: red; */
        }

        .form__item:last-child {
            margin-bottom: 0;
        }

        .form__input {
            position: absolute;
            left: -9999px;
            width: 1px;
            height: 1px;
            opacity: 0;
            visibility: hidden;
        }

        .form__label{
            display: flex;
            position: relative;
            border: 3px solid gray;
            /* height: 84px; */
            width: 100%;
            border-radius: 10px ;
            cursor: pointer;
            transition: .3s;
            padding: 26px;
            padding-left: 65px;
        }

        .form__label:before {
            content: '';
            position: absolute;
            left: 20px;
            top: 50%;
            width: 15px;
            height:15px;
            border-radius: 50%;
            border : 4px solid gray;
            transition: .3s;
            transform: translateY(-50%);
        }

        .form__label:hover {
            border-color: #5352ED;
        }

        .form__input:checked ~ .form__label {
            border-color: #5352ED;
        }
        .form__input:checked ~ .form__label:before {
            border-color: #5352ED;
        }
</style>