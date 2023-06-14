// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "./public/tilemaps/nivel1.json");
    this.load.image("tilesFondo", "./public/assets/images/sky.png");
    this.load.image("tilesPlataforma", "./public/assets/images/platform.png");
    this.load.image("tilesPlataformaN", "./public/assets/images/platformN.png");
    this.load.image("ball", "./public/assets/images/pelota.png");
    this.load.image("door", "./public/assets/images/agujero.png");
    this.load.image("star", "./public/assets/images/star.png");
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

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "pelota");
    console.log("spawn point pelota", spawnPoint);
    this.pelota = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "ball")
      .setCircle(20, -5, -3)
      .setScale(1)
      .setVelocity(-200, -200)
      .setMaxVelocity(500, 500)
      .setBounce(1)
      .setCollideWorldBounds(true);

    this.estrellas = this.physics.add.group();

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "door")
      .setCircle(35, -5, -5)
      .setMaxVelocity(0, 0)
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
}
