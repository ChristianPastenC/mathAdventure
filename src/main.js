import Bootloader from './Bootloader.js'

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
    scene: [ Bootloader,
             Levels, 
             Hanoi, Puzzle, Maze,
             Square, Four, Riddle,
           ]
};
const game = new Phaser.Game(config);
