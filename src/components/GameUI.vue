<template>
    <div class="game-ui">
        <Button/>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    components: {
        Button,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .game-ui {
        margin: 30px;
    }
</style>
