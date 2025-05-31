import { Component } from '@angular/core';
import {DocumentHeaderComponent} from './components/document-header/document-header.component';
import {DocumentContentComponent} from './components/document-content/document-content.component';

@Component({
  selector: 'app-document',
  imports: [
    DocumentHeaderComponent,
    DocumentContentComponent
  ],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  standalone: true
})
export class DocumentComponent {

}
