import React, { useState } from "react";
import { Dice } from "../dice/Dice";
import { onRollDice } from "../../services/diceServices";
import { useGame, useGameDispatch } from "../../state/gameContext";

// interface Props {
//     children?: ReactNode,
// }

export const DiceSection = () => {



    const dispatch = useGameDispatch();
    const {diceNum, finished} = useGame(); 

    const handleClick = () => {
        const n = onRollDice();
        dispatch({score:n, type:"UPDATE_SCORE"});
    }

    const handleReset = () => {
        const n = onRollDice();
        dispatch({score:0, type:"RESET"});
    }

    return (
        <div className="Dice-section">
            {!finished && <Dice diceCount={diceNum}></Dice>}
            {!finished && <button onClick={handleClick}>Roll Dice</button>}
            {finished && <button onClick={handleReset}>Start New</button>}
        </div>
       
    )
}