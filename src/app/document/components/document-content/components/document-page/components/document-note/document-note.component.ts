import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  Input,
  signal,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiButtonClose } from '@taiga-ui/kit';
import { DragService } from './services/drag/drag.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotesService } from '../../../../../../services/notes.service';

@Component({
  selector: 'app-document-note',
  standalone: true,
  imports: [TuiButton, TuiButtonClose],
  providers: [DragService],
  templateUrl: './document-note.component.html',
  styleUrl: './document-note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentNoteComponent implements AfterViewInit {
  @Input() content!: string;
  @Input() id!: string;
  @Input() page!: number;

  private readonly notesService = inject(NotesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly dragService = inject(DragService);

  private position = signal<{ x: number; y: number }>({ x: 40, y: 20 });

  @HostBinding('style.left') get left() {
    return `${this.position().x}%`;
  }

  @HostBinding('style.top') get top() {
    return `${this.position().y}%`;
  }

  ngAfterViewInit() {
    this.dragService
      .setupDrag(
        this.elementRef.nativeElement,
        this.elementRef.nativeElement.parentElement,
        () => this.position(),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pos) => this.position.set(pos));
  }

  onRemove() {
    this.notesService.removeNote(this.page, this.id);
  }
}
