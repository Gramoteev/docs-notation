import { Injectable } from '@angular/core';

@Injectable()
export class DocumentZoomService {
  level = 2;

  zoomIn() {
    const MAX = 2;
    if (this.level < MAX) {
      this.level = Math.min(this.level + 0.1, MAX);
    }
  }

  zoomOut() {
    const MIN = 0.2;
    if (this.level > MIN) {
      this.level = Math.max(this.level - 0.1, MIN);
    }
  }
}
