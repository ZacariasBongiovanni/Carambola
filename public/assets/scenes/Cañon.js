export default class Cañon extends Phaser.Scene{
    constructor(){
        super("Cañon");
    }
    create (){
        

        let cannon = this.add.image(400, 350, 'cañon').setDepth(1);
      
        let pelota = this.physics.add.sprite(cannon.x, cannon.y - 0, 'ball').setScale(0.2);
        

        pelota.disableBody(true, true);

        let angle = 0;

        this.input.on('pointermove', (pointer) =>
        {
            angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
            cannon.rotation = angle;
           
        });

        this.input.on('pointerup', () =>
        {
            pelota.enableBody(true, cannon.x, cannon.y - 0, true, true);
         
            this.physics.velocityFromRotation(angle, 600, pelota.body.velocity);
        });
    }
}

