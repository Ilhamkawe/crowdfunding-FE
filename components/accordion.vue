<template>
    <div class="rounded-md border-gray-white" style="border-width : 1px">
        <div class="font-bold border-b-2  border-gray-white text-blue-main p-4 cursor-pointer" @click="AccordionAction()">
            {{ name }}
        </div>
        <div :class=" isOpen ? 'd-block p-4' : 'hidden p-4'">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        name : ""
    }, 
    data(){
        return {
            isOpen : false
        }
    },
    methods : {
        AccordionAction(){
            this.isOpen = !this.isOpen
        }
    }
}
</script>