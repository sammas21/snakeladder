import React, {ReactNode} from 'react';
import './Cell.css';
import { useGame } from '../../state/gameContext';
import { Player } from '../player/Player';

interface Props {
    children?: ReactNode,
    num: number,
    key: string,
    specialValue: number
}
type PlayerType = {
    id: string,
    name: string,
    score: number
}

export const Cell = ({children, num, key, specialValue}: Props) => {
    const {positionMap}=useGame();

    const getPlayerIfExists = (positionMap:Map<number, PlayerType[]>, key: number) => {
        if(positionMap.has(key)){
            return (positionMap.get(key)??[]).map(player=><Player playerId={player.id}></Player>)
        }
    }

    const getSpecialElement = (val:number) => {
        if(val!==0) return val>0 ? <div className='step positive-step'>{val}</div>:<div className='step negative-step'>{val}</div>
    }

    return(
        <div className='container-cell'>
            <div className='Cell' key={key}>{num}</div>
            <div className='Cell overlay'><>{getPlayerIfExists(positionMap, num)}{getSpecialElement(specialValue)}</></div>
        </div>
        
    )
} 