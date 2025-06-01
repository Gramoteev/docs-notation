import { Injectable } from '@angular/core';

export interface NoteData {
  content: string;
  page: number;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notes: NoteData[] = [];

  addNote(note: NoteData) {
    this.notes.push(note);
  }

  removeNote(index: number) {
    if (index >= 0 && index < this.notes.length) {
      this.notes.splice(index, 1);
    }
  }

  getNotes(): NoteData[] {
    return this.notes;
  }
}
