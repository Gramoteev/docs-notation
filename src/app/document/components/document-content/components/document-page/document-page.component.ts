import {
  ChangeDetectionStrategy,
  Component,
  createComponent,
  EnvironmentInjector,
  Input,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IDocumentType, IPage } from '../../../../interfaces/document.model';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { DocumentNoteComponent } from './components/document-note/document-note.component';
import { DocumentNoteDialogComponent } from '../document-note-dialog/document-note-dialog.component';
import { NoteData, NotesService } from '../../../../services/notes.service';

@Component({
  selector: 'app-document-page',
  imports: [NgOptimizedImage, TuiButton],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DocumentPageComponent {
  @Input() page!: IPage;
  @Input() documentType!: IDocumentType;

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private notes: NoteData[] = [];

  constructor(
    private injector: EnvironmentInjector,
    private noteService: NotesService,
  ) {}

  private readonly dialog = tuiDialog(DocumentNoteDialogComponent, {
    dismissible: true,
    label: 'Adding Note',
  });

  addNote() {
    this.dialog(undefined).subscribe((content: string) => {
      const componentRef = createComponent(DocumentNoteComponent, {
        environmentInjector: this.injector,
      });
      componentRef.instance.content = content;
      componentRef.instance.viewContainerRef = this.container;
      componentRef.instance.index = this.notes.length;

      this.container.insert(componentRef.hostView);

      this.noteService.addNote({
        content,
        page: this.page.number,
      });
    });
  }
}
