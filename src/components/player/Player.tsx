import React, { ReactNode } from "react";
import './Player.css';

interface Props {
    children?: ReactNode,
    playerId: string
}



export const Player = ({playerId}: Props) => {
    return (
        <div className="Player">{playerId}</div>
    )
}