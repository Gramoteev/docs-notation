import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { IDocumentType, IPage } from '../../interfaces/document.model';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { DocumentZoomService } from '../../services/document-zoom.service';

@Component({
  selector: 'app-document-content',
  imports: [DocumentPageComponent],
  templateUrl: './document-content.component.html',
  styleUrl: './document-content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentContentComponent implements OnInit {
  @Input() pages!: IPage[];
  @Input() type!: IDocumentType;
  private zoom = inject(DocumentZoomService);

  currentWidth = this.zoom.currentWidth;

  ngOnInit(): void {
    this.zoom.init(this.type.width);
  }
}
