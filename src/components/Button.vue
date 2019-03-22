<template>
    <div class="btn" @click="$emit('click')">
        <slot>Click</slot>
    </div>
</template>

<script>
export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .btn {
        display: inline-block;
        background-color: MediumVioletRed ;
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: 700;
        padding: 1rem;
        cursor: pointer;
        box-shadow: 0 4px 0 darken(MediumVioletRed , 15%);
        transition: all 35ms;
        margin: 1rem 0.5rem;
        // Temporary
        min-width: 60px;

        &:active {
            //box-shadow: 0 2px 0 darken(MediumVioletRed , 15%);
            //transform: translateY(2px);
            transform: scale(0.90);

            &:hover {
                background-color: MediumVioletRed ;
            }
        }

        &:hover {
            background-color: darken(MediumVioletRed, 5%);
        }
    }

    .btn--answer {
        width: 100px;
    }
</style>
