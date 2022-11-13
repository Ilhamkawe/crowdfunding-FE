<template>
  <div class="container mx-auto">
    <Navbar/>
    <Breadcrumb :crumbs=crumbs />
    <notifications group="success"  position="top right"/>
    <button class="button bg-green-new border-0 p-4 text-white object-right " @click="$router.push('/Dashboard/project/'+$route.params.id+'/activity')" v-if="project.data.status == 'Berjalan' || project.data.status == 'Dicairkan'"><font-awesome-icon icon="fa-solid fa-newspaper" /> Kelola Activity</button>
    <div class="grid grid-cols-1 gap-8 mt-4 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                <span class="inline-block text-blue-500 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">{{project.data.backer_count}}</h1>

                <p class="text-gray-500 dark:text-gray-300">
                    Donatur
                </p>

                <!-- <a href="#" class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a> -->
            </div>
            
            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="">
                    <!-- Uploaded to SVGRepo https://www.svgrepo.com -->
                    <title>ic_fluent_broad_activity_feed_24_regular</title>
                    <desc>Created with Sketch.</desc>
                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" class="text-blue-500">
                        <g id="ic_fluent_broad_activity_feed_24_regular" fill="currentColor" fill-rule="nonzero">
                            <path d="M9.25498499,14.0045412 C10.2214833,14.0045412 11.004985,14.7880429 11.004985,15.7545412 L11.004985,19.2534515 C11.004985,20.2199498 10.2214833,21.0034515 9.25498499,21.0034515 L3.75,21.0034515 C2.78350169,21.0034515 2,20.2199498 2,19.2534515 L2,15.7545412 C2,14.7880429 2.78350169,14.0045412 3.75,14.0045412 L9.25498499,14.0045412 Z M20.25,14.0045412 C21.2164983,14.0045412 22,14.7880429 22,15.7545412 L22,19.2534515 C22,20.2199498 21.2164983,21.0034515 20.25,21.0034515 L14.745015,21.0034515 C13.7785167,21.0034515 12.995015,20.2199498 12.995015,19.2534515 L12.995015,15.7545412 C12.995015,14.7880429 13.7785167,14.0045412 14.745015,14.0045412 L20.25,14.0045412 Z M9.25498499,15.5045412 L3.75,15.5045412 C3.61192881,15.5045412 3.5,15.61647 3.5,15.7545412 L3.5,19.2534515 C3.5,19.3915227 3.61192881,19.5034515 3.75,19.5034515 L9.25498499,19.5034515 C9.39305617,19.5034515 9.50498499,19.3915227 9.50498499,19.2534515 L9.50498499,15.7545412 C9.50498499,15.61647 9.39305617,15.5045412 9.25498499,15.5045412 Z M20.25,15.5045412 L14.745015,15.5045412 C14.6069438,15.5045412 14.495015,15.61647 14.495015,15.7545412 L14.495015,19.2534515 C14.495015,19.3915227 14.6069438,19.5034515 14.745015,19.5034515 L20.25,19.5034515 C20.3880712,19.5034515 20.5,19.3915227 20.5,19.2534515 L20.5,15.7545412 C20.5,15.61647 20.3880712,15.5045412 20.25,15.5045412 Z M20.25,3 C21.2164983,3 22,3.78350169 22,4.75 L22,10.25 C22,11.2164983 21.2164983,12 20.25,12 L3.75,12 C2.78350169,12 2,11.2164983 2,10.25 L2,4.75 C2,3.8318266 2.70711027,3.07880766 3.60647279,3.0058012 L3.75,3 L20.25,3 Z M20.25,4.5 L3.75,4.5 L3.69267729,4.50660268 C3.58223341,4.53251318 3.5,4.63165327 3.5,4.75 L3.5,10.25 C3.5,10.3880712 3.61192881,10.5 3.75,10.5 L20.25,10.5 C20.3880712,10.5 20.5,10.3880712 20.5,10.25 L20.5,4.75 C20.5,4.61192881 20.3880712,4.5 20.25,4.5 Z" id="🎨Color"></path>
                        </g>
                    </g>
                </svg>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">{{project.data.reward.length}}</h1>

                <p class="text-gray-500 dark:text-gray-300">
                    Hadiah
                </p>

                <!-- <a href="#" class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a> -->
            </div>
            <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                    <span class="inline-block text-blue-500 dark:text-blue-400">
                        <svg version="1.1" fill="currentColor" class="w-8 h-8" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="76.991px" height="76.992px" viewBox="0 0 76.991 76.992" style="enable-background:new 0 0 76.991 76.992;"
                        xml:space="preserve">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path d="M46.387,75.839h-5.812c-0.639,0-1.24-0.248-1.692-0.697c-0.458-0.463-0.707-1.063-0.707-1.701l0.016-51.524
                                        c0-0.64,0.25-1.243,0.703-1.696c0.456-0.454,1.058-0.702,1.696-0.702l5.604,0.008c1.32,0.005,2.394,1.079,2.396,2.394v0.048
                                        c2.803-2.202,6.19-3.28,10.262-3.28c10.512,0,18.14,8.825,18.14,20.983c0,15.145-9.986,22.042-19.265,22.042
                                        c-3.352,0-6.428-0.868-8.94-2.491v14.219C48.786,74.763,47.71,75.839,46.387,75.839z M41.176,72.839h4.61V56.038
                                        c0-0.615,0.375-1.167,0.946-1.396c0.572-0.227,1.225-0.082,1.646,0.367c2.247,2.387,5.566,3.702,9.349,3.702
                                        c7.834,0,16.265-5.959,16.265-19.042c0-10.42-6.367-17.983-15.14-17.983c-4.492,0-7.957,1.571-10.588,4.803
                                        c-0.398,0.492-1.063,0.68-1.664,0.467c-0.597-0.211-0.998-0.775-1-1.409l-0.008-3.023l-4.4-0.006L41.176,72.839z M57.816,54.72
                                        c-6.789,0-12.313-6.51-12.313-14.51s5.524-14.509,12.313-14.509c6.791,0,12.316,6.509,12.316,14.509S64.607,54.72,57.816,54.72z
                                        M57.816,28.702c-5.135,0-9.313,5.163-9.313,11.509s4.179,11.51,9.313,11.51c5.138,0,9.316-5.164,9.316-11.51
                                        S62.954,28.702,57.816,28.702z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M34.844,56.259H28.25c-1.124,0-2.137-0.709-2.52-1.768l-7.107-19.626h-6.889v18.713c0,1.478-1.202,2.681-2.68,2.681
                                        H2.681C1.203,56.259,0,55.056,0,53.579V3.873c0-1.475,1.199-2.677,2.673-2.681l12.233-0.04c7.523,0,12.485,1.457,16.095,4.722
                                        c3.068,2.707,4.765,6.748,4.765,11.365c0,6.011-1.837,10.229-6.297,14.32l7.885,21.082c0.305,0.825,0.19,1.744-0.305,2.461
                                        C36.543,55.829,35.72,56.259,34.844,56.259z M28.474,53.259h5.909l-8.084-21.615c-0.221-0.59-0.049-1.254,0.429-1.665
                                        c4.402-3.772,6.039-7.226,6.039-12.741c0-3.744-1.336-6.986-3.764-9.128c-3.031-2.742-7.373-3.959-14.091-3.959L3.001,4.19
                                        v49.069h5.733V33.366c0-0.829,0.671-1.5,1.5-1.5h9.441c0.631,0,1.195,0.396,1.41,0.989L28.474,53.259z M15.575,27.669h-5.341
                                        c-0.829,0-1.5-0.671-1.5-1.5V9.927c0-0.828,0.67-1.499,1.498-1.5l5.117-0.006c0.004-0.001,0.012,0,0.019,0
                                        c9.64,0.107,11.664,5.253,11.664,9.552C27.031,23.772,22.427,27.669,15.575,27.669z M11.734,24.669h3.841
                                        c5.216,0,8.456-2.566,8.456-6.697c0-2.77-0.9-6.462-8.688-6.552l-3.609,0.004V24.669z"/>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    </svg>
                </span>

                <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Rp. {{ new Intl.NumberFormat().format(project.data.current_amount) }}</h1>

                <p class="text-gray-500 dark:text-gray-300">
                    Nominal
                </p>

                <a v-if="project.data.collectable == true && collect.data.length == 0" @click="$router.push('/dashboard/project/'+ $route.params.id +'/collect')" class="inline-flex cursor-pointer p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    Cairkan Dana
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
                <a v-if="project.data.collectable == true && collect.data.length > 0 && collect.data[0].Status == 'Pending'"  class="inline-flex cursor-pointer p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    Pencairan Dana Sedang Di proses 
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> -->
                </a>
                <a v-if="project.data.collectable == true && collect.data.length > 0 && collect.data[0].Status == 'Sukses'"  class="inline-flex cursor-pointer p-2 text-blue-500 capitalize transition-colors duration-200 transform bg-blue-100 rounded-full dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                    Dana Sudah Dicairkan
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> -->
                </a>
            </div>
    </div>
    <div class="grid mt-8">
            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 gallery" v-if="project.data.status == 'Berjalan' || project.data.status == 'Dicairkan'">
                <div class="header-gallery justify-between flex">
                    <h1 class="text-xl font-bold mb-3">Pengolahan Galeri</h1>
                    <div class="form-group justify-start mb-2">
                        <input type="file" @change="SelectFile()" ref="file" >
                        <button @click="upload()" class="button bg-green-new border-0 p-2 text-white object-right hover:bg-green-new-dark hover:transition hover:duration-700">Upload</button>
                    </div>
                </div>
                <div class="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
                <div class="w-full rounded relative cursor-pointer group bg-white" v-for="image, index in project.data.images" :key="index">
                    <img :src="$axios.defaults.baseURL + '/' + image.image_url"
                        alt="image">
                    <div class="opacity-0 h-full group-hover:opacity-60 duration-300 absolute left-0 bottom-0 right-0 z-10 flex justify-center items-end text-xl bg-blue-main text-white font-semibold">
                        <button class="mb-2" @click="DeleteImage(image.id)" ><font-awesome-icon icon="fa-solid fa-trash-can"/></button>
                    </div>
                </div>
            </div>
            </div>
            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 info">
                <div class="header-info flex mb-3 justify-between">
                    <h1 class="text-xl font-bold ">Pengolahan Informasi</h1>
                    <a class="text-blue-600 cursor-pointer" @click="$router.push('/Dashboard/project/'+$route.params.id+'/edit')">Edit</a>
                </div>
                <hr width="50%">
                <br>
                <h1 class="text-lg font-bold mb-3">Deskripsi Singkat</h1>
                {{ project.data.short_description }}
                <hr width="50%">
                <br>
                <h1 class="text-lg font-bold mb-3">Deskripsi</h1>
                <div class="desc-html-render" v-html="project.data.description">
                {{ project.data.description }}
                </div>
                <hr width="50%">
                <br>
                <h1 class="text-lg font-bold mb-3">Target</h1>
                <h1 class="text-lg mb-3">Rp. {{ new Intl.NumberFormat().format(project.data.goal_amount) }}</h1>

            </div>
            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 reward" v-if="project.data.status == 'Berjalan' || project.data.status == 'Dicairkan'">
                <h1 class="text-xl font-bold mb-3">Pengolahan Hadiah</h1>
                
                    <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      Deskripsi Singkat
                    </label>
                    <input v-model="$v.reward.description.$model" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-first-name" type="text" placeholder="Deskripsi Singkat">
                    <p class="text-xs text-red-500" v-if="!$v.reward.description.required">Deskripsi Singkat Tidak Boleh Kosong</p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                      Minimal Donasi
                    </label>
                    <input  v-model.number="$v.reward.min_donate.$model" class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-last-name" type="number" placeholder="Rp">
                    <p class="text-xs text-red-500" v-if="!$v.reward.min_donate.required ">Tidak Boleh Kosong</p>
                    <p class="text-xs text-red-500" v-if="!$v.reward.min_donate.minValue ">Tidak Boleh Kurang Dari Rp 10.000</p>
                    <p class="text-xs text-red-500" v-if="!$v.reward.min_donate.maxValue ">Tidak Boleh lebih Dari Rp {{new Intl.NumberFormat().format(project.data.goal_amount)}}</p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                  <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                      Hadiah
                    </label>
                    <input  v-model="reward.perks" required class="appearance-none block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight bg-gray-input border-gray-order focus:outline-none focus:bg-white focus:border-blue-500" id="grid-password" type="text" placeholder="Hadiah1,Hadiah2">
                    <p class="text-gray-600 text-xs italic">Gunakan koma ',' untuk tanda pemisah. ex : hadiah1,hadiah2,hadiah3</p>
                    <p class="text-xs text-red-500" v-if="!$v.reward.perks.required">Hadiah Tidak Boleh Kosong</p>
                  </div>
                </div>
                <button @click="createReward()" class="button bg-green-new border-0 p-4 text-white object-right hover:bg-green-new-dark hover:transition hover:duration-700">tambah</button>
                
                <!-- data reward -->
               <div class="flex flex-col mt-3">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-black-20 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Deskripsi
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Minimal Donasi
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Hadiah
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Aksi</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(r, index) in project.data.reward" :key="r.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ index + 1 }}                                
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ r.description }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Rp. {{ new Intl.NumberFormat().format(r.min_donate) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <ul class="list-disc">
                                    <li v-for="p in r.perks" :key="p.id">{{p}}</li>
                                </ul>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="DeleteReward(r.id)" class="text-indigo-600 hover:text-indigo-900">Hapus</button>
                            </td>
                            </tr>

                            <!-- More people... -->
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 attachment" v-if="project.data.status != 'Berjalan' && project.data.status != 'Dicairkan'">
                <h1 class="text-xl font-bold mb-3">Lampiran</h1>
                <form action="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" v-if="project.data.attachment==' '">
                    <div class="flex flex-wrap -mx-3 mb-6">
                    <!-- Required form plugin -->
                        <label
                        style="width:90%"
                        class="
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
                        <input type="file" @change="SelectFile()" ref="file" class="hidden" required />
                        </label>
                        <label
                        @click="UploadAttachment()"
                        style="width:8%"
                        class="
                            ml-1
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
                            hover:bg-green-new hover:text-white
                            text-green-new
                            ease-linear
                            transition-all
                            duration-150
                        "
                        >
                        <i class="fas fa-cloud-upload-alt fa-3x"></i>
                        <span class="mt-2 text-base leading-normal"><font-awesome-icon icon="fa-solid fa-square-check" /></span>
                        </label>
                        <p class="text-gray-600 text-xs italic mt-2">Lampiran bisa berupa proposal dan juga KTM (wajib)</p>
                    </div>
                </form>
                <form action="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" v-else>
                    <div class="flex flex-wrap -mx-3 mb-6">
                    <!-- Required form plugin -->
                        <label
                        @click="DownloadAttachment()"
                        style="width:90%"
                        class="
                            
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
                        <span class="mt-2 text-base leading-normal"><font-awesome-icon icon="fa-solid fa-file-arrow-down" /> {{project.data.attachment.split("/")[1]}}</span>
                        </label>
                        <label
                        @click="DeleteAttachment()"
                        style="width:8%"
                        class="
                            ml-1
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
                            hover:bg-red-remove hover:text-white
                            text-red-remove
                            ease-linear
                            transition-all
                            duration-150
                        "
                        >
                        <i class="fas fa-cloud-upload-alt fa-3x"></i>
                        <span class="mt-2 text-base leading-normal"><font-awesome-icon icon="fa-solid fa-square-xmark" /></span>
                        </label>
                        <p class="text-gray-600 text-xs italic mt-2">Lampiran bisa berupa proposal dan juga KTM (wajib)</p>
                    </div>
                </form>
            </div>

            <div class="w-full bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 info" v-if="project.data.status == 'Berjalan' || project.data.status == 'Dicairkan'">
               <div class="header-info flex mb-3 justify-between">
                    <h1 class="text-xl font-bold ">Transaksi Masuk</h1>
                    <a v-if="project.data.reward.length > 0" class="text-blue-600 cursor-pointer" @click="$router.push('/dashboard/project/trx/'+project.data.id+'/'+project.data.reward[0].id)">Detil</a>
                </div>
                <hr width="50%">
                <br>
                <h1 class="text-lg font-bold mb-3">Terkumpul</h1>
                <h1 class="text-lg mb-3 text-blue-main font-bold">Rp. {{ new Intl.NumberFormat().format(project.data.current_amount) }}</h1>
                
                <hr width="50%">
                <div class="flex mt-5" v-for="trx, index in transaction.data" :key="index">
                    <img :src="`${$axios.defaults.baseURL}` + '/' + trx.User.AvatarFileName" class="w-36 h-36 rounded-full  mr-3" alt="">
                      <div class="desc w-full pt-2 flex flex-col">
                         <div class="flex justify-between">
                              <p class="text-xl overflow-hidden h-7 pt-1 font-bold">{{trx.User.Name}}</p>
                              <a @click="$router.push('Dashboard/user/edit')" class="text-xl text-blue-main cursor-pointer font-bold">Rp. {{new Intl.NumberFormat().format(trx.amount)}}</a>
                         </div>
                          <p class="text-lg">{{ trx.User.Email }}</p>
                          <p class="text-lg">{{ trx.User.Occupation }}</p>
                      </div>
                </div>
                

            </div>
        </div>
  </div>

</template>
 
<script>
import {required, minValue, maxValue} from 'vuelidate/lib/validators'
export default {
    middleware : 'auth',
     data (){
        return{
            fileHolder : "Pilih File Lampiran",
            crumbs : [{name: "Akun", path:"/Dashboard"},{name: "Dashboard", path:"/Dashboard"},{name: "Proyek", path:"/dashboard/project/"+this.$route.params.id},{name: "Detail", path:""}],
            reward : {
                campaign_id : parseInt(this.$route.params.id), 
                description : "", 
                perks : "", 
                min_donate : 0
            },
            file : undefined,
            submitstatus : null,
            goal : 0,
        }
    },
    validations : {
        reward : {
            description : {
                required
            }, 
            perks : {
                required
            }, 
            min_donate : {
                required, 
                minValue : minValue(10000)
            },
            max_donate : {
                required, 
                minValue : maxValue()
            }
        }
    },
    async asyncData ({$axios, params}){
        const project = await $axios.$get("/api/v1/campaign/" + params.id + "/user")
        this.goal = project.data.goal_amount;
        if (project.data.status == "Berjalan" || project.data.status == "Dicairkan") {
            const transaction = await $axios.$get("/api/v1/campaigns/"+params.id+"/transactions")
            const collect = await $axios.$get("/api/v1/collect/"+params.id)
            return { project, transaction, collect }
        }
        return { project }
    },
    methods : {
        ShowNotif(message){
            this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: message
            });
        },
        async load(){
            const project = await this.$axios.$get("/api/v1/campaign/" + this.$route.params.id +"/user")
            this.project = project
        },
        SelectFile(){
            this.file = this.$refs.file.files
            this.fileHolder = this.file[0].name
        },
        async UploadAttachment(){
            let formData = new FormData()
            formData.append("campaign_id", parseInt(this.$route.params.id))
            formData.append("action", "upload")
            formData.append("attachment", this.file.item(0))
            try {
                await this.$axios.$put("/api/v1/campaigns/attachment", formData, {
                    headers : {
                        "Content-Type" : "Multipart/form-data"
                    }
                })
                this.load()
                alert("Berhasil Upload Lampiran")
            } catch (e) {
                console.log(e)
            }
        },
        async DownloadAttachment(){
            // console.log( this.$axios.defaults.baseURL + "/"+this.project.data.attachment)
            window.location.href = this.$axios.defaults.baseURL + "/"+this.project.data.attachment;
        },
        async DeleteAttachment(){
            let formData = new FormData()
            formData.append("campaign_id", parseInt(this.$route.params.id))
            formData.append("action", "delete")
            try {
                await this.$axios.$put("/api/v1/campaigns/attachment", formData)
                this.load()
                alert("Berhasil Menghapus Lampiran")
            } catch (e) {
                console.log(e)
            }
        },
        async upload(){
            let formData = new FormData()

            formData.append("is_primary", true)
            formData.append("campaign_id", parseInt(this.$route.params.id))
            formData.append("file", this.file.item(0))

            try {
                await this.$axios.$post("/api/v1/campaign-image", formData, {
                    headers : {
                        "Content-Type" : "Multipart/form-data"
                    }
                })
                this.load()
                this.file = undefined
                 this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: "Berhasil Menambahkan Gambar Gambar"
            });
            } catch (e) {
                console.log(e)
            }
        },
        async DeleteImage(imageID){
           try {
                await this.$axios.request("/api/v1/campaign-image", {
                    data : {
                        campaign_id : parseInt(this.$route.params.id),
                        image_id : parseInt(imageID)
                    }, 
                    method : "delete"
                })

                this.load()
                this.$notify({
                group : "success",
                title: "Success!",
                type : "success",
                text: "Berhasil Menghapus Gambar"
            });
           } catch (e) {
               console.log(e)
           }
        },
        async createReward(){
            this.$v.$touch()
            if(this.$v.invalid){
                this.submitstatus = "FAIL"
            }else{
                try {
                    this.submitstatus = "SUCCESS"
                    let response = await this.$axios.$post("/api/v1/campaign-reward", this.reward)
                    this.load()
                    this.$notify({
                    group : "success",
                    title: "success!",
                    type : "success",
                    text: "Berhasil Menambah Reward"
                });
                
                }catch(e){
                    console.log(e)
                }
            }
        },
        async DeleteReward(rewardID){
            try {
                let response = await this.$axios.$post("/api/v1/campaign-reward/delete", {
                campaign_id : parseInt(this.$route.params.id),
                reward_id : parseInt(rewardID)
            })

            this.load()
            }catch(e){
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