export default class juego3 extends Phaser.Scene {
 
    constructor() {
     
      super("juego3");
    }
  
    preload() {
      this.load.tilemapTiledJSON("map3", "./public/tilemaps/nivel3.json");
      this.load.image("tilesFondo", "./public/assets/images/sky.png");
      this.load.image("tilesPlataforma","./public/assets/images/platform.png");
      this.load.image("tilesPlataformaN","./public/assets/images/platformN.png");
      this.load.image("ball", "./public/assets/images/pelota.png");
      this.load.image("door","./public/assets/images/agujero.png");
      this.load.image("star","./public/assets/images/star.png")
      
    }
  
    create() {
      
      const map = this.make.tilemap({ key: "map3" });
  
      const capaFondo = map.addTilesetImage("sky", "tilesFondo");
      const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
   
      const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
      const plataformaLayer = map.createLayer(
        "plataformas",
        capaPlataformas,
        0,
        0
      );
      
      const objectosLayer = map.getObjectLayer("objetos");
  
      plataformaLayer.setCollisionByProperty({ colision: true });
  
      console.log(objectosLayer);
  
      let spawnPoint = map.findObject("objetos", (obj) => obj.name === "pelota");
      console.log("spawn point pelota", spawnPoint);
      this.pelota = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "ball")
        .setScale(1)
        .setVelocity(300, -370)
        .setBounce(1)
        .setCollideWorldBounds(true);
      this.estrellas = this.physics.add.group();
  
      spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
      console.log("spawn point salida ", spawnPoint);
      this.salida = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "door")
        .setScale(1);
      
      
      objectosLayer.objects.forEach((objData) => {
      
        const { x = 0, y = 0, name } = objData;
        switch (name) {
          case "estrella": {
            const star = this.estrellas.create(x, y, "star");
            break;
          }
        }
      });
  
    
      this.physics.add.collider(this.pelota, plataformaLayer);
      this.physics.add.collider(this.salida,plataformaLayer);
      this.physics.add.collider(this.pelota,this.salida,this.win, null, this);
      this.physics.add.collider(this.estrellas,plataformaLayer);
      /* this.physics.add.collider(this.pelota,this.estrellas,this.juntarestrellas,null,this); */
  
    }
  
    win(){
      this.scene.start("Ganar")
    }
  
    juntarestrellas(pelota,estrella){
      estrella.disableBody(true, true);
  
    }
  }
  