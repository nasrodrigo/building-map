import { createImage } from "../../Commons/Utils";
import Canvas from "../../Interfaces/Canvas";
import MapImg from "../../img/floor-plant.gif";

export const drawMap = (canvasState: Canvas) => {
    if (
        !canvasState.canvas ||
        !canvasState.context ||
        !canvasState.scale ||
        !canvasState.translate
    ) {
        return;
    }

    const mapImg: HTMLImageElement = createImage(MapImg);

    mapImg.onload = () => {
        const canvas: HTMLCanvasElement = canvasState.canvas!;
        const context: CanvasRenderingContext2D = canvasState.context!;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();

        context.translate(
            canvasState.translate!.x,
            canvasState.translate!.y
        );
        context.scale(canvasState.scale!, canvasState.scale!)
        context.beginPath();

        const x = -mapImg.width / 2;
        const y = -mapImg.height / 2;
        context.drawImage(mapImg, x, y);

        context.restore();
    }


};