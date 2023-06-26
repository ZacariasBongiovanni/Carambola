export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    preload() {
        this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
        this.load.image("tilesFondo", "./public/assets/images/sky.png");
        this.load.image("tilesPlataforma", "./public/assets/images/platform.png");
        this.load.image("tilesPlataformaN", "./public/assets/images/platformN.png");
        this.load.image("ball", "./public/assets/images/pelota.png");
        this.load.image("door", "./public/assets/images/agujero.png");
        this.load.image("star", "./public/assets/images/star.png");
        this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel3.json");
        this.load.image("Inicio", "./public/assets/images/Inicio.png");
        this.load.image("Comenzar","./public/assets/images/Comenzar.png");
        this.load.image("Controles", "./public/assets/images/Controles.png");
        this.load.image("Siguiente", "./public/assets/images/Siguiente.png");
        this.load.image("Mapas", "./public/assets/images/Mapas.png");
        this.load.image("Opciones", "./public/assets/images/Opciones.png");
        this.load.image("Estrella1", "./public/assets/images/Estrella1.png");
        this.load.image("Estrella2", "./public/assets/images/Estrella2.png");
        this.load.image("Estrella3", "./public/assets/images/Estrella3.png");
        this.load.image("Estrellab", "./public/assets/images/Estrellab.png");
        this.load.image("M1", "./public/assets/images/M1.png");
        this.load.image("M2", "./public/assets/images/M2.png");
        this.load.image("M3", "./public/assets/images/M3.png");
        this.load.image("M4", "./public/assets/images/M4.png");
        this.load.image("M5", "./public/assets/images/M5.png");
        this.load.image("M6", "./public/assets/images/M6.png");
        this.load.image("M2b", "./public/assets/images/M2b.png");
        this.load.image("M3b", "./public/assets/images/M3b.png");
        this.load.image("M4b", "./public/assets/images/M4b.png");
        this.load.image("M5b", "./public/assets/images/M5b.png");
        this.load.image("M6b", "./public/assets/images/M6b.png");
        this.load.image("ganar", "./public/assets/images/victoria.png");
        this.load.image("barra","./public/assets/images/Barra.png");
        this.load.image("teclado","./public/assets/images/teclado.png");
        this.load.image("opcion","./public/assets/images/opcion.png");
        this.load.spritesheet("Cañon", "./public/assets/images/Cañon3.png",{
            frameWidth: 40,
            frameHeight: 61,
          });
    } 

    create(){
        this.scene.start("Inicio")
    }
}
   