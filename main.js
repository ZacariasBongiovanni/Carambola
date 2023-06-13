import Juego from "./public/assets/scenes/Juego.js";
import Ganar from "./public/assets/scenes/Ganar.js";
import juego3 from "./public/assets/scenes/juego3.js";


// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Juego,Ganar,juego3],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
