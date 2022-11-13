<template>
   <div class="grid grid-cols-3 h-screen">
        <div class="col-span-2 m-auto">
            <h1 class="font-bold text-5xl">Akun Baru</h1>
            <h3 class="text-lg mt-3 mb-5">Isikan form dibawah ini dengan data yang valid</h3>
            <div v-if="submitstatus === 'FAIL'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-11/12 mb-3" role="alert">
              <strong class="font-bold">Terjadi Kesalahan!</strong>
              <span class="block sm:inline">Mohon Isi Form Dengan Benar.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for=" ">
                        Nama Lengkap
                      </label>
                      <input v-model="$v.register.name.$model" autocomplete="off" :class="{'w-full h-14 p-5 rounded-lg border-0 bg-gray-white focus:border focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500': $v.register.name.$invalid, 'w-full h-14 p-5 rounded-lg border-0 bg-gray-white focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main' : !$v.register.name.$invalid }" id=" " type="text" placeholder="" value=" ">
                      <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.register.name.required">Nama Tidak Boleh Kosong</p>
                      <p class="text-xs text-red-500" v-if="!$v.register.name.alphabetValidator">Hanya Boleh Menggunakan Huruf</p>
                      </div>
                    </div>
                  </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for=" ">
                        Email
                      </label>
                      <input v-model="$v.register.email.$model" autocomplete="off" :class="{'w-full h-14 p-5 rounded-lg border-0 bg-gray-white focus:border focus:outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500': $v.register.name.$invalid, 'w-full h-14 p-5 rounded-lg border-0 bg-gray-white focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main' : !$v.register.name.$invalid }" id=" " type="email" placeholder="">
                      <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.register.email.required">Email Tidak Boleh Kosong</p>
                        <p class="text-xs text-red-500" v-if="!$v.register.email.email">Input bukan email, email harus mengandung '@' didalamnya</p>
                      </div>
                    </div>
                  </div>
                <div class="flex flex-wrap -mx-3 mb-3">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for=" ">
                        Pekerjaan
                      </label>
                      <input v-model="$v.register.occupation.$model" autocomplete="off" class="w-full h-14 p-5 rounded-lg bg-gray-white border-0 focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main" id=" " type="text" placeholder="">
                      <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.register.occupation.required">Pekerjaan Tidak Boleh Kosong</p>
                        
                      </div>
                    </div>
                  </div>
                <div class="flex flex-wrap -mx-3 mb-3">
                    <div class="w-11/12 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for=" ">
                        Password
                      </label>
                      <input  @keyup.enter="registerUser" autocomplete="off" v-model="$v.register.password.$model" class="w-full h-14 p-5 rounded-lg bg-gray-white border-0 focus:border focus:outline-none focus:border-blue-main focus:bg-white focus:ring-4 focus:ring-blue-main" id=" " type="password" placeholder="">
                    <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.register.password.required">Password Tidak Boleh Kosong</p>
                        <p class="text-xs text-red-500" v-if="!$v.register.password.minLength">Password Tidak Boleh Kurang Dari {{ $v.register.password.$params.minLength.min }} Huruf</p>
                        <p class="text-xs text-red-500" v-if="!$v.register.password.maxLength">Password Tidak Boleh Lebih Dari {{ $v.register.password.$params.maxLength.max }} Huruf</p>
                        
                      </div>
                    </div>
                  </div>
                  <button @click="registerUser" class="button button-lg button-primary mb-3 w-11/12 rounded-lg">Daftar</button><br>
        </div>
        <div class="right-auth bg-cover"></div>
    </div>
</template>

<script>
import {required, minLength, maxLength, helpers, email} from 'vuelidate/lib/validators'
const alphabetValidator = helpers.regex("alphabet",/^[a-zA-Z ]*$/)
export default {
 layout : "auth", 
 middleware : "auth", 
 auth : "guest",
 data () {
   return {
     register : {
       name : '',
       email : "",
       occupation : "",
       password : "",
     },
     submitstatus : null
   }
 },
 validations : {
   register :{
     name:{
       required, 
       alphabetValidator
     }, password : {
       required,
       minLength: minLength(6),
       maxLength: maxLength(14),
     }, 
     email: {
       required, email
     }, 
     occupation : {
       required
     },
     
   }
 },
 methods : {
   async registerUser(){
     this.$v.$touch() 
            if(this.$v.$invalid){
                this.submitstatus = "FAIL"
            }else{
                this.submitstatus = "SUCCESS"
                try{
                  let response = await this.$axios.post('api/v1/users',this.register)
                  console.log(response)
                  this.$router.push({path : "/r-success"})

                }catch (err){
                  console.log(err)
                }
            }
     
   }
 }
}
</script>

<style scoped>
    body {
        margin : 0;
    }
</style>
