<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <notifications group="success"  position="top right"/>
    <div class="grid mt-8">
            <h1 class="text-xl font-bold">Buat Aktivitas Proyek</h1>
            <form class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <!-- Required form plugin -->
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Foto Thumbnail
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
                
                <span class="mt-2 text-base leading-normal">{{fileHolder}}</span>
                <input type="file" @change="SelectFile()" ref="file" class="hidden" accept="image/*"/>
                </label>
                <p class="text-xs text-red-500" v-if="!$v.activity.file.required">Thumbnail Tidak Boleh Kosong</p>
              </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Judul
                    </label>
                    <input v-model="$v.activity.name.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Judul">
                    <p class="text-xs text-red-500" v-if="!$v.activity.name.required">Judul Tidak Boleh Kosong</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Deskripsi Singkat
                    </label>
                    <input v-model="$v.activity.short_description.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Deskripsi Singkat">
                    <p class="text-gray-600 text-xs italic">Buat deskripsi singkat semenarik mungkin</p>
                    <p class="text-xs text-red-500" v-if="!$v.activity.short_description.required">Deskripsi Singkat Tidak Boleh Kosong</p>
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
                            :content="activity.description"
                            v-quill:myQuillEditor="editorOption">
                        </div>
                    </section>
                    <p class="text-xs text-red-500" v-if="!$v.activity.description.required">Deskripsi Tidak Boleh Kosong</p>
                  </div>
                </div>
                <button type="button" @click="createActivity()" class="button bg-green-new border-0 p-4 text-white object-right w-full hover:bg-green-new-dark hover:transition hover:duration-700">Selesai</button>
              </form>
        </div>
  </div>
</template>
<script>
import {required} from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            fileHolder : "Pilih File",
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
            activity : {
                campaign_id : this.$route.params.id,
                name : "", 
                short_description : "", 
                description : "", 
                file : undefined, 
            },
             crumbs : [
            {name: "Akun", path:"/Dashboard"},
            {name: "Dashboard", path:"/Dashboard"},
            {name: "Proyek", path:"/dashboard/project/"+this.$route.params.id},
            {name: "Aktivitas", path:"/Dashboard/project/"+this.$route.params.id+"/activity"},
            {name: "Tambah", path:""}],
            submitstatus : null
        }
    },
    validations : {
      activity : {
        name : {
          required,
        }, 
        short_description : {
          required,
        },
        description : {
          required,
        },
        file : {
          required,
        }
      },
    },
    methods : {
        reset(){
                this.activity.name = "", 
                this.activity.short_description ="", 
                this.activity.description = "", 
                this.activity.file = undefined, 
                this.fileHolder = "Pilih File"
        },
        onEditorChange({editor, html, text}) {
            console.log('editor change!', editor, html, text)
            this.activity.description = html
        },
        SelectFile(){
            this.activity.file = this.$refs.file.files
            this.fileHolder = this.activity.file[0].name
            
        },
         async createActivity(){
            // this.$v.touch()
            if(this.$v.invalid){
              this.submitstatus = "FAIL"
            }else{
              this.submitstatus = "SUCCESS"
              let formData = new FormData()
              formData.append("campaign_id", this.activity.campaign_id)
              formData.append("name", this.activity.name)
              formData.append("short_description", this.activity.short_description)
              formData.append("description", this.activity.description)
              formData.append("file", this.activity.file.item(0))

              try {
                  await this.$axios.$post("/api/v1/campaign/activity", formData, {
                      Headers : {
                          "Content-Type" : "Multipart/form-data"
                      }
                  }).then(response => {
                      console.log(response)
                  })
                  
                  this.reset()

                  this.$notify({
                          group : "success",
                          title: "Success!",
                          type : "success",
                          text: "Berhasil Mengubah Informasi Penggalangan Dana"
                      });
                  setTimeout(() => {
                      this.$router.push("/Dashboard/project/"+this.$route.params.id+"/activity")
                  }, 2000)

              } catch (e) {
                  console.log(e)
              }
            }
        }
    }
}
</script>