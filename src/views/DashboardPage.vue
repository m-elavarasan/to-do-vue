<template>
  <HeaderComp />
  <DragListComp/>
</template>

<script>
import HeaderComp from '@/components/HeaderComp.vue'
import DragListComp from '@/components/ListComp.vue';
export default {
  components: {
    HeaderComp,
    DragListComp
  },
  data(){
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.p-menubar {
  background-color: #f1f1f1;
  border-bottom: 1px solid #ffffff;
}
</style>
