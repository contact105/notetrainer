<template>
    <div>
        <span class="logo">🤟</span>
        <h1>Note Trainer</h1>
        <p>
            Because you need to.
        </p>
        <Button @click="$emit('startGame')">Bring it on!</Button>
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
    .logo {
        font-size: 4rem;
    }
</style>
