<template>
    <div class="grid mt-8">
      <notifications group="success"  position="top right"/>
            <h1 class="text-xl font-bold">Sunting Penggalangan Dana</h1>
            <form class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Judul
                    </label>
                    <input v-model="campaign.name" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-first-name" type="text" placeholder="Judul">
                  <p class="text-xs text-red-500" v-if="!$v.campaign.name.required">Judul Tidak Boleh Kosong</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                      Target
                    </label>
                    <input v-model.number="campaign.goal_amount" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-last-name" type="number" placeholder="Rp">
                    <p class="text-xs text-red-500" v-if="!$v.campaign.goal_amount.required">Target Minimal Rp 10.000</p>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.goal_amount.minValue">Target Minimal Rp 10.000</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi Singkat
                    </label>
                    <input v-model="campaign.short_description" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Deskripsi Singkat">
                    <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.short_description.required">Deksripsi Tidak Boleh Kosong</p>
                  </div>
                </div>
                
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Kategori
                    </label>
                    <div class="relative">
                      <select required v-model="campaign.cattegory" class="block appearance-none w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-state">
                        <option v-for="cat in cattegory" :key="cat.ID" :value="cat.Name" :selected="campaign.cattegory === cat.Name" >{{cat.Name}}</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <p class="text-xs text-red-500" v-if="!$v.campaign.cattegory.required">Pilih Salah Satu Kategori</p>
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
                <button type="button" @click="campaignForm()" class="button bg-green-new border-0 p-4 text-white object-right w-full hover:bg-green-new-dark hover:transition hover:duration-700">Selesai</button>
              </form>
        </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
    props : {
        campaign : {},
        cattegory : {}
    },
    data () {
        return {
            content: "",
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
            submitstatus : null,
        }
    },
    validations : {
      content : {
        required
      },
      campaign : {
        name : {required},
        goal_amount : {
          required,
          minValue : minValue(10000)
        },
        short_description : {
          required
        }, 
        cattegory : {
          required
        }, 

      }
    },
    mounted(){
         setTimeout(() => {
            this.content = this.campaign.description
        }, 1000)
    },
    methods : {
    onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
        async campaignForm(){
          this.$v.$touch()
          if(this.$v.$invalid){
            this.submitstatus = "FAIL"
          }else{
            this.submitstatus = "SUCCESS"
            try {
                var response = await this.$axios.$put('/api/v1/campaigns/' + this.$route.params.id, {
                    name : this.campaign.name,
                    short_description : this.campaign.short_description, 
                    description : this.content, 
                    goal_amount : this.campaign.goal_amount,
                    cattegory : this.campaign.cattegory
                  }
                )
                this.$notify({
                          group : "success",
                          title: "Success!",
                          type : "success",
                          text: "Berhasil Mengubah Informasi Penggalangan Dana"
                      });
                  setTimeout(() => {
                      this.$router.push("/Dashboard/project/" + this.$route.params.id)
                  }, 2000)

            } catch (e) {
                console.log(e)
            }
          }
            
      }
    }
}
</script>