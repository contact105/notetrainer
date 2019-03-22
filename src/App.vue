<template>
    <div id="app">
        <!--<Splash @startGame="isPlaying = true" v-if="!isPlaying"/>-->
        <Splash @startGame="startGame" v-if="!isPlaying"/>
        <Game
            :maxQuestions="maxQuestions"
            @showScoreBoard="showScoreBoard"
            @restartGame="restartGame"
            v-if="gameIsVisible"
        />
        <Score
            :maxQuestions="maxQuestions"
            :score="score"
            @restartGame="startGame"
            v-if="scoreBoardIsVisible"
        />
    </div>
</template>

<script>
import Splash from './components/Splash.vue';
import Game from './components/Game.vue';
import Score from './components/Score.vue';

export default {
    name: 'app',
    components: {
        Splash,
        Game,
        Score,
    },
    data() {
        return {
            isPlaying: false,
            isDone: false,
            maxQuestions: 20,
            score: 0,
        };
    },
    methods: {
        startGame() {
            this.isPlaying = true;
            this.isDone = false;
        },
        restartGame() {
            this.isPlaying = false;
            this.isDone = false;
        },
        showScoreBoard(result) {
            this.score = result.score;
            this.isDone = true;
        },
    },
    computed: {
        gameIsVisible() {
            return this.isPlaying && !this.isDone;
        },
        scoreBoardIsVisible() {
            return this.isPlaying && this.isDone;
        },
    },
};
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #fff;
        padding: 60px 20px;
        user-select: none;
    }

    html,
    body {
        height: 100%;
        background-color: #2c3e50;
        background: radial-gradient(#2c3e50 0%, #111 100%);
        overflow: hidden;
        margin: 0;
        overflow-x: hidden;
    }
</style>
