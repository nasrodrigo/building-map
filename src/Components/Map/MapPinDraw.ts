import AddLocationImg from "../../img/add_location_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from "../../Commons/Utils";
import Person, { person } from "../../Interfaces/Person";

export const addLocationHandler = (props: any) => {
    const { event, canvasState, setPerson } = props;

    if (!canvasState.canvas || !canvasState.context || !canvasState.scale || !canvasState.translate) {
        return;
    }

    const addLocationImg: HTMLImageElement = createImage(AddLocationImg);
    
    addLocationImg.onload = () => {
        const rect = canvasState.canvas?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        // mouse position in canvas pixels
        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;

        // convert to map-local coordinates (reverse the translate/scale used when drawing the map)
        const localX = (mouseXPos - canvasState.translate.x) / canvasState.scale;
        const localY = (mouseYPos - canvasState.translate.y) / canvasState.scale;

        // store map-local coordinates (centered map coordinate system)
        person.possition.x = localX;
        person.possition.y = localY;
        person.possition.scale = canvasState.scale;
        person.possition.imgBase64 = AddLocationImg;

        setPerson(person);

       drawTransform({ canvasState, addLocationImg, person });
    }
};

let grabAndMovePin = false;

export const grabDropPin = () => {
    grabAndMovePin = !grabAndMovePin;
};

export const dropPin = () => { grabAndMovePin = false; };

export const mapPinPossitionHandler: any = (
    event: React.MouseEvent<HTMLCanvasElement>,
    canvasState: any,
    moveCoordinate: any
) => {
    if (!canvasState.translate) {
        return;
    }
    moveCoordinate.x = event.clientX - canvasState.translate.x;
    moveCoordinate.y = event.clientY - canvasState.translate.y;
    grabDropPin();

};

export const mapPinMoveHandler: any = (
    event: React.MouseEvent<HTMLCanvasElement>,
    canvasState: any,
    moveCoordinate: any,
    person: Person
) => {
    if (!canvasState.translate) {
        return;
    }
    if (grabAndMovePin) {
        canvasState.translate.x = event.clientX - moveCoordinate.x;
        canvasState.translate.y = event.clientY - moveCoordinate.y;
        mapPinDraw({ canvasState, person });
    }
};

export const mapPinDraw = (props: any) => {
    const { canvasState, person } = props;

    if (!canvasState.context || !canvasState.translate || !canvasState.scale || !canvasState.canvas) {
        return;
    }

    const addLocationImg: HTMLImageElement = createImage(AddLocationImg);

    addLocationImg.onload = () => {
        drawTransform({ canvasState, addLocationImg, person });
    }
};

const drawTransform = (props: any) => {
    const { canvasState, addLocationImg, person } = props;

    if (!canvasState.context || !canvasState.translate || !canvasState.scale || !canvasState.canvas) {
        return;
    }

    const context: CanvasRenderingContext2D = canvasState.context;

    // draw in the same transformed space as the map
    context.save();
    context.translate(canvasState.translate.x, canvasState.translate.y);
    context.scale(canvasState.scale, canvasState.scale);

    const w = addLocationImg.width / 2;
    const h = addLocationImg.height / 2;

    // person.possition.x/y are map-local coords (set in addLocationHandler)
    context.drawImage(addLocationImg, person.possition.x - w / 2, person.possition.y - h / 2, w, h);

    context.restore();
}