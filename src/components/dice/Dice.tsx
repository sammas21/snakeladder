import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode,
    diceCount: number
}



export const Dice = ({diceCount}: Props) => {
    return (
        <div className="Dice">{diceCount}</div>
    )
}