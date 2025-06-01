export function toPercent(value: number, parentSize: number): number {
  return (value / parentSize) * 100;
}

export function toPixel(positionValue: number, parentSize: number): number {
  return (positionValue * parentSize) / 100;
}

export function clampPercent(
  value: number,
  elementSize: number,
  parentSize: number,
): number {
  const maxPercent = 100 - (elementSize / parentSize) * 100;
  return Math.max(0, Math.min(value, maxPercent));
}
