import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Matter from 'matter-js';
import './neomorphism.css';
import "./main.scss";

import LineSegment from './drawables/LineSegment';

import prepareMap from './functions/prepareMap';
import enableInput from './functions/enableInput';
import beginDrawing from './functions/beginDrawing';
import detectCollisions from './functions/detectCollisions';
import maps from './maps';

import { GameState, Segment } from './entity-types';

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const engine = Matter.Engine.create();
const runner = Matter.Runner.create({});
const world = engine.world;
const gameState: GameState = {
    walls: [],
    goals: [],
    balls: [],
    lines: [[]],
};

const resetGameButton = document.getElementById("reset-game");
const resetLevelButton = document.getElementById("reset-level");
const progressBar = document.getElementById("progressbar");

let currentMapIndex = 0;
const reset = (map: number[][]) => {
    Matter.World.clear(world, false);
    gameState.walls = [];
    gameState.goals = [];
    gameState.balls = [];
    gameState.lines = [[]];
    prepareMap(map, world, gameState);
    progressBar.style.width = `${100 * currentMapIndex / (maps.length - 1)}%`;
}

// Timeout necessary because of ball speed being too high
// on the first load.
setTimeout(() => reset(maps[currentMapIndex]), 100);

resetGameButton.addEventListener("click", () => {
    currentMapIndex = 0;
    reset(maps[currentMapIndex]);
});
resetLevelButton.addEventListener("click", () => reset(maps[currentMapIndex]));

engine.world.gravity.x = 0;
engine.world.gravity.y = 0;
Matter.Runner.run(runner, engine);

beginDrawing(ctx, gameState, canvas.width, canvas.height);

detectCollisions(engine, gameState,
() => {
    // Victory!
    if (currentMapIndex !== maps.length - 1) currentMapIndex++;
    reset(maps[currentMapIndex]);
},
() => {
    // Defeat.
    reset(maps[currentMapIndex]);
},
() => {
    cancelDrawing();
});

const pushSegment = (segment: Segment) => {
    const lineSegment = LineSegment(segment.x1, segment.y1, segment.x2, segment.y2);
    if (lineSegment) {
        gameState.lines[gameState.lines.length-1].push(lineSegment);
        Matter.World.add(world, lineSegment.body);
    }
}

const cancelDrawing = enableInput(canvas, (line) => {
    pushSegment(line[line.length - 1]);
}, (line) => {
    pushSegment(line[line.length - 1]);
    gameState.lines.push([]);
});

document.addEventListener('gesturestart', (e) => {
    // Disable zoom on mobile Safari.
    e.preventDefault();
});

window.alert('InkBall only supports stylus input, touch or mouse is not supported.');

OfflinePluginRuntime.install();
