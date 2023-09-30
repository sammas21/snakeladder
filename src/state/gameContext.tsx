import { throws } from 'assert';
import { Dispatch } from 'react';
import { createContext, useReducer, ReactNode, useContext } from 'react';
import { StepMap } from '../services/boardServices';

interface Props {
    children?: ReactNode
}

export type PlayerType = {
    id: string,
    name: string,
    score: number
}

export type GameAction = | { type: 'UPDATE_SCORE'; score: number; }
|{ type: 'RESET'; score: 0};

// type Cell = {
//     id: number,
//     text: string, 
//     players: Player[]
// }

// type Game = {
//     finished : boolean
//     winner: Player
// }

export interface GameState {
    currentPlayerId: number,
    diceNum: number,
    players: PlayerType[],
    positionMap:Map<number, PlayerType[]>,
    finished: boolean,
    winner: PlayerType | null,
}

const GameContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Dispatch<GameAction> | null>(null);
const positionMap:Map<number, PlayerType[]>= new Map();
const initialPlayers : PlayerType[] = [
    {
        id: 'p1',
        name: 'Player1',
        score: 0
    },
    {
        id: 'p2',
        name: 'Player2',
        score: 0
    },
];
const intialGameState: GameState = {
    currentPlayerId: 0,
    diceNum: 0,
    players: [...initialPlayers],
    finished: false,
    winner: null,
    positionMap,
}
const getUpdatePositionMap = (positionMap:Map<number, PlayerType[]>, key:number, preKey:number, player:PlayerType, ) => {
    if(positionMap.has(key)){
        const arr = positionMap.get(key)??[];
        positionMap.set(key, [...arr, player]);
    }else{
        positionMap.set(key, [player]);
    }

    if(positionMap.has(preKey)){
        const arr = (positionMap.get(preKey)??[]).filter(p=> p.id!==player.id);
        if(arr.length===0) positionMap.delete(preKey);
        else  positionMap.set(preKey, arr);
    }

    return positionMap;
}



function gameReducer(state: GameState, action: GameAction): GameState {
    const { score, type } = action;
    switch (type) {
        case "UPDATE_SCORE":
            const playerId: number = state.currentPlayerId;
            const players: PlayerType[] = [...state.players]
            const player: PlayerType = {...players[playerId]};
            
            console.log("player", player, score);
            let projectedScore: number = player.score + score;
            let winner = null;
            let finished: boolean = state.finished;
            let positionMap = state.positionMap;
            if (projectedScore <= 100) {
                projectedScore += StepMap.get(`${projectedScore}`)??0;
                positionMap = getUpdatePositionMap(state.positionMap, projectedScore, player.score,player);
                player.score = projectedScore;
                if (projectedScore == 100) {
                    finished = true;
                    winner = player;
                }
                
            }
            if(player.score===100 && !finished) throw new Error("Invalid game state");
            players[playerId] = player;
            const currentPlayerId = (playerId + 1) % state.players.length;
            
            const newState = {
                ...state,
                finished,
                winner,
                players,
                currentPlayerId,
                diceNum: score,
                positionMap
            }
            return newState;
        case "RESET":
            return {...intialGameState, players: intialGameState.players, positionMap:new Map()};
        default:
            return state;
    }
}

export function useGame() {
    const gameState = useContext(GameContext);
    if (gameState === null) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return gameState;
}

export function useGameDispatch() {
    const dispatch = useContext(GameDispatchContext);
    if (dispatch === null) {
        throw new Error('useGameDispatch must be used within a GameProvider');
    }
    return dispatch;
}

export function GameProvider({ children }: Props) {
    const [game, dispatch] = useReducer(gameReducer, intialGameState);

    return (
        <GameContext.Provider value={game}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    );
}




