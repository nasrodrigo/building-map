import { drawMap } from "./MapDraw";

let grabAndMoveMap = false;

export const grabDropMap = () => { 
    grabAndMoveMap = !grabAndMoveMap;
};

export const dropMap = () => { grabAndMoveMap = false; };

export const contentPossitionHandler: any = (
    event: React.MouseEvent<HTMLCanvasElement>,
    canvasState: any,
    moveCoordinate: any
) => {
    if (!canvasState.translate) {
        return;
    }
    moveCoordinate.x = event.clientX - canvasState.translate.x;
    moveCoordinate.y = event.clientY - canvasState.translate.y;
    grabDropMap();

};

export const contentMoveHandler: any = (
    event: React.MouseEvent<HTMLCanvasElement>,
    canvasState: any,
    moveCoordinate: any
) => {
    if (!canvasState.translate) {
        return;
    }
    if (grabAndMoveMap) {
        canvasState.translate.x = event.clientX - moveCoordinate.x;
        canvasState.translate.y = event.clientY - moveCoordinate.y;
        drawMap(canvasState);
    }
};