import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentHeaderComponent } from './components/document-header/document-header.component';
import { DocumentContentComponent } from './components/document-content/document-content.component';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from './services/document.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DOCUMENT_TYPES } from './constants/document.constants';
import { DocumentZoomService } from './services/document-zoom.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  imports: [DocumentHeaderComponent, DocumentContentComponent],
  providers: [DocumentZoomService],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  protected readonly DOCUMENT_TYPES = DOCUMENT_TYPES;

  private route = inject(ActivatedRoute);
  private documentService = inject(DocumentService);

  document = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.documentService.getDocument(id)),
    ),
  );
}
