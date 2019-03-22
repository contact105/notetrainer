export default class FretboardMatrix {
    constructor(options) {
        this.data = [];
        const tuning = options.tuning.reverse();
        const notes = options.noteArray;

        Object.keys(tuning).forEach((i) => {
            const notesPerString = [];
            const firstNote = tuning[i];
            let notesOrder = [
                ...notes.slice(notes.indexOf(firstNote)),
                ...notes.slice(0, notes.indexOf(firstNote)),
                ...notes.slice(notes.indexOf(firstNote)),
                ...notes.slice(0, notes.indexOf(firstNote)),
            ];
            console.log(notesOrder);
            notesOrder = notesOrder.slice(0, -4);
            console.log(notesOrder);
            Object.keys(notesOrder).forEach((j) => {
                const note = {
                    fretId: Number(j),
                    note: notesOrder[j],
                    isVisible: true, // false,
                };
                notesPerString.push(note);
            });
            this.data.push(notesPerString);
        });
    }
}
