import { GAME_CONFIG } from "../config/game";

export const fun = () => {};


const steps = GAME_CONFIG.SNAKE_LADDER_MAP;
export const StepMap = new Map(Object.entries(steps));