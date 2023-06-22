export default class juego3 extends Phaser.Scene {
  constructor() {
    super("juego3");
  }

  create() {
    const map = this.make.tilemap({ key: "map3" });

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

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "pelota");
    console.log("spawn point pelota", spawnPoint);
    this.pelota = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "ball")
      .setScale(1)
      .setVelocity(300, -370)
      .setMaxVelocity(-300, 500)
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
}
