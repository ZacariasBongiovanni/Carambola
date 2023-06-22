export default class Ganar extends Phaser.Scene {
    constructor() {
      super("Ganar");
    }
   
    create() {
      this.add.image(400, 300, "ganar")
        .setInteractive()
        .on("pointerdown", () => this.scene.start("juego"));
    }
  }