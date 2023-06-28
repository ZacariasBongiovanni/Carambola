export default class Mapas extends Phaser.Scene {
    constructor() {
      super("Mapas");
    }
   
    create() {
      this.add.image(400, 300, "Mapas").setScale(1);
      this.add.image(210, 160, "M1").setScale(1).setInteractive()
      .on("pointerdown", () => this.scene.start("juego"));
      this.add.image(440, 160, "M2b").setScale(1).setInteractive()
      /* .on("pointerdown", () => this.scene.start("juego3")); */
      this.add.image(665, 160, "M3b").setScale(1).setInteractive()
      /* .on("pointerdown", () => this.scene.start("juego4")); */
      this.add.image(210, 430, "M4b").setScale(1).setInteractive()
      /* .on("pointerdown", () => this.scene.start("juego5")); */
      this.add.image(440, 430, "M5b").setScale(1).setInteractive()
     /*  .on("pointerdown", () => this.scene.start("juego6")); */
      this.add.image(665, 430, "M6b").setScale(1).setInteractive()
      /* .on("pointerdown", () => this.scene.start("juego7")); */
      this.add.image(35, 40, "teclado").setScale(0.1).setInteractive()
      .on("pointerdown", () => this.scene.start("Controles"));
      this.add.image(210,220, "Estrellab").setScale(1);
      
      
    }
  }