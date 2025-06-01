import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { toPercent, toPixel, clampPercent } from './helpers';

@Injectable()
export class DragService {
  setupDrag(
    element: HTMLElement,
    parentElement: HTMLElement,
    getCurrentPosition: () => { x: number; y: number },
  ): Observable<{ x: number; y: number }> {
    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown');
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    return mousedown$.pipe(
      map((event) => {
        return calculateOffsets(
          event,
          getCurrentPosition(),
          parentElement.getBoundingClientRect(),
        );
      }),
      switchMap(({ xOffset, yOffset }) =>
        mousemove$.pipe(
          map((event) => {
            event.preventDefault();
            const parentRect = parentElement.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            return calculatePosition(
              event,
              xOffset,
              yOffset,
              elementRect,
              parentRect,
            );
          }),
          takeUntil(mouseup$),
        ),
      ),
    );
  }
}

function calculateOffsets(
  event: MouseEvent,
  position: { x: number; y: number },
  parentRect: DOMRect,
): { xOffset: number; yOffset: number } {
  return {
    xOffset: event.clientX - toPixel(position.x, parentRect.width),
    yOffset: event.clientY - toPixel(position.y, parentRect.height),
  };
}

function calculatePosition(
  event: MouseEvent,
  xOffset: number,
  yOffset: number,
  elementRect: DOMRect,
  parentRect: DOMRect,
): { x: number; y: number } {
  const rawX = event.clientX - xOffset;
  const rawY = event.clientY - yOffset;
  const newX = toPercent(rawX, parentRect.width);
  const newY = toPercent(rawY, parentRect.height);
  return {
    x: clampPercent(newX, elementRect.width, parentRect.width),
    y: clampPercent(newY, elementRect.height, parentRect.height),
  };
}
