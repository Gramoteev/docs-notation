import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { TuiButton, TuiGroup, TuiTitle } from '@taiga-ui/core';
import { DocumentZoomService } from '../../services/document-zoom.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-document-header',
  imports: [TuiButton, TuiTitle, TuiGroup],
  templateUrl: './document-header.component.html',
  styleUrl: './document-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentHeaderComponent {
  @Input() name!: string;

  private zoom = inject(DocumentZoomService);
  private notesService = inject(NotesService);
  public canZoomIn = this.zoom.canZoomIn;
  public canZoomOut = this.zoom.canZoomOut;
  public scale = this.zoom.scale;
  public canScale = this.zoom.canScale;

  zoomIn() {
    this.zoom.zoomIn();
  }

  zoomOut() {
    this.zoom.zoomOut();
  }

  save() {
    console.info({ name: this.name, addedNotes: this.notesService.getNotes() });
  }
}
