import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  signal,
} from '@angular/core';
import { DragService } from './services/drag/drag.service';

@Component({
  selector: 'app-document-note',
  templateUrl: './document-note.component.html',
  styleUrl: './document-note.component.scss',
  standalone: true,
  providers: [DragService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentNoteComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private dragService = inject(DragService);

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
}
