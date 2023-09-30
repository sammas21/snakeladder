import React from "react";
import { GAME_CONFIG } from "../../config/game";
import { Cell } from "../cell/Cell";

export function Grid(){

    const GRIDLEN = GAME_CONFIG.GRID_LENGTH;
    const steps = GAME_CONFIG.SNAKE_LADDER_MAP;
    const map = new Map(Object.entries(steps));

    const generateBoardLayout = (len: number) => {
        const board: JSX.Element[] = [];
        for(let i = len-1; i>=0; i--){
            if(i%2==1){
                for( let j=len; j>0; j--){
                    let n = i*10+j;
                    board.push(<Cell key={`cell-${n}`} num={n} specialValue={map.get(`${n}`)??0}></Cell>)
                }
            }else{
                for( let j=1; j<=len; j++){
                    let n = i*10+j;
                    board.push(<Cell key={`cell-${n}`} num={n} specialValue={map.get(`${n}`)??0}></Cell>)
                }
            }
            
            board.push(<br/>)
        }
        return board;
    }


    return (
        <div className="Grid">
            {
               generateBoardLayout(GRIDLEN) 
            }
        </div>

    )

}