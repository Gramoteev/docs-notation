import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IDocumentType, IPage } from '../../../../interfaces/document.model';
import { TuiButton } from '@taiga-ui/core';
import { DocumentNoteComponent } from './components/document-note/document-note.component';

@Component({
  selector: 'app-document-page',
  imports: [NgOptimizedImage, DocumentNoteComponent, TuiButton],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DocumentPageComponent {
  @Input() page!: IPage;
  @Input() imageSize!: IDocumentType;
}
