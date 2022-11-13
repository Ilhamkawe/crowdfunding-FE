<template>
    <nav class="flex bg-blue-50 text-blue-700 border border-blue-200 py-3 px-5 rounded-lg mt-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li v-for="crumb, index in crumbs" :key="index" class="inline-flex items-center">
                    <div v-if="index != crumbs.length - 1" class="flex items-center">
                        <nuxt-link :to="crumb.path" class="text-blue-700 hover:text-blue-900 inline-flex items-center">
                        <svg v-if="index === 0" class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        <svg v-else class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>   
                            {{crumb.name}}
                        </nuxt-link>
                    </div>
                    <div v-else class="flex items-center">
                        <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span class="text-blue-400 ml-1 md:ml-2 text-sm font-medium">{{crumb.name}}</span>
                    </div>
                </li>
            </ol>
        </nav>
</template>

<script>
export default {
    props : {
        crumbs : {
            type : Array, 
            required : true
        }
    }, 
    methods : {
        
    }
}
</script>