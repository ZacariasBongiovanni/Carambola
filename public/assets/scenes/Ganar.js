export default class Ganar extends Phaser.Scene {
    constructor() {
      super("Ganar");
    }
    preload(){
      this.load.image("ganar", "./public/assets/images/victoria.png");
    }
    create() {
      this.add.image(400, 300, "ganar")
        .setInteractive()
        .on("pointerdown", () => this.scene.start("juego"));
    }
  }