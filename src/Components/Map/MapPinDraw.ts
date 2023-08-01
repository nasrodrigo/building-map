import AddLocationImg from "../../img/add_location_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from "../../Commons/Utils";
import Person, { person } from "../../Interfaces/Person";

export const addLocationHandler = (props: any) => {
    const { event, canvasState, setPerson } = props;

    if (!canvasState.canvas || !canvasState.context || !canvasState.scale) {
        return;
    }

    const addLocationImg: HTMLImageElement = createImage(AddLocationImg);

    addLocationImg.onload = () => {
        const context: CanvasRenderingContext2D = canvasState.context;

        const rect = canvasState.canvas?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;

        const w = addLocationImg.width / 2;
        const h = addLocationImg.height / 2;
        const x = mouseXPos - w / 2;
        const y = mouseYPos - h;

        person.possition.x = x;
        person.possition.y = y;
        person.possition.scale = canvasState.scale;
        person.possition.imgBase64 = AddLocationImg;

        setPerson(person);

        context.drawImage(addLocationImg, x, y);
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

    const addLocationImg: HTMLImageElement = createImage(AddLocationImg);

    addLocationImg.onload = () => {
        const context: CanvasRenderingContext2D = canvasState.context;

        const rect = canvasState.canvas?.getBoundingClientRect();

        if (!rect) {
            return;
        }

        const w = addLocationImg.width / 2;
        const h = addLocationImg.height / 2;
        const x = person.possition.x > 0 ? person.possition.x : canvasState.translate.x;
        const y = person.possition.y > 0 ? person.possition.y : canvasState.translate.y;

        context.drawImage(addLocationImg, x, y, w, h);
    }
};