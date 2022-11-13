<template>
    <div class="container mx-auto">
        <Navbar/>
        <Breadcrumb :crumbs=crumbs />
        <notifications group="success"  position="top right"/>
        <div class="user grid grid-cols-2 mt-11">
            <div class="profile ">
                <div class="flex flex-col text-center">
                    <div class="relative w-36 h-36 mx-auto">
                        <img v-if="url != ''" :src="url" class="w-36 h-36 rounded-full mx-auto" alt="">
                        <img v-else :src="`${$axios.defaults.baseURL}` + '/' +$store.state.auth.user.image_url" class="w-36 h-36 rounded-full mx-auto" alt="">
                        <font-awesome-icon  @click="$refs.file.click()" class="absolute right-0 bottom-0 pb-2 cursor-pointer hover:text-blue-main" icon="fa-solid fa-image"/>
                         <input type="file" ref="file" style="display: none;" accept="image/*" @change="onFileChange"/>
                    </div>
                    <div class="desc pt-2 flex flex-col">
                        <p class="text-xl overflow-hidden h-7 pt-1 font-bpass1">{{$store.state.auth.user.name}}</p>                       
                        <p class="text-lg">{{$store.state.auth.user.email}}</p>
                        <p class="text-lg">{{$store.state.auth.user.occupation}}</p>
                    </div>
                </div>
            </div>
            <div class="form-user">
                <form action="" class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h1 class="mb-10">Detail Informasi User</h1>
                    <div class="w-full px-3">
                        <label class="block  tracking-wide text-gray-label mb-2" for="grid-last-name">
                        Nama Lengkap
                        </label>
                        <input v-model="$v.user.name.$model" required class="appearance-none block w-full  text-gray-700 rounded py-3 px-4 leading-tight bg-gray-input border border-gray-order focus:outline-none focus:bg-white focus:border-blue-500 " id="grid-last-name" type="text">
                        <div class="pt-3">
                            <p class="text-xs text-red-500" v-if="!$v.user.name.required">Nama Tidak Boleh Kosong</p>
                            <p class="text-xs text-red-500" v-if="!$v.user.name.alphabetValidator">Hanya Boleh Menggunakan Huruf</p>
                        </div>
                    </div>
                    <div class="w-full px-3 mt-7">
                        <label class="block  tracking-wide text-gray-label  mb-2" for="grid-last-name">
                        Pekerjaan
                        </label>
                        <input v-model="$v.user.occupation.$model"  required class="appearance-none block w-full bg-gray-input border border-gray-order text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 " id="grid-last-name" type="text">
                        <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.user.occupation.required">Pekerjaan Tidak Boleh Kosong</p>
                        </div>
                    </div>
                    <div class="w-full px-3">
                        <button type="button" @click="updateInfoUser()" class="button bg-blue-main border-0 p-4 text-white w-1/2 hover:bg-blue-800 hover:transition hover:duration-700">
                            <div v-if="loading === true" class="flex flex-wrap mx-auto justify-center">
                                 <svg class="rounded animate-spin ease duration-300 w-5 h-5 border-2 border-white mr-5" viewBox="0 0 24 24">
                                    <!-- ... -->
                                </svg>
                                Loading...
                            </div>
                            <div v-else >
                               
                                Simpan Perubahan
                            </div>
                        </button>
                    </div>
                </form>
                <form action="" class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h1 class="mb-10">Ubah Password</h1>
                    <div class="grid grid-cols-2">
                        <div class="px-3">
                        <label  class="block  tracking-wide text-gray-label mb-2" for="grid-last-name">
                        Password
                        </label>
                        <input v-model="$v.password.pass1.$model" required class="appearance-none block w-full  text-gray-700 rounded py-3 px-4 leading-tight bg-gray-input border border-gray-order focus:outline-none focus:bg-white focus:border-blue-500 " id="grid-last-name" type="password">
                         <div class="pt-3">
                            <p class="text-xs text-red-500" v-if="!$v.password.pass1.required">Password Tidak Boleh Kosong</p>
                            <p class="text-xs text-red-500" v-if="!$v.password.pass1.minLength">Password Tidak Boleh Kurang Dari {{ $v.password.pass1.$params.minLength.min }} Huruf</p>
                            <p class="text-xs text-red-500" v-if="!$v.password.pass1.maxLength">Password Tidak Boleh Lebih Dari {{ $v.password.pass1.$params.maxLength.max }} Huruf</p>
                        </div>
                    </div>
                    <div class="px-3">
                        <label class="block  tracking-wide text-gray-label mb-2" for="grid-last-name">
                        Ulangi Password
                        </label>
                        <input v-model="$v.password.new.$model" required class="appearance-none block w-full  text-gray-700 rounded py-3 px-4 leading-tight bg-gray-input border border-gray-order focus:outline-none focus:bg-white focus:border-blue-500 " id="grid-last-name" type="password">
                        <div class="pt-3">
                        <p class="text-xs text-red-500" v-if="!$v.password.new.sameAsPassword">Password Tidak Sama</p>
                        </div>
                    </div>
                    </div>
                    <div class="w-full px-3">
                        <button type="button" @click="changePassword()" class="button bg-blue-main border-0 p-4 text-white w-1/2 hover:bg-blue-800 hover:transition hover:duration-700" :disabled="password.pass1 != password.new || password.pass1 === '' && password.new">
                            <div v-if="loading === true" class="flex flex-wrap mx-auto justify-center">
                                 <svg class="rounded animate-spin ease duration-300 w-5 h-5 border-2 border-white mr-5" viewBox="0 0 24 24">
                                    <!-- ... -->
                                </svg>
                                Loading...
                            </div>
                            <div v-else >
                               
                                Simpan Perubahan
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <hr class="mt-16 text-gray">
        <Footer/>
    </div>
