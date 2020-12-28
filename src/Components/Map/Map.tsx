import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import Canvas, { canvas } from "../../Interfaces/Canvas";
import Person, { Coordinate, possition, person, User ,user } from "../../Interfaces/Person";
import PersonForm from "../../Components/Person/PersonForm";

import MapSearch from "./MapSearch";
import MapZoom from "./MapZoom";
import MapSignout from "./MapSignout";

import MapImg from "../../img/floor-plant.gif";
import Marker from '@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg';
import classes from "./Map.module.css";

interface DrawMapProps{
    scale: number,
    translateX: number,
    translateY: number
}

const Map = ({ width, height }: Canvas) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const personFormRef = useRef<HTMLDivElement>(null);
    const personInfoRef = useRef<HTMLDivElement>(null);

    const [canvasState, setCanvasState] = useState<Canvas>(canvas);
    const [personListState, setPersonListState] = useState<Person[]>([]);
    const [possitionState, setPossitionState] = useState<Coordinate>(possition);
    const [personInfoState, setPersonInfoState] = useState<Person>(person);
    const [idToDeleteState, setIdToDeleteState] = useState<string>('');
    const [userState, setUserState] = useState<User>(user);
    
    const moveCoordinate: Coordinate = possition;
    let mouseDown = false;
    
    const mapImg: HTMLImageElement = new Image();
    mapImg.src = MapImg;

    const markerImg: HTMLImageElement = new Image();
    markerImg.src = Marker;

    const getCanvas = () => {

        if (!canvasRef.current) {
            return;
        }

        const htmlCanvasElement: HTMLCanvasElement = canvasRef.current;
        const context = htmlCanvasElement.getContext('2d');

        if(!context){
            return;
        }
        
        setCanvasState(
            {
                canvas: htmlCanvasElement,
                context: context,
                scale: 0.3,
                translate: {x: window.innerWidth / 2, 
                            y: window.innerHeight / 2,
                            scale: 0,
                            imgBase64: ''
                            }
            }
        )

    }

    useEffect(() => {
        const user = queryString.parse(window.location.search);
        setUserState(
            { 
                userName: user.userName? user.userName.toString(): "",
                isAdmin: user.isAdmin === "true"? true : false
            }
        );
        getCanvas();

    }, []);

    const drawMap = (props: DrawMapProps = 
        {
            scale: 0,
            translateX: 0,
            translateY: 0
        }
    ) => {

        if(!canvasState.canvas){
            return;
        } 
        
        if(!canvasState.context){
            return;
        } 
        
        if(!canvasState.translate){
            return;
        } 

        if(!canvasState.scale){
            return;
        } 

        const canvas: HTMLCanvasElement = canvasState.canvas;
        const context: CanvasRenderingContext2D = canvasState.context;

        
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(
            props.translateX === 0? canvasState.translate.x : props.translateX, 
            props.translateY === 0? canvasState.translate.y : props.translateY
        );
        props.scale === 0? context.scale(canvasState.scale, canvasState.scale) : context.scale(props.scale, props.scale);
        context.beginPath();

        const x = -mapImg.width / 2;
        const y = -mapImg.height / 2;
        context.drawImage(mapImg, x, y);

        context.restore();

    }
    
    useEffect(() => {

        window.onload = () => {
            drawMap();
        }

    }, [canvasState]);

    const zoomHandler = (scale: number) => {

        canvasState.scale = scale;

        drawMap();

    }

    // const contentPossitionHandler: any = (event: React.MouseEvent<HTMLCanvasElement>) => {
        
    //     mouseDown = true;
        
    //     if(!canvasState.translate){
    //         return;
    //     }

    //     moveCoordinate.x = event.clientX - canvasState.translate.x;
    //     moveCoordinate.y = event.clientY - canvasState.translate.y;

    // };

    // useEffect(() => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas: HTMLCanvasElement = canvasRef.current;
    //     canvas.addEventListener('mousedown', contentPossitionHandler);
    //     return () => {
    //         canvas.removeEventListener('mousedown', contentPossitionHandler);
    //     };
    // }, [canvasState]);

    // const newContentPossitionHandler: any = (event: React.MouseEvent<HTMLCanvasElement>) => {

    //     if(!canvasState.translate){
    //         return;
    //     }
        
    //     if(mouseDown){
    //         canvasState.translate.x = event.clientX - moveCoordinate.x;
    //         canvasState.translate.y = event.clientY - moveCoordinate.y;
    //         drawMap();
    //     }
    // };

    // const setMouseDownFalse = () => {
    //     mouseDown = false;
    // }

    // useEffect(() => {

    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas: HTMLCanvasElement = canvasRef.current;
    //     canvas.addEventListener('mousemove', newContentPossitionHandler);
    //     canvas.addEventListener('mouseup', setMouseDownFalse);
    //     canvas.addEventListener('mouseover', setMouseDownFalse);
    //     canvas.addEventListener('mouseout', setMouseDownFalse);
    //     return () => {
    //         canvas.removeEventListener('mousemove', newContentPossitionHandler);
    //         canvas.addEventListener('mouseup', setMouseDownFalse);
    //         canvas.addEventListener('mouseover', setMouseDownFalse);
    //         canvas.addEventListener('mouseout', setMouseDownFalse);
    //     };

    // }, [canvasState]);

    const addPersonHandler = (event: any) => {

        if(!canvasState.canvas){
            return;
        } 
        
        if(!canvasState.context){
            return;
        } 

        if(!canvasState.scale){
            return;
        }

        const canvas = canvasState.canvas;
        const context = canvasState.context;
        
        possition.x = event.offsetX;
        possition.y = event.offsetY;

        const rect = canvas.getBoundingClientRect();

        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;

        const w = markerImg.width / 4;
        const h = markerImg.height / 4;
        const x = mouseXPos - (w / 2);
        const y = mouseYPos - h;

        possitionState.scale = canvasState.scale;
        
        setPossitionState(
            {
                ...possitionState,
                x: event.offsetX,
                y: event.offsetX
            }
        );

        context.drawImage(markerImg, x, y, w, h);

        showPersonForm(true);

    }
    
    useEffect(() => {

        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('dblclick', userState.isAdmin? addPersonHandler : () => {});
        return () => {
            canvas.removeEventListener('dblclick', addPersonHandler);
        };

    }, [canvasState]);

    const drawSearchResult = (value: string) => {
        
        if(!canvasState.canvas){
            return;
        } 
        
        if(!canvasState.context){
            return;
        } 
        
        const canvas = canvasState.canvas;
        const context = canvasState.context;

        personListState.forEach(person => {
            
            if(person.firstName + ' ' + person.lastName === value){

                setPersonInfoState(person);

                const w = markerImg.width / 4;
                const h = markerImg.height / 4;
                const x = person.possition.x;
                const y = person.possition.y;

                const drawMapProps: DrawMapProps = {
                    scale : person.possition.scale,
                    translateX: 0,
                    translateY: 0 
                };

                drawMap(drawMapProps);
                context.drawImage(markerImg, x, y, w, h);
                showPersonInfo(true);

                return;

            }
            
        });

        
    }

    const showFormFilled = () => {

        showPersonInfo(false);
        showPersonForm(true);

    }

    const removePersonHandler = (event: React.FormEvent<HTMLFormElement>) => {

        if(!personInfoState.id){
            return;
        }

        setIdToDeleteState(personInfoState.id);

        showPersonInfo(false);

        showPersonForm(true);


    }

    const personInfoHandler = () => {

        if(!personInfoState){
            return;
        }

        if(!personInfoState.contact){
            return;
        }

        if(!personInfoState.contact.phone){
            return;
        }

        return <div className={classes.personInfo}>
                    <h3>{personInfoState.firstName + " " + personInfoState.lastName}</h3>
                    <a><b>Contact</b></a>
                    <a>Email: {personInfoState.contact.email}</a>
                    <a>{personInfoState.contact.phone.phoneType + ": " + personInfoState.contact.phone.phoneNumber}</a>
                    <form onSubmit={removePersonHandler} className={userState.isAdmin? "" : classes.hideContent}>
                        <button type="submit">Remove</button>
                        <button onClick={showFormFilled} type="button">Update</button>
                    </form>

            </div>

    }

    const showPersonForm = (show: boolean) => {

        if(!personFormRef.current){
            return;
        }

        show? personFormRef.current.style.display = "block" : personFormRef.current.style.display = "none";

    }

    const showPersonInfo = (show: boolean) => {

        if(!personInfoRef.current){
            return;
        }

        show? personInfoRef.current.style.display = "block" : personInfoRef.current.style.display = "none";

    }

    return <>
                <header>
                    <MapSearch formSubmit={drawSearchResult} personList={personListState}/>
                    <MapZoom zoomHandler={zoomHandler}/>
                    <MapSignout user={userState} setUserState={setUserState}/>
                </header>
                <div ref={personFormRef} className={classes.hideContent}>
                    <PersonForm setPersonListState={setPersonListState}
                                showPersonForm={showPersonForm}
                                personUpdate={personInfoState}
                                personRemove={idToDeleteState}/>
                </div>
                <div ref={personInfoRef} className={classes.hideContent}>
                    {personInfoHandler()}
                </div>
                <canvas ref={canvasRef} height={height} width={width} />
            </>

}

Map.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
}

export default Map;