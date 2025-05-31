import {Component, Input} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiHeader} from '@taiga-ui/layout';

@Component({
  selector: 'app-document-header',
  imports: [TuiButton, TuiHeader, TuiTitle],
  templateUrl: './document-header.component.html',
  styleUrl: './document-header.component.scss'
})
export class DocumentHeaderComponent {
  @Input() name!: string;

}
