import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TuiButton, TuiGroup, TuiTitle } from '@taiga-ui/core';
import { TuiHeader } from '@taiga-ui/layout';
import { DocumentZoomService } from '../../services/document-zoom.service';

@Component({
  selector: 'app-document-header',
  imports: [TuiButton, TuiHeader, TuiTitle, TuiGroup],
  templateUrl: './document-header.component.html',
  styleUrl: './document-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentHeaderComponent {
  @Input() name!: string;

  private zoom = inject(DocumentZoomService);
  public canZoomIn = this.zoom.canZoomIn;
  public canZoomOut = this.zoom.canZoomOut;
  public scale = this.zoom.scale;

  zoomIn() {
    this.zoom.zoomIn();
  }

  zoomOut() {
    this.zoom.zoomOut();
  }
}
