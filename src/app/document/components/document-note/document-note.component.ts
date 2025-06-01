import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-document-note',
  imports: [],
  templateUrl: './document-note.component.html',
  styleUrl: './document-note.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentNoteComponent {
  protected defaultPosition = { x: 50, y: 50 };
}
