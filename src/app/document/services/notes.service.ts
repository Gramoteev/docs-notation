import { Injectable, signal, computed } from '@angular/core';
import { NoteData } from '../interfaces/notes.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly notesMap = signal(new Map<number, NoteData[]>());

  readonly notes = computed(() => this.notesMap());

  getNotesForPage = computed(
    () =>
      (page: number): NoteData[] =>
        this.notesMap().get(page) ?? [],
  );

  addNote(page: number, content: string): void {
    const current = new Map(this.notesMap());
    const notes = current.get(page) ?? [];

    const note: NoteData = {
      id: crypto.randomUUID(),
      content,
    };

    current.set(page, [...notes, note]);
    this.notesMap.set(current);
  }

  removeNote(page: number, id: string): void {
    const current = new Map(this.notesMap());
    const notes = current.get(page);

    if (!notes) return;

    const updated = notes.filter((note) => note.id !== id);
    current.set(page, updated);
    this.notesMap.set(current);
  }
}
