import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Canvas, { canvas } from "../../Interfaces/Canvas";
import MapZoom from "./MapZoom";
import { contentMoveHandler, dropMap, grabDropMap } from "./MapMove";
import { drawMap } from "./MapDraw";
import {
  addLocationHandler,
  dropPin,
  grabDropPin,
  mapPinDraw,
  mapPinMoveHandler,
} from "./MapPinDraw";
import { getLogedUser } from "../../Commons/Utils";

export interface Coordinate {
  x: number;
  y: number;
  scale: number;
  imgBase64: string;
}

const MapCanvas = (props: any) => {
  const { showPersonForm, person, setPerson, personListState } = props;
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

  const drawPeoplelocations = useCallback(() => {
    personListState.forEach((person: any) => {
      if (person.possition.x && person.possition.y) {
        mapPinDraw({ canvasState, person });
      }
    });
  }, [canvasState, personListState]);

  useEffect(() => {
    drawPeoplelocations();
  }, [drawPeoplelocations]);

  const zoomHandler = (scale: number) => {
    canvasState.scale = scale;
    drawMap(canvasState);
  };

  const contentMove: any = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      contentMoveHandler(event, canvasState, moveCoordinate);
      mapPinMoveHandler(event, canvasState, moveCoordinate, person);
    },
    [canvasState, moveCoordinate, person]
  );

  const contentGrabDrop: any = useCallback(
    () => {
      grabDropMap();
      grabDropPin();
    },
    []
  );

  const contentDrop: any = useCallback(
    () => {
      dropMap();
      dropPin();
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", contentMove);
    canvas.addEventListener("mousedown", contentGrabDrop);
    canvas.addEventListener("mouseup", contentGrabDrop);
    canvas.addEventListener("mouseout", contentDrop);
    return () => {
      canvas.removeEventListener("mousemove", contentMove);
      canvas.removeEventListener("mousedown", contentGrabDrop);
      canvas.removeEventListener("mouseup", contentGrabDrop);
      canvas.removeEventListener("mouseout", contentDrop);
    };
  }, [canvasState, contentDrop, contentGrabDrop, contentMove]);

  const addLocation = useCallback(
    (event: any) => {
      addLocationHandler({
        event,
        canvasState,
        person,
        setPerson,
      });
      setTimeout(() => {
        showPersonForm();
      }, 500);
    },
    [showPersonForm, canvasState, person, setPerson]
  );

  useEffect(() => {
    const user = getLogedUser();
    if (!user.isAdmin || !canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("dblclick", addLocation);
    return () => {
      canvas.removeEventListener("dblclick", addLocation);
    };
  }, [canvasState, addLocation]);

  return (
    <>
      <MapZoom zoomHandler={zoomHandler} />
      <canvas ref={canvasRef} height={height} width={width} />
    </>
  );
};

export default MapCanvas;
