import AddLocationImg from "../../img/add_location_FILL0_wght400_GRAD0_opsz48.svg";
import { createImage } from "../../Commons/Utils";

export const addLocationHandler = (props: any) => {
    const { event, canvasState } = props;

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

        context.drawImage(addLocationImg, x, y, w, h);
    }
};