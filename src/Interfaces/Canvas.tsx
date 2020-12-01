import { Coordinate } from "./Person";

export default interface Canvas {
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    scale?: number;
    translate?: Coordinate;
};

// ==== Canvas Mockups ====
export const canvas: Canvas = {
    width: 0,
    height: 0,
    canvas: undefined,
    context: undefined,
    scale: 0,
    translate: undefined,
}