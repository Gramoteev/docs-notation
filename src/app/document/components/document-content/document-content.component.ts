import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPage } from '../../interfaces/document.model';
import { NgOptimizedImage } from '@angular/common';
import { DocumentNoteComponent } from '../document-note/document-note.component';

@Component({
  selector: 'app-document-content',
  imports: [NgOptimizedImage, DocumentNoteComponent],
  templateUrl: './document-content.component.html',
  styleUrl: './document-content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentContentComponent {
  @Input() pages!: IPage[];
}
