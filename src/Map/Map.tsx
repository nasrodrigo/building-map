import React, { useEffect, useRef, useState } from 'react';
import MapImg from '../img/floor-plant.gif';
import Marker from '@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg';
import Person, { PersonForm, Coordinate, possition } from '../Person/Person';
import PersonData from '../Person/PersonData';
import MapSearch from '../Map/MapSearch';

interface Canvas {
    width?: number;
    height?: number;
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    scale?: number;
    translate?: Coordinate;
};

interface IPersonList {
    personListState?: [Person];
    updatePersonList: (personList: [Person]) => void;
}

let person: Person = {
    firstName: undefined,
    lastName: undefined,
    contact: undefined,
    possition: undefined,
};

export const MapPersonListContext = React.createContext<IPersonList>({personListState: [person], updatePersonList: ([Person]) => void {}});

const Map = ({ width, height }: Canvas) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const zoomInRef = useRef<HTMLButtonElement | null>(null);
    const zoomOutRef = useRef<HTMLButtonElement | null>(null);
    const personFormRef = useRef<HTMLDivElement | null>(null);

    const scaleMultiplier: number = 0.8;
    const translate: Coordinate = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const moveCoordinate: Coordinate = {x: 0, y:0};
    const mouseDown = {value: false};

    const [personListState, setPersonListState] = useState<[Person]>([person]);
    let [scaleState, setScaleState] = useState<number>(0.3);
    let [showPersonFormState, setShowPersonFormState] = useState<boolean>(false);
    //const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const updatePersonList = (personList: [Person]) => {

        if(!personListState){
            return;
        }

        for(let key in personList){
            personListState.push(personList[key]);
        }

        

        console.log(personListState);
    }

    const setMouseDownFalse = () => {
        mouseDown.value = false;
    }

    // const [mapImageState, setMapImageState] = useState<HTMLImageElement>(
    //     () => {
    //         const mapImg: HTMLImageElement = new Image();
    //         mapImg.src = MapImg;
    //         return mapImg;
    //     }
    // );

    // const [markerImageState, setMarkerImageState] = useState<HTMLImageElement>(
    //     () => {
    //         const markerImg: HTMLImageElement = new Image();
    //         markerImg.src = Marker;
    //         return markerImg;
    //     }
    // );

    const mapImg: HTMLImageElement = new Image();
    mapImg.src = MapImg;

    const markerImg: HTMLImageElement = new Image();
    markerImg.src = Marker;

   const getCanvas = () => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');

        if(!context){
            return;
        }

        return {
            canvas: canvas, 
            context: context, 
            scale: scaleState,
            translate: translate
        };
    }
    
    const draw = (props: Canvas) => {

        if(!props.canvas){
            return;
        }

        if(!props.context){
            return;
        }

        if(!props.translate){
            return;
        }

        const canvas = props.canvas;
        const context = props.context;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(props.translate.x, props.translate.y);
        context.scale(scaleState, scaleState);
        context.beginPath();

        const x = -mapImg.width / 2;
        const y = -mapImg.height / 2;
        context.drawImage(mapImg, x, y);

        context.restore();
    
    };

    useEffect(() => {

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        draw(canvas);

    }, []);

    const zoomInHandle = () => {

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        setScaleState(scaleState /= scaleMultiplier);

        canvas.scale = scaleState;
        draw(canvas);

    };

    useEffect(() => {

        if (!zoomInRef.current) {
            return;
        }

        const zoomInButton: HTMLButtonElement = zoomInRef.current;
        
        zoomInButton.addEventListener('click', zoomInHandle);
        
        return () => {
            zoomInButton.removeEventListener('click', zoomInHandle);
        };

    }, []);

    const zoomOutHandle = () => {
        
        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        setScaleState(scaleState = scaleState *= scaleMultiplier);

        canvas.scale = scaleState;
        draw(canvas);

    };

    useEffect(() => {

        if (!zoomOutRef.current) {
            return;
        }

        const zoomOutButton: HTMLButtonElement = zoomOutRef.current;
        
        zoomOutButton.addEventListener('click', zoomOutHandle);
        
        return () => {
            zoomOutButton.removeEventListener('click', zoomOutHandle);
        };

    }, []);

    const contentPossitionHandle = (props: any) => {
        
        mouseDown.value = true;

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        if(!canvas.translate){
            return;
        }

        moveCoordinate.x = props.clientX - canvas.translate.x;
        moveCoordinate.y = props.clientY - canvas.translate.y;
    };

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', contentPossitionHandle);
        return () => {
            canvas.removeEventListener('mousedown', contentPossitionHandle);
        };
    }, []);

    const newContentPossitionHandle = (props: any) => {
        
        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        if(!canvas.translate){
            return;
        }

        if(mouseDown.value){
            canvas.translate.x = props.clientX - moveCoordinate.x;
            canvas.translate.y = props.clientY - moveCoordinate.y;
            draw(canvas);
        }
    };

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', newContentPossitionHandle);
        canvas.addEventListener('mouseup', setMouseDownFalse);
        canvas.addEventListener('mouseover', setMouseDownFalse);
        canvas.addEventListener('mouseout', setMouseDownFalse);
        return () => {
            canvas.removeEventListener('mousemove', newContentPossitionHandle);
            canvas.addEventListener('mouseup', setMouseDownFalse);
            canvas.addEventListener('mouseover', setMouseDownFalse);
            canvas.addEventListener('mouseout', setMouseDownFalse);
        };

    }, []);

    const drawMarker = (props: any) => {

        const canvas = getCanvas();

        if(!canvas){
            return;
        }

        if(!canvas.canvas){
            return;
        }

        if(!canvas.context){
            return;
        }

        possition.x = props.offsetX;
        possition.y = props.offsetY;

        const rect = canvas.canvas.getBoundingClientRect();

        const mouseXPos = props.clientX - rect.left;
        const mouseYPos = props.clientY - rect.top;

        const w = markerImg.width / 4;
        const h = markerImg.height / 4;
        const x = mouseXPos - (w / 2);
        const y = mouseYPos - h;

        canvas.context.drawImage(markerImg, x, y, w, h);

        setShowPersonFormState(showPersonFormState = true);
        personFormHandle();
    };

    const personFormHandle = () => {
        if (!personFormRef.current) {
            return;
        }

        if(showPersonFormState){
            personFormRef.current.style.display = "block";
        }        

    }

    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('dblclick', drawMarker);
        return () => {
            canvas.removeEventListener('dblclick', drawMarker);
        };

    }, []);

    return <div>
                <MapSearch/> 
                <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                    <button ref={zoomInRef}>+</button>
                    <button ref={zoomOutRef}>-</button>
                </div>
                <div ref={personFormRef} style={{display:"none"}}>
                <MapPersonListContext.Provider value={{personListState : personListState, updatePersonList : updatePersonList}}>
                    <PersonForm />
                </MapPersonListContext.Provider>
                </div>
                <canvas ref={canvasRef} height={height} width={width} />
            </div>;

};

Map.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export default Map;
