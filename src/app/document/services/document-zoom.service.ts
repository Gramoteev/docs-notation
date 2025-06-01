import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class DocumentZoomService {
  private baseWidth = 0;
  private maxZoomWidth = window.innerWidth * 0.95;
  private step = 100;

  private currentWidthSignal = signal<number>(this.baseWidth);
  public currentWidth = this.currentWidthSignal.asReadonly();
  public scale = computed(() => {
    return this.baseWidth > 0
      ? Math.round((this.currentWidthSignal() / this.baseWidth) * 100)
      : 100;
  });
  public canZoomIn = computed(
    () => this.currentWidthSignal() + this.step <= this.maxZoomWidth,
  );
  public canZoomOut = computed(
    () => this.currentWidthSignal() - this.step >= this.baseWidth,
  );

  public canScale = computed(
    () => this.currentWidthSignal() < window.innerWidth,
  );

  init(baseDocumentWidth: number) {
    this.baseWidth =
      window.innerWidth > baseDocumentWidth
        ? baseDocumentWidth
        : window.innerWidth;
    this.currentWidthSignal.set(this.baseWidth);
    this.maxZoomWidth = window.innerWidth * 0.95;
  }

  zoomIn() {
    if (!this.canZoomIn()) return;

    const newWidth = this.currentWidthSignal() + this.step;
    if (newWidth <= this.maxZoomWidth) {
      this.currentWidthSignal.set(newWidth);
    }
  }

  zoomOut() {
    if (!this.canZoomOut()) return;

    const newWidth = this.currentWidthSignal() - this.step;
    if (newWidth >= this.baseWidth) {
      this.currentWidthSignal.set(newWidth);
    }
  }
}
