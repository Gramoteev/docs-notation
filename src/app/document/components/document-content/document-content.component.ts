import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IPage} from '../../interfaces/document.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-document-content',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './document-content.component.html',
  styleUrl: './document-content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentContentComponent {
  @Input() pages!: IPage[];


}
