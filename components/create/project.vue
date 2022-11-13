<template>
    <div class="grid mt-8">
      <notifications group="success"  position="top right"/>
            <h1 class="text-xl font-bold">Pengajuan Penggalangan Dana</h1>
            <form class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                 <div v-if="submitstatus === 'FAIL'" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mb-3" role="alert">
                  <strong class="font-bold">Terjadi Kesalahan!</strong>
                  <span class="block sm:inline">Mohon Isi Form Dengan Benar.</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Judul
                    </label>
                    <input v-model="$v.campaign.name.$model" class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-first-name" type="text" placeholder="Judul" required>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.name.required">Judul Tidak Boleh Kosong</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                      Target
                    </label>
                    <input v-model.number="$v.campaign.goal_amount.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-last-name" type="number" placeholder="Rp">
                    <p class="text-xs text-red-500" v-if="!$v.campaign.goal_amount.required">Target Minimal Rp 10.000</p>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.goal_amount.minValue">Target Minimal Rp 10.000</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Tanggal Selesai
                    </label>
                    <input v-model="$v.campaign.finish_at.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="date" placeholder="Deskripsi Singkat"  :min="new Date().toISOString().slice(0, 10)">
                    <p class="text-xs text-red-500" v-if="!$v.campaign.finish_at.required">Tanggal Tidak Boleh Kosong</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi Singkat
                    </label>
                    <input v-model="$v.campaign.short_description.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Deskripsi Singkat">
                    <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.short_description.required">Deskripsi Singkat Tidak Boleh Kosong</p>
                  </div>
                </div>
                
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Kategori
                    </label>
                    <div class="relative">
                      <select  v-model="$v.campaign.cattegory.$model" required class="block-appearance block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-state">
                        <option value="" checked disabled>Pilih Cattegory</option>
                        <option v-for="cat in cattegory" :key="cat.ID" :value="cat.Name">{{cat.Name}}</option>
                      </select>
                      
                    </div>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.cattegory.required">Pilih Salah Satu kategori</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi
                    </label>
                     <section class="container">
                        <div class="quill-editor" 
                            @change="onEditorChange($event)"
                            :content="content"
                            v-quill:myQuillEditor="editorOption">
                        </div>
                    </section>
                    <p class="text-xs text-red-500" v-if="!$v.content.required">Deskripsi Tidak Boleh Kosong</p>
                  </div>
                </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                  <!-- Required form plugin -->
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Lampiran
                    </label>
                <label
                class="
                    w-full
                    flex flex-col
                    items-center
                    px-4
                    py-6
                    bg-white
                    rounded-md
                    shadow-md
                    tracking-wide
                    uppercase
                    border border-blue
                    cursor-pointer
                    hover:bg-blue-main hover:text-white
                    text-purple-600
                    ease-linear
                    transition-all
                    duration-150
                "
                >
                <i class="fas fa-cloud-upload-alt fa-3x"></i>
                <span class="mt-2 text-base leading-normal">{{fileholder}}</span>
                <input type="file" @change="SelectFile()" ref="file" class="hidden" accept="application/pdf" required/>
                 <p class="text-xs text-red-500" v-if="!$v.campaign.file.required">File Lampiran Tidak Boleh Kosong</p>
                </label>
                <p class="text-gray-600 text-xs italic mt-2">Lampiran bisa berupa proposal dahilampirkan KTM & KTP(wajib), Template Proposal Dapat Didapatkan<a class="text-blue-700" :href="$axios.defaults.baseURL + '/proposal/Template-Proposal.docx'"> DISINI</a></p>
              </div>
                <button type="button" @click="campaignForm()" class="button bg-green-new border-0 p-4 text-white object-right w-full hover:bg-green-new-dark hover:transition hover:duration-700">Ajukan</button>
              </form>
        </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  props : {
    cattegory : {}
  },
    data () {
        return {
            content: "",
            fileholder : "Pilih File",
            editorOption: {
            // some quill options
                modules: {
                    toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ]
                }
            }, 
            campaign : {
              name : "", 
              short_description : "", 
              goal_amount : null,
              cattegory : "", 
              file : undefined,
              finish_at : ""
            },
            submitstatus : null
        }
    }, 
    validations : {
      content : {
        required,
      },
      campaign : {
        name: {
          required,
        }, 
        short_description : {
          required
        },
        goal_amount : {
          required, 
          minValue : minValue(10000)
        }, 
        cattegory : {
          required
        }, 
        file : {
          required
        },
        finish_at : {
          required
        }
      }
    },
    methods : {
      reset(){
        this.campaign.name = ""
        this.campaign.short_description = ""
        this.campaign.goal_amount = ""
        this.campaign.file =  undefined
        this.fileholder = "Pilih File"
        this.finish_at = ""
      },
      onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      SelectFile(){
        this.campaign.file = this.$refs.file.files
        this.fileholder = this.campaign.file[0].name
      },
      async campaignForm(){
        this.$v.$touch()
         if(this.$v.$invalid){
                this.submitstatus = "FAIL"
            }else{
                this.submitstatus = "SUCCESS"
                  let formData = new FormData()
                  formData.append('name', this.campaign.name)
                  formData.append('description', this.content)
                  formData.append('short_description', this.campaign.short_description)
                  formData.append('goal_amount', this.campaign.goal_amount)
                  formData.append('cattegory', this.campaign.cattegory)
                  formData.append('attachment', this.campaign.file.item(0))
                  formData.append('finish_at', this.campaign.finish_at+" 00:00:00")

                  try {
                    this.$axios.$post("/api/v1/campaigns", formData,{
                      headers : {
                        "Content-Type" : "Multipart/form-data"
                      }
                    })
                  this.reset()
                  this.$notify({
                          group : "success",
                          title: "Success!",
                          type : "success",
                          text: "Berhasil Mengajukan Penggalngan Dana"
                      });

                  setTimeout(() => {
                      location.reload()
                  }, 2000)
                  } catch (e) {
                    console.log(e) 
                  }
            }
      
      }
    }
}
</script>