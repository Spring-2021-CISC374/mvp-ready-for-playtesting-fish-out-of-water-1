import { Scene } from "phaser";
import Enemy from "./Enemy";
import PlayerCharacter from "./PlayerCharacter";
import Unit from "./Unit";

export default class HealthBar extends Phaser.GameObjects.Container {
    healthGauge: Phaser.GameObjects.Image;
    healthBar: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
    barDisplace: number = 500;
    fullBar: number = 110;
    xCoord: number;
    yCoord: number;

    constructor(scene: Phaser.Scene, x, y, entity)
    {
        super(scene);
        this.scene.add.existing(this);

        this.xCoord = x;
        this.yCoord = y;

        this.healthGauge = new Phaser.GameObjects.Image(scene, x + 5, y, 'shadowbar');
        this.healthBar = new Phaser.GameObjects.Image(scene, x + 5, y + 22, 'healthbar');
        this.nameText = new Phaser.GameObjects.Text(scene, -150, -140, "", { color:'#000000', fontSize: '30pt', fontStyle: 'bold', fontFamily: 'Aniron' } );

        this.healthGauge.setScale(1.5);
        this.healthBar.setScale(1.5);

        if (entity instanceof Enemy) {
            this.healthBar.setTintFill(0xbf0a00);
            this.barDisplace = 120;
        } else {
            this.healthBar.setTintFill(0x4feb70);
        }

        this.healthBar.setCrop(this.xCoord - this.barDisplace, 0, this.fullBar, this.yCoord);

        this.add(this.healthGauge);
        this.add(this.healthBar);
        this.add(this.nameText);

    }

    update(character: Unit)
    {
        this.nameText.text = character.name;

        var healthPercentage = character.getHP() / character.getMaxHP();
        this.healthBar.setCrop(this.xCoord - this.barDisplace, 0, this.fullBar * healthPercentage, this.yCoord);
    }

}