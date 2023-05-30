import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Canvas, { canvas } from "../../Interfaces/Canvas";
import MapZoom from "./MapZoom";
import {
  contentMoveHandler,
  contentPossitionHandler,
  grabDropMap,
} from "./MapMove";
import { drawMap } from "./MapDraw";
import { addLocationHandler } from "./MapPinDraw";
import { getLogedUser } from "../../Commons/Utils";

export interface Coordinate {
  x: number;
  y: number;
  scale: number;
  imgBase64: string;
}

const MapCanvas = (props: any) => {
  const {actions} = props;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const [canvasState, setCanvasState] = useState<Canvas>(canvas);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const moveCoordinate: Coordinate = useMemo(
    () => ({
      x: 0,
      y: 0,
      scale: 0,
      imgBase64: "",
    }),
    []
  );

  const getCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const htmlCanvasElement: HTMLCanvasElement = canvasRef.current;
    const context = htmlCanvasElement.getContext("2d");

    if (!context) {
      return;
    }

    setCanvasState({
      canvas: htmlCanvasElement,
      context: context,
      scale: 0.3,
      translate: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        scale: 0,
        imgBase64: "",
      },
    });

    
  };

  useEffect(() => {
    getCanvas();
  }, []);

  const zoomHandler = (scale: number) => {
    canvasState.scale = scale;
    drawMap(canvasState);
  };

  const contentPossitionCallback: any = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      contentPossitionHandler(event, canvasState, moveCoordinate);
    },
    [canvasState, moveCoordinate]
  );

  const contentMoveCallback: any = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      contentMoveHandler(event, canvasState, moveCoordinate);
    },
    [canvasState, moveCoordinate]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", contentPossitionCallback);
    canvas.addEventListener("mousemove", contentMoveCallback);
    canvas.addEventListener("mouseup", grabDropMap);
    return () => {
      canvas.removeEventListener("mousedown", contentPossitionCallback);
      canvas.removeEventListener("mousemove", contentMoveCallback);
      canvas.addEventListener("mouseup", grabDropMap);
    };
  }, [canvasState, contentPossitionCallback, contentMoveCallback]);

  const addLocationCallback = useCallback(
    (event: any) => {
      addLocationHandler({
        event,
        canvasState,
      });
      setTimeout(() => {
        actions.showPersonForm();
      }, 500);
    },
    [actions, canvasState]
  );

  useEffect(() => {
    const user = getLogedUser();
    if (!user.isAdmin || !canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("dblclick", addLocationCallback);
    return () => {
      canvas.removeEventListener("dblclick", addLocationCallback);
    };
  }, [canvasState, addLocationCallback]);

  return (
    <>
      <MapZoom zoomHandler={zoomHandler} />
      <canvas ref={canvasRef} height={height} width={width} />
    </>
  );
};

export default MapCanvas;
