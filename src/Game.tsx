import React from 'react';
import './App.css';
import { Grid } from './components/grid/Grid';
import { PlayerSection } from './components/player-section/PlayerSection';
import { DiceSection } from './components/dice-section/DiceSection';

function Game() {
  return (
    <div className="App">
      <header className="App-header">
        Snake & Ladders 2.0

        {/* section for playing board */}
        <div>
          <Grid></Grid>
        </div>

        <div>
          {/* this section will have player's */}
          <PlayerSection></PlayerSection>

          {/* section for dice roll animation and roll button */}
          <DiceSection></DiceSection>
        </div>
      </header>
    </div>
  );
}

export default Game;