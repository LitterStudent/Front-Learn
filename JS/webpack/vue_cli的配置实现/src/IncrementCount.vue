<template>
    <button @click="increment()">+</button>
</template>

<script> 
    export default {
        name: "IncrementCount",
        data() {
            return {
                num: 1,
                deg:180
            };
        },
        methods: {
            increment() {
                this.$EventBus.$emit("incremented", {
                    num:this.num,
                    deg:this.deg
                });
            }
        }
    };
 </script>