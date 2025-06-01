import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDocumentType, IPage } from '../../interfaces/document.model';
import { DocumentPageComponent } from './components/document-page/document-page.component';

@Component({
  selector: 'app-document-content',
  imports: [DocumentPageComponent],
  templateUrl: './document-content.component.html',
  styleUrl: './document-content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentContentComponent {
  @Input() pages!: IPage[];
  @Input() type!: IDocumentType;
}
