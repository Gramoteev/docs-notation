import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { DragService } from './services/drag/drag.service';
import { signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TuiButtonClose } from '@taiga-ui/kit';
import { NotesService } from '../../../../../../services/notes.service';

@Component({
  selector: 'app-document-note',
  templateUrl: './document-note.component.html',
  styleUrl: './document-note.component.scss',
  standalone: true,
  providers: [DragService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiButtonClose],
})
export class DocumentNoteComponent implements AfterViewInit {
  @Input() content!: string;
  @Input() viewContainerRef!: ViewContainerRef;
  @Input() index!: number;

  private elementRef = inject(ElementRef);
  private dragService = inject(DragService);
  private notesService = inject(NotesService);

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
      .subscribe((position) => {
        this.position.set(position);
      });
  }

  remove() {
    this.notesService.removeNote(this.index);
    this.viewContainerRef.remove(this.index);
  }
}
