<template>
   <div class="grid grid-cols-3 h-screen">
        <div class="col-span-2 m-auto">
            <h1 class="font-bold text-5xl">Selamat Datang</h1>
            <h3 class="text-lg mt-3 mb-5">Masukan Email and Password untuk masuk ke akun anda .</h3>
                <div v-if="submitstatus === 'LoginFail'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-11/12 mb-3" role="alert">
                  <span class="block sm:inline">Email Atau Password Salah</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <!-- <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg> -->
                  </span>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Email
                      </label>
                      <input v-model="login.email" class="w-full h-14 p-5 rounded-lg bg-gray-white focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main" id="grid-password" type="email" placeholder="">
                      <div v-if="submitstatus == 'FAIL'">
                        <p class="text-xs text-red-500" v-if="!$v.login.email.required">Email TIdak Boleh Kosong</p>

                      </div>
                    </div>
                  </div>
                <div class="flex flex-wrap -mx-3 mb-3">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                      </label>
                      <input @keyup.enter="userLogin" v-model="login.password" class="w-full h-14 p-5 rounded-lg bg-gray-white focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main" id="grid-password" type="password" placeholder="">
                      <div v-if="submitstatus == 'FAIL'">
                          <p class="text-xs text-red-500" v-if="!$v.login.password.required">Password TIdak Boleh Kosong</p>
                        </div>
                    </div>
                  </div>
                  <button @click.prevent="userLogin" class="button button-lg button-primary mb-3 w-11/12 rounded-lg">Masuk</button><br>
                  <span >Belum punya akun? <nuxt-link to="/register" class="text-blue-main">Daftar Sekarang</nuxt-link></span>
            
        </div>
        <div class="right-auth bg-cover"></div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
export default {  
 layout : "auth",
 middleware : "auth", 
 auth : "guest",
 data () {
   return {
     submitstatus : null,
    login : {
       email : "", 
       password : ""
    }, 
   }
 }, 
 validations : {
   login : {
     email : {
       required
     },
     password : {
       required
     }
   }
 },
 methods : {
   async userLogin(){
     this.$v.$touch()
     if(this.$v.$invalid){
       this.submitstatus = "FAIL"
     }else{
       this.submitstatus = "SUCCESS"
        try{
          let response = await this.$auth.loginWith('local', {data : this.login})
            this.$auth.setUser(response.data.data)
        }catch (err){
          if (err.response.status == 400) {
            this.submitstatus = "LoginFail"
          }
        }
     }
     
   }
 }
}
</script>
