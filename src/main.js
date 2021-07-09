import Bootloader from './Bootloader.js'
import Levels from './scenes/Levels.js'
import Hanoi from './scenes/Hanoi.js'
import Puzzle from './scenes/Puzzle.js'
import Maze from './scenes/Maze.js'
import Square from './scenes/Square.js'
import Four from './scenes/Four.js'
import Riddle from './scenes/Riddle.js'
import Last from './scenes/Last.js'
import SliderPlugin from '../node_modules/phaser3-rex-plugins/plugins/slider-plugin.js'

const config = {
    title: "Math Adventure", //Nombre del juego (opcional)
    version: "3.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1000,
        height: 450,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        global: [{
            key: 'rexSlider',
            plugin: SliderPlugin,
            start: true
    	}]
    },
    backgroundColor: "#111111",
    //pixelArt: true,
    physics: {
        default: 'arcade',
        "arcade": {
            gravity: {
                //y: 650
            },
            //debug: true,
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [ Bootloader, Levels, 
             Hanoi, Puzzle, Maze,
             Square, Four, Riddle,
             Last,
           ]
};
const game = new Phaser.Game(config);