</template>
<script>
import {required, minLength, maxLength, helpers, sameAs} from 'vuelidate/lib/validators'
const alphabetValidator = helpers.regex("alphabet",/^[a-zA-Z ]*$/)
export default {
    middleware : "auth",
    data(){
        return {
            loading : false,
            password : {
                pass1 : "", 
                new : ""
            },
            user : {
                name : "", 
                occupation : ""
            },
            selectedFile : undefined,
            url : "",
            crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Sunting", path:""}]
        }
    }, 

    validations:{
        user : {
            name : {
                required, 
                alphabetValidator
            },
            occupation: {
                required,
            }
        },
        password : {
            pass1 :{
                required,
                minLength: minLength(6),
                maxLength: maxLength(14),
            }, new : {
                sameAsPassword : sameAs(function(){return this.password.pass1})
            }
        }
    },
    mounted (){
        this.user.name = this.$store.state.auth.user.name
        this.user.occupation = this.$store.state.auth.user.occupation

    },
    methods : {
        async onFileChange(e){
            const file = e.target.files[0]
            this.url = URL.createObjectURL(file)
            this.selectedFiles = this.$refs.file.files

            let formData = new FormData()
            formData.append('avatar', this.selectedFiles.item(0))
            try {
                let response = await this.$axios.post('/api/v1/avatars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: "Berhasil Mengubah Foto Profil"
            });

             setTimeout(() => {
                    location.reload()
                }, 1000)

            } catch (err) {
                console.log(err)
                this.$notify({
                group : "success",
                title: "error!",
                type : "error",
                text: "Terjadi Kesalahan"
            });
            }
        },
        async updateInfoUser(){
            this.loading = true
            try {
                await this.$axios.$put("/api/v1/users/update", {
                    name : this.user.name,
                    occupation : this.user.occupation
                })
                this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: "Berhasil Mengubah data user"
                });

                setTimeout(() => {
                    location.reload()
                }, 1000)
            } catch (e) {
                // console.log(e)
                if (e.response.status == 400){
                    this.$notify({
                        group : "success",
                        title: "error!",
                        type : "error",
                        text: "Terjadi Kesalahan Input"
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
                
            }
        },

        async changePassword(){
            this.loading = true 

            if (this.password.pass1 != this.password.new){
                this.$notify({
                group : "error",
                title: "error!",
                type : "error",
                text: "Password Tidak Sama"
                });
            }else{
                try {
                    await this.$axios.$put("/api/v1/users/changepass", {
                        password : this.password.pass1
                    })

                    this.$notify({
                    group : "success",
                    title: "Success!",
                    type : "success",
                    text: "Berhasil Mengubah Password"
                    });

                    setTimeout(() => {
                        location.reload()
                    }, 1000)

                } catch (e) {
                    this.$notify({
                    group : "success",
                    title: "error!",
                    type : "error",
                    text: "Terjadi Kesalahan"
                });
                }
            }

            
        }
    }
}
</script>