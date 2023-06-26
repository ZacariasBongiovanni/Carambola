// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }
  
  create() {

    const map = this.make.tilemap({ key: "map" });

    const capaFondo = map.addTilesetImage("sky", "tilesFondo");
    const capaPlataformas = map.addTilesetImage("platform", "tilesPlataforma");
    const capaDaño = map.addTilesetImage("platformN", "tilesPlataformaN");

    const fondoLayer = map.createLayer("fondo", capaFondo, 0, 0);
    const plataformaLayer = map.createLayer(
      "plataformas",
      capaPlataformas,
      0,
      0
    );
    const dañoLayer = map.createLayer("Daño", capaDaño, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");

    plataformaLayer.setCollisionByProperty({ colision: true });
    dañoLayer.setCollisionByProperty({ colision: true });

    console.log(objectosLayer);

    this.jugador = this.physics.add
    .sprite(235, 125, "Cañon")
    .setVelocity(0,0)
    .setMaxVelocity(0,0)
    

    /* let spawnPoint = map.findObject("objetos", (obj) => obj.name === "pelota");
    console.log("spawn point pelota", spawnPoint);
    this.pelota = this.physics.add 
      .sprite(spawnPoint.x, spawnPoint.y, "ball")
      
      .setCircle(20, -5, -3)
      .setScale(1)
      .setVelocity(-200, -200)
      .setMaxVelocity(500, 500)
      .setBounce(1)
      .setCollideWorldBounds(true); */

      

   this.pelota = this.physics.add.group({
      defaultKey: 'ball',
      maxSize: 2,
    }); 

    this.estrellas = this.physics.add.group();

     let spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "door")
      .setCircle(200, 170, -5)
      .setMaxVelocity(0, 0)
      .setScale(0.1);

    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "estrella": {
          const star = this.estrellas.create(x, y, "star");
          break;
        }
      }
    });

    this.add.image(400, 20, "barra").setScale(1);
    this.add.image(760, 30, "Opciones").setScale(0.8).setInteractive()
    this.score = 4;
    this.scoreText = this.add.text(20, 20, "Tiros Disponibles: " + this.score, {
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#000000",
    });

    this.scoreText = this.add.text(600, 20, "Mapa: 1" , {
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#000000",
    });

    this.time.addEvent({
      delay: 500,
      callback: this.oneSecond,
      callbackScope: this,
      loop: true,
    });

    this.timer = 0;
    this.timerText = this.add.text(350, 20, "Tiempo: " + this.timer, {
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#000000",
    });





    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.pelota, plataformaLayer);
    this.physics.add.collider(this.pelota, dañoLayer);
    this.physics.add.collider(this.salida, dañoLayer);
    this.physics.add.collider(this.jugador, dañoLayer);
    this.physics.add.collider(this.jugador, plataformaLayer);
    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.collider(this.pelota, dañoLayer, this.Daño, null, this);
    this.physics.add.collider(this.pelota, this.salida, this.win, null, this);
    this.physics.add.collider(this.estrellas, plataformaLayer);
    this.physics.add.overlap(
      this.pelota,
      this.estrellas,
      this.juntarestrellas,
      null,
      this
    );

    
    this.anims.create({
      key: "space",
      frames: this.anims.generateFrameNumbers("Cañon", { start: 1, end: 2}),
      frameRate: 20,
     
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("Cañon", { start: 0, end: 0}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("Cañon", { start: 0, end:0}),
      frameRate: 10,
      repeat: -1,
    });

  
  }
  update(){
    
    if (this.input.keyboard.checkDown(this.cursors.space,250)){
      this.jugador.setVelocity(0,0);
      this.jugador.anims.play("space", true);
      this.fire(this.jugador);
    } 


    if (this.cursors.left.isDown){
      this.jugador.anims.play("left", true);
      this.jugador.rotation--;
      
    }
    else if (this.cursors.right.isDown){
      this.jugador.anims.play("right", true);
      this.jugador.rotation++;

    } 
  
  } 

  win() {
    this.scene.start("juego3");
  }

  juntarestrellas(pelota, estrella) {
    estrella.disableBody(true, true);
  }
  Daño() {
    this.scene.start("juego");
  }

   fire(object){
    let pelota = this.pelota.get(object.x+17, object.y-30);
    if (pelota){
      pelota.setActive(true);
      pelota.setVisible(true);
      pelota.setBounce(1);
      pelota.setScale(0.1);
      pelota.setCircle(150, -15, -25)
      pelota.body.velocity.y = 150;
      pelota.body.velocity.x = -150;
      
    }
  }

  oneSecond() {
    this.timer++;
    this.timerText.setText("Tiempo " + this.timer);
    if (this.timer <= 0) {
      /* this.gameOver = true; */
    }
  }


}
