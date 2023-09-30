import React from "react";
import { useGame } from "../../state/gameContext";
import './PlayerSection.css';

// interface Props {
//     children?: ReactNode,
// }

export const PlayerSection = () => {

    const {players, winner, currentPlayerId} = useGame(); 

    return (
        <div className="Player-section">
           {
            players.map((player, index)=>
                <div className={currentPlayerId===index?'active':'normal'}>
                    {player.name} - Score : {player.score}
                </div>
            )
           }
           {
            winner && <div> {winner.name} won the game</div>
           }
        </div>
    )
}