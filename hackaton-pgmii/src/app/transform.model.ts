export interface TransformState {
  tx: number;      // traslacion en X
  ty: number;      // traslacion en Y
  scale: number;   // factor de escala
  angle: number;   // angulo de rotacion en grados
  flipX: boolean;  // reflejo horizontal
  flipY: boolean;  // reflejo vertical
}