import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiTextfield } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiTextarea } from '@taiga-ui/kit';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  private fb = inject(FormBuilder);

  protected form: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
  });

  protected submit(): void {
    if (this.form.valid) {
      const { text } = this.form.value;

      if (text !== null) {
        this.context.completeWith(text);
      }
    }
  }
}
