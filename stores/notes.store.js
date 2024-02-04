import { makeObservable, observable, action } from 'mobx';

class NotesStore {
	constructor() {
		makeObservable(this, {
			notes: observable,
			add: action
		});
	}

	notes = [];

	add(note) {
		this.notes.push(note);
		console.warn(this.notes);
	}
}

const notesStore = new NotesStore();

export default notesStore;
