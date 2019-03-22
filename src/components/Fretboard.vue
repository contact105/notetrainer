<template>
    <div class="fretboard" ref="fretboard">
        <div
            class="string"
            v-for="(string, stringIndex) in fretboardMatrix.data"
            :key="stringIndex">
            <div
                class="fret"
                v-for="(fret, fretIndex) in fretboardMatrix.data[stringIndex]"
                :key="fretIndex"
                :style="{ width: 100 - (fretIndex * 3) + 'px' }">
                <div
                    v-if="buildFretMarker(stringIndex, fretIndex)"
                    class="fret__marker"
                >
                </div>
                <div
                    v-if="noteIsVisible(stringIndex, fretIndex)"
                    class="active-note">
                    <!-- {{ fretIndex + 1 }} -->
                    {{ fretboardMatrix.data[stringIndex][fretIndex].note }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TweenMax } from 'gsap/TweenMax';

export default {
    name: 'Fretboard',
    props: {
        noteArray: Array,
        fretboardMatrix: Object,
        note: Object,
    },
    watch: {
        note() {
            TweenMax.to(this.$refs.fretboard, 0.3, {
                x: -this.note.fretId * 30,
            });
        },
    },
    created() {
        console.log('recreate');
    },
    methods: {
        // Returns note visibility
        noteIsVisible(stringIndex, fretIndex) {
            return this.fretboardMatrix.data[stringIndex][fretIndex].isVisible;
        },
        // WARNING:
        // Updates each time. Needs to be replaced........? I guess..
        // Sets the markers on the fretboard
        buildFretMarker(stringIndex, fretIndex) {
            console.log('rerender');
            const allowedFretIndexes = [2, 4, 6, 8, 11, 14, 16, 18];

            return (allowedFretIndexes.indexOf(fretIndex) !== -1 && stringIndex === 3);
        },
    },
};
</script>

<style scoped lang="scss">
    .fretboard {
        display: inline-block;
        position: relative;
        left: 100px;
        box-shadow: 5px 10px 50px rgba(0,0,0,0.25);
        background: linear-gradient(burlywood 0%, goldenrod 100%);
    }

    .string {
        white-space: nowrap;
        position: relative;
        height: 24px;

        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 4px;
            top: 13px;
            background: linear-gradient(#ccc 0%, #333 100%);
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
        }
    }

    .fret {
        display: inline-flex;
        position: relative;
        height: 24px;
        top: 0;
        width: 100px;

        &:after {
            content: '';
            display: block;
            position: relative;
            width: 6px;
            background: linear-gradient(to right, #aaa 0%, #666 100%);
            box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.2);
        }

        .fret__marker {
            position: absolute;
            width: 14px;
            height: 14px;
            left: 50%;
            margin-left: -4px;
            top: -50%;
            margin-top: 8px;
            border-radius: 50%;
            background-color: #333;
        }
    }

    .active-note {
        position: absolute;
        z-index: 1;
        top: -5px;
        left: -50%;
        margin-left: 4px;
        transform: translate(-20px);
        background-color: #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-weight: 700;
        color: #2c3e50;
        box-shadow: 0px 0px 5px 5px rgba(aqua,0.9);

        &.correct {
            background-color: mediumseagreen;
            color: #fff;
            transform: scale(1.1);
            transform-origin: center center;
        }

        &.error {
            background-color: crimson;
            color: #fff;
            transform: scale(1.1);
            transform-origin: center center;
        }
    }

</style>
