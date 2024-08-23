"use client"

import Guesses from "./guesses";
import Scoreboard from "./scoreboard";
import Camera from "../setup/camera";
import Canvas from "./gameCanvas";
import { useEffect, useState } from "react"
import MultiplayerClient from "../setup/multiplayerClient";

export default function Game(){
    //Timer
    const [time, setTime] = useState(120);
    useEffect(() => {
        const timer = setInterval(()=> {
            setTime(time - 1);
        }, 1000);
        if (time === 0) {
            return clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [time]);

    //Copy Button
    const [buttonText, setButtonText] = useState('Invite the Homies')
    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href)
        setButtonText('Copied!')
        setTimeout(() => {
            setButtonText('Copy to Clipboard')
        }, 1000);
    }

    //Coordinates
    const getCoords = (coords, colors, clearCanvas) => {
        setLandmarkCoords(coords);
        setColors(colors);
        setClearCanvas(clearCanvas);
    }
    const [colors, setColors] = useState({});
    const [landmarkCoords, setLandmarkCoords] = useState({});
    const [clearCanvas, setClearCanvas] = useState(false);

    return (
        <div className="w-full min-w-[1024px] min-h-screen max-h-screen flex justify-content  p-24">
            <MultiplayerClient></MultiplayerClient>
            <div className="w-1/5 flex flex-col">
                <Scoreboard></Scoreboard>
                <Camera startCamera={true} getCoords={getCoords}></Camera>
            </div> 
            <div className="p-10 pt-0 w-3/5 h-full flex flex-col items-center">
                <Canvas coords={landmarkCoords} colors={colors} clearCanvas={clearCanvas}></Canvas>
                <div className='text-center'>{time}</div>
            </div> 
            <div className="w-1/5 h-full flex flex-col items-center">
                <Guesses></Guesses>
                <button className='w-48 text-center p-2 border-4 border-black rounded-lg mt-5' onClick={()=>copyURL()}>{buttonText}</button>
            </div> 
        </div>
    );
}