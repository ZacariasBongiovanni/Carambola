export default class Controles extends Phaser.Scene {
    constructor() {
      super("controles");
    }
   
    create() {
      this.add.image(400, 300, "Controles").setScale(1);
      this.add.image(750, 35, "Siguiente").setScale(1).setInteractive()
      .on("pointerdown", () => this.scene.start("Mapas"));

    }
  }