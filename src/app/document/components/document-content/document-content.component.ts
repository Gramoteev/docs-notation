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
export class DocumentContentComponent {
  @Input() pages!: IPage[];
  @Input() type!: IDocumentType;

  zoom = inject(DocumentZoomService);

  get imageSize() {
    console.log(this.zoom.level);
    return {
      width: this.type.width * this.zoom.level,
      height: this.type.height * this.zoom.level,
    };
  }
}
