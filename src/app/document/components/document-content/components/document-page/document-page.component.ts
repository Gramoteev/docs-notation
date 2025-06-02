import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IDocumentType, IPage } from '../../../../interfaces/document.model';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { DocumentNoteComponent } from './components/document-note/document-note.component';
import { DocumentNoteDialogComponent } from '../document-note-dialog/document-note-dialog.component';
import { NotesService } from '../../../../services/notes.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-document-page',
  imports: [NgOptimizedImage, TuiButton, DocumentNoteComponent],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DocumentPageComponent {
  @Input() page!: IPage;
  @Input() documentType!: IDocumentType;

  private readonly notesService = inject(NotesService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly dialog = tuiDialog(DocumentNoteDialogComponent, {
    dismissible: true,
    label: 'Adding Note',
  });

  readonly notes = computed(() =>
    this.notesService.getNotesForPage()(this.page.number),
  );

  addNote() {
    this.dialog(undefined)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((content: string) => {
        if (content?.trim()) {
          this.notesService.addNote(this.page.number, content);
        }
      });
  }
}
