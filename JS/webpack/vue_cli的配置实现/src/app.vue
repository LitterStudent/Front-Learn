<template>
 <div class="container" :style="{transform: 'rotateY(' + degValue + 'deg)'}">
            <div class="front">
                <div class="increment">
                    <IncrementCount />
                </div>
                <div class="show-front"> {{fontCount}} </div>
            </div>
            
 </div>
</template>

<script>
import IncrementCount from './IncrementCount.vue'
export default {
    components:{
        IncrementCount
    },
    mounted(){
        this.$EventBus.$on("incremented", ({num,deg}) => {
                this.fontCount += num
                this.$nextTick(()=>{
                    this.backCount += num
                    this.degValue += deg;
                })
            });
    },
    data(){
        return {
            initData:'Vue开发环境运行成功',
            degValue:0,
            fontCount:0,
            backCount:0
        }
    }
}
</script>
<style scoped>
#container {
    color:red;
    display: flex;
}
</style>