import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNoteDialogComponent } from './document-note-dialog.component';

describe('DocumentNoteDialogComponent', () => {
  let component: DocumentNoteDialogComponent;
  let fixture: ComponentFixture<DocumentNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentNoteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
