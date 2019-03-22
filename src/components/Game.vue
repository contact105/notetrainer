<template>
    <div>
        <div @click="restartGame" class="btn-restart">Restart</div>
        <Fretboard
            :fretboardMatrix="fretboardMatrix"
            :noteArray="noteArray"
            :note="note"
        />
        <div class="game-ui">
            <div class="score">
                <div>{{ currentQuestion }} / {{ maxQuestions }}</div>
                <h1>{{ score }}</h1>
            </div>
            <div class="answers">
                <Button
                    v-for="(answer, index) in answers"
                    :key="index"
                    @click="checkAnswer(answer)">
                    {{ answer }}
                </Button>
            </div>
            <div class="timer"><div class="timer__progress"></div></div>
        </div>
    </div>
</template>

<script>
import { TweenMax, Linear } from 'gsap/TweenMax';
import FretboardMatrix from '@/classes/fretboardMatrix';
import Fretboard from './Fretboard.vue';
import Button from './Button.vue';

export default {
    components: {
        Fretboard,
        Button,
    },
    props: {
        maxQuestions: Number,
    },
    data() {
        return {
            noteArray: [
                'A',
                'A#', // ['A#', 'Bb'],
                'B',
                'C',
                'C#', // ['C#', 'Db'],
                'D',
                'D#', // ['D#', 'Eb'],
                'E',
                'F',
                'F#', // ['F#', 'Gb'],
                'G',
                'G#', // ['G#', 'Ab'],
            ],
            tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
            score: 0,
            currentQuestion: 0,
            answers: [],
            fretboardMatrix: [],
            timer: null,
            currentNoteObject: null,
            note: {},
        };
    },
    methods: {
        // Resets all notes to invisible.
        clearAllNotesOnFretboard() {
            const fretboardMatrix = this.fretboardMatrix.data;

            Object.keys(fretboardMatrix).forEach((i) => {
                Object.keys(fretboardMatrix[i]).forEach((j) => {
                    fretboardMatrix[i][j].isVisible = false;
                });
            });
        },
        // Pick random note on the fretboard.
        randomNoteOnFretboard() {
            const fretboardMatrix = this.fretboardMatrix.data;
            const string = fretboardMatrix[Math.floor(Math.random() * fretboardMatrix.length)];
            const note = string[Math.floor(Math.random() * string.length)];

            return note;
        },
        startGame() {
            this.resetGame();
            this.startQuestion();
        },
        resetGame() {
            TweenMax.killTweensOf('.timer__progress');
            this.score = 0;
            this.currentQuestion = 0;
            // this.stopTimer();
            this.clearAllNotesOnFretboard();
        },
        restartGame() {
            this.resetGame();
            this.$emit('restartGame');
        },
        startTimer() {
            // There's an init state bug.. Await?
            console.log(this.$el);
            TweenMax.fromTo('.timer__progress', 5, {
                width: '100%',
            },
            {
                width: 0,
                ease: Linear.easeNone,
                onComplete: () => {
                    console.log('onComplete');
                    this.startQuestion();
                },
            });
        },
        startQuestion() {
            this.clearAllNotesOnFretboard();
            const randomNote = this.randomNoteOnFretboard();

            this.currentQuestion += 1;

            console.log('Start');
            this.animateToNote(randomNote);
            this.currentNoteObject = randomNote;
            this.currentNoteObject.isVisible = true;
            this.randomAnswers();
            this.startTimer();
        },
        animateToNote(note) {
            this.note = note;
        },
        // Removes item from array to prevent getting doubles when picking multiple random values.
        filterArray(arr, item) {
            return arr.filter(value => value !== item);
        },
        // Sets the answers.
        // Ensures correct answer is present and there're no doubles.
        randomAnswers() {
            const option1 = this.currentNoteObject.note;
            let notes = this.filterArray(this.noteArray, option1);
            const option2 = notes[Math.floor(Math.random() * notes.length)];
            notes = this.filterArray(notes, option2);
            const option3 = notes[Math.floor(Math.random() * notes.length)];

            this.answers = [option1, option2, option3];

            // Shuffle answers.
            this.answers.sort(() => 0.5 - Math.random());
        },
        // Checks answer and start new question.
        // When max questions is reached game is stopped.
        checkAnswer(answer) {
            if (this.currentNoteObject.note === answer) {
                this.score += 1;
            }
            if (this.currentQuestion < this.maxQuestions - 1) {
                this.startQuestion();
            } else {
                this.showScore();
            }
        },
        // Game is done. Go to scoreboard!
        showScore() {
            const myScore = this.score;
            this.resetGame();
            this.$emit('showScoreBoard', { maxQuestions: this.maxQuestions, score: myScore });
        },
    },
    mounted() {
        // Creates a matrix array with all the notes and their visibility status.
        this.fretboardMatrix = new FretboardMatrix({
            noteArray: this.noteArray,
            tuning: this.tuning,
        });

        this.startGame();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .btn-restart {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 4px;
        padding: 0.25rem 0.65rem;
        font-size: 80%;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .game-ui {
        display: flex;
        justify-content: center;
        margin: 30px;
    }

    .score {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        padding: 10px;
        margin: 0 10px;
        width: 100px;

        h1 {
            margin: 0;
        }
    }

    .timer {
        //border: 1px solid #fff;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        margin: 0 10px;
        width: 100px;
        overflow: hidden;

        .timer__progress {
            width: 100%;
            height: 100%;
            background-color: darkslateblue;
        }
    }

</style>
