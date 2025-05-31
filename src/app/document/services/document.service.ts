import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import MOCK_DOCUMENT from '@mocks/1.json';
import {IDocument} from '../interfaces/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  getDocument(id: number): Observable<IDocument> {
    return of(MOCK_DOCUMENT);
  }
}
