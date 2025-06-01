import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiTextfield } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiTextarea } from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-note-dialog',
  imports: [TuiTextfield, TuiTextarea, TuiButton, ReactiveFormsModule],
  templateUrl: './document-note-dialog.component.html',
  styleUrl: './document-note-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DocumentNoteDialogComponent {
  public readonly context = injectContext<TuiDialogContext<string>>();
  protected submit(): void {
    if (this.control.value !== null) {
      this.context.completeWith(this.control.value);
    }
  }

  protected control = new FormControl('');

  constructor() {
    this.control.markAsTouched();
  }
}
