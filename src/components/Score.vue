<template>
    <div>
        <h1>
            Your score is {{ score }} out of {{ maxQuestions }}
        </h1>
        <p>
            Which means:
        </p>
        <div v-if="youreAwesome">
            <h2>You are awesome</h2>
            <p>
                You know your shit!
            </p>
        </div>
        <div v-else-if="youreGood">
            <h2>You are pretty good</h2>
            <p>
                Now keep going!
            </p>
        </div>
        <div v-else-if="youreAverage">
            <h2>You're average Joe</h2>
            <p>
                Keep on practising. Nobody wants to be average.
            </p>
        </div>
        <div v-else-if="youreBelowPar">
            <h2>You're pretty bad</h2>
            <p>
                Keep on practising. You might get better.
            </p>
        </div>
        <div v-else-if="youSuck">
            <h2>You suck.</h2>
            <p>
                Really. Give up.
            </p>
        </div>
        <Button @click="$emit('restartGame')">Play again</Button>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    components: {
        Button,
    },
    props: {
        maxQuestions: Number,
        score: Number,
    },
    data() {
        return {

        };
    },
    computed: {
        youreAwesome() {
            return this.score === this.maxQuestions;
        },
        youreGood() {
            return this.score < 20 && this.score >= 15;
        },
        youreAverage() {
            return this.score < 15 && this.score >= 10;
        },
        youreBelowPar() {
            return this.score < 10 && this.score >= 4;
        },
        youSuck() {
            return this.score < 4;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
