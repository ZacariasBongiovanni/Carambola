import Inicio from "./public/assets/scenes/Inicio";
import Juego from "./public/assets/scenes/Juego";
import juego4 from "./public/assets/scenes/Juego4";
import Preload from "./public/assets/scenes/Preloard";
import juego3 from "./public/assets/scenes/juego3";
import juego5 from "./public/assets/scenes/juego5";

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
  scene: [Preload, Inicio,Juego,juego3,juego4,juego5 ],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
