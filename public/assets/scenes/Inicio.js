export default class Inicio extends Phaser.Scene {
    constructor() {
      super("Inicio");
    }
    
    create() {
      this.add.image(400, 300, "Inicio").setScale(1);
      this.add.image(400, 510, "Comenzar").setScale(1).setInteractive()
      .on("pointerdown", () => this.scene.start("Controles"));
    }
  }