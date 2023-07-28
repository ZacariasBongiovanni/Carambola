/*  export default class Cañon extends Phaser.Scene {
    constructor() {
      super("Cañon");
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
      //const dañoLayer = map.createLayer("Daño", capaDaño, 0, 0);
  
      const objectosLayer = map.getObjectLayer("objetos");
  
      plataformaLayer.setCollisionByProperty({ colision: true });
      //dañoLayer.setCollisionByProperty({ colision: true });
  
      console.log(objectosLayer);
  
      this.jugador = this.physics.add
      .sprite(235, 125, "Cañon")
      .setVelocity(0,0)
      .setMaxVelocity(0,0)
  
    /*    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "pelota");
      console.log("spawn point pelota", spawnPoint);
      this.pelota = this.physics.add
        .sprite(spawnPoint.x, spawnPoint.y, "ball")
        .setScale(1)
        .setVelocity(300, -370)
        .setMaxVelocity(-30, 50)
        .setBounce(1)
        .setCollideWorldBounds(true);  
  
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
      this.score = 0;
      this.scoreText = this.add.text(20, 20, "Tiros Disponibles " + this.score, {
        fontSize: "20px",
        fontStyle: "bold",
        fill: "#000000",
      });
  
      this.scoreText = this.add.text(600, 20, "Mapa " + this.score, {
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
      this.timerText = this.add.text(350, 20, "Tiempo " + this.timer, {
        fontSize: "20px",
        fontStyle: "bold",
        fill: "#000000",
      });
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      this.physics.add.collider(this.pelota, plataformaLayer);
      this.physics.add.collider(this.salida, plataformaLayer);
      // this.physics.add.collider(this.pelota, dañoLayer, this.Daño, null, this);
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
  
      this.canShoot = true;
    }
    
  
    update(){

        // Lógica para controlar cuándo el jugador puede disparar
     if (this.input.keyboard.checkDown(this.cursors.space, 250) && this.canShoot) {
     this.jugador.setVelocity(0, 0); // Detener al jugador temporalmente al disparar
     this.jugador.anims.play("space", true);
     this.fire(this.jugador);
     this.canShoot = false; // El jugador no puede disparar hasta que la pelota se detenga o salga de la pantalla
    }
      
    // Código para el movimiento del jugador
        const velocidadMovimiento = 5;

     if (this.cursors.left.isDown) {
     this.jugador.rotation -= 0.05;
     } else if (this.cursors.right.isDown) {
     this.jugador.rotation += 0.05;
     }

     const velocidadX = Math.cos(this.jugador.rotation) * velocidadMovimiento;
     const velocidadY = Math.sin(this.jugador.rotation) * velocidadMovimiento;

    } 
  
    win() {
      this.scene.start("Ganar");
    }
  
    juntarestrellas(pelota, estrella) {
      estrella.disableBody(true, true);
    }
    Daño() {
      this.scene.start("juego3");
    }
  
    fire(object){
      // Código para disparar la pelota
        const velocidadDisparoX = 500;
        const velocidadDisparoY = 500;

        // Calcula las componentes de velocidad horizontal y vertical en función de la rotación del jugador
        const velocidadX = Math.cos(this.jugador.rotation) * velocidadDisparoX;
        const velocidadY = Math.sin(this.jugador.rotation) * velocidadDisparoY;

        // Crea la pelota en la posición del jugador y establece sus características
         let pelota = this.pelota.get(object.x +10 , object.y -1);
         if (pelota) {
         pelota.setActive(true);
         pelota.setVisible(true);
         pelota.setBounce(1);
         pelota.setScale(0.1);
         pelota.setCircle(150, -15, -25);

        // Establece las velocidades horizontal y vertical de la pelota para dispararla en la dirección del jugador
        pelota.setVelocity(velocidadX, velocidadY);

        pelota.setCollideWorldBounds(true);
        pelota.setBounce(1, 1); // Ajusta el valor de rebote para controlar la colisión con los límites del mundo

        // Cuando la pelota se detiene o sale de la pantalla, el jugador puede disparar nuevamente
        pelota.on('animationcomplete', () => {
        this.canShoot = true;
        });
    }
    }
  
    oneSecond() {
      this.timer++;
      this.timerText.setText("Tiempo " + this.timer);
      if (this.timer <= 0) {
         this.gameOver = true; 
      }
    }
  }  */
