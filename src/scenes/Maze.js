class Maze extends Phaser.Scene {
    
    constructor(){
        super({
            key: "Maze"
        });
    }

    init(data){
        console.log('Maze Scene');
        // ============================================================================
        // Personaje seleccionado como parametro
        // ============================================================================
        this.personajeAct = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
    }

    preload(){
        // ============================================================================
        // Variables de control
        // ============================================================================
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.ref = 0;
        if(this.personajeAct == 'pirata_1'){
            this.ref = 1;
        }else if(this.personajeAct == 'pirata_2'){
            this.ref = 2;
        }else{
            this.ref = 3;
        }
    }

    create(){
        const eventos = Phaser.Input.Events;
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'mazeBack');
        //Laberinto
        this.grupoMuro = this.physics.add.group();
        this.grupoMuro.create(this.scale.width/2,20,'wallH').setScale(2,1);
        this.grupoMuro.create(this.scale.width/2,430,'wallH').setScale(2,1);
        this.grupoMuro.create(940,275,'wallV').setScale(1,.75);
        this.grupoMuro.create(60,175,'wallV').setScale(1,.75);
        this.grupoMuro.create(300,365,'wallV').setScale(1,.35);
        this.grupoMuro.create(500,365,'wallV').setScale(1,.35);
        this.grupoMuro.create(700,400,'wallV').setScale(1,.2);
        this.grupoMuro.create(270,300,'wallH').setScale(.2,1);
        this.grupoMuro.create(730,340,'wallH').setScale(.2,1);
        this.grupoMuro.create(80,350,'wallH').setScale(.15,1);
        this.grupoMuro.create(350,200,'wallH').setScale(1.3,1);
        this.grupoMuro.create(400,265,'wallV').setScale(1,.35);
        this.grupoMuro.create(910,290,'wallH').setScale(.2,1);
        this.grupoMuro.create(430,155,'wallV').setScale(1,.25);
        this.grupoMuro.create(630,230,'wallV').setScale(1,.2);
        this.grupoMuro.create(752,110,'wallH').setScale(.9,1);
        this.grupoMuro.create(330,110,'wallH').setScale(.5,1);
        this.grupoMuro.create(760,280,'wallV').setScale(1,.3);
        this.grupoMuro.children.iterate( (p) => {
            p.setImmovable(true);
            p.body.allowGravity = false;
            p.body.setOffset(0,0);
        });
        this.endPoint = this.add.rectangle(950,65,40,50);
        this.physics.add.existing(this.endPoint);
        this.endPoint.body.setAllowGravity(false);
        this.endPoint.body.setImmovable(true);
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        //Botones de movimiento
        this.btnUp = this.add.image(920,340,'btnUp').setScale(0.8).setInteractive().setDepth(2);
        this.btnDown = this.add.image(920,420,'btnDown').setScale(0.8).setInteractive().setDepth(2);
        this.btnLeft = this.add.image(870,380,'btnPrev').setScale(0.8).setInteractive().setDepth(2);
        this.btnRight = this.add.image(970,380,'btnNext').setScale(0.8).setInteractive().setDepth(2);
        //Personaje
        this.personaje = this.physics.add.sprite(70,this.scale.height-70,this.personajeAct).setScale(0.35).setInteractive();
        this.personaje.setCollideWorldBounds(true);
        this.personaje.body.setMaxVelocity(100);
        this.personaje.body.setAllowGravity(false);
        this.personaje.body.setSize(100, 100);
        this.personaje.body.setOffset(80, 100);
        //Botones externos
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        this.btnRestart = this.add.image(30,30,'btnReload').setScale(.7).setInteractive();
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"});
        this.coin = this.add.sprite(540,20,'coin').setScale(.5);
        this.authomaticTweens();
        //Informacion del juego
        this.container6 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal6 = this.add.image(0,0,'modal');
        this.closeModal6 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText6 = this.add.text(-320, -100, 
                        '\n    Un laberinto es un juego estilo rompecabezas, con \n'+
                        '       diversos grados de complejidad. El objetivo del \n'+
                        '  laberinto es encontrar el camino desde la entrada hasta\n'+
                        '   la salida. Entrenan la capacidad de pensar de forma \n'+
                        '             lógica y la toma óptima de decisiones.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container6.add([
            this.modal6, this.closeModal6, this.infoText6,
        ]);
        this.container6.setVisible(false);
        // ============================================================================
        // Función de botones principales
        // ============================================================================
        //Movimiento hacia arriba
        this.btnUp.on('pointerover', () => { this.btnUp.setScale(0.9); this.upPressed = true; });
        this.btnUp.on('pointerout', () => { this.btnUp.setScale(0.8); this.upPressed = false; });
        this.btnUp.on('pointerup', () => { this.upPressed = true; });
        //Movimiento hacia abajo
        this.btnDown.on('pointerover', () => { this.btnDown.setScale(0.9); this.downPressed = true; });
        this.btnDown.on('pointerout', () => { this.btnDown.setScale(0.8); this.downPressed = false; });
        this.btnDown.on('pointerup', () => { this.downPressed = true; });
        //Movimiento a la Izquierda
        this.btnLeft.on('pointerover', () => { this.btnLeft.setScale(0.9); this.leftPressed = true; });
        this.btnLeft.on('pointerout', () => { this.btnLeft.setScale(0.8); this.leftPressed = false; });
        this.btnLeft.on('pointerup', () => { this.leftPressed = true; });
        //Movimiento a la Derecha
        this.btnRight.on('pointerover', () => { this.btnRight.setScale(0.9); this.rightPressed = true; });
        this.btnRight.on('pointerout', () => { this.btnRight.setScale(0.8); this.rightPressed = false; });
        this.btnRight.on('pointerup', () => { this.rightPressed = true; });
        // ============================================================================
        // Manejo de Colisiones
        // ============================================================================
        this.physics.add.collider(this.personaje, this.grupoMuro);
        this.physics.add.collider(this.personaje,this.endPoint, () => {
            this.leftPressed = false;
            this.upPressed = false;
            this.downPressed = false;
            this.rightPressed = false;
            this.win();
        });
        // ============================================================================
        // Función de botones
        // ============================================================================
        //Boton de reinicio
        this.btnRestart.on('pointerover', () => { this.btnRestart.setScale(0.8); });
        this.btnRestart.on('pointerout', () => { this.btnRestart.setScale(0.7); });
        this.btnRestart.on('pointerup', () => { this.personaje.x = 70; this.personaje.y = this.scale.height-70; });
        //Boton de salida
        this.btnExit.on('pointerover', () => { this.btnExit.setScale(0.8); });
        this.btnExit.on('pointerout', () => { this.btnExit.setScale(0.7); });
        this.btnExit.on('pointerup', () => {
            this.scene.start('Levels', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        //Boton de ayuda
        this.btnInfo.on('pointerover', () => { this.btnInfo.setScale(0.8); });
        this.btnInfo.on('pointerout', () => { this.btnInfo.setScale(0.7); });
        this.btnInfo.on('pointerup', () => { this.container6.setVisible(true); });
        //Boton que cierra el modal
        this.closeModal6.on('pointerover', () => { this.closeModal6.setScale(0.8); });
        this.closeModal6.on('pointerout', () => { this.closeModal6.setScale(0.75); });
        this.closeModal6.on('pointerup', () => { this.container6.setVisible(false); });
    }

    update(){
        if(this.downPressed == true){
            this.personaje.anims.play('walk'+this.ref, true);
            this.personaje.body.velocity.y += 20;
            !this.personaje.flipX ?
                 this.personaje.setAngle(90): this.personaje.setAngle(-90);
        }else if(this.leftPressed == true){
            this.personaje.anims.play('walk'+this.ref, true);
            this.personaje.body.velocity.x -= 20;
            this.personaje.flipX = true;
            this.personaje.setAngle(0);
        }else if(this.rightPressed == true){
            this.personaje.anims.play('walk'+this.ref, true);
            this.personaje.body.velocity.x += 20;
            this.personaje.flipX = false;
            this.personaje.setAngle(0);
        }else if(this.upPressed == true){
            this.personaje.anims.play('walk'+this.ref, true);
            this.personaje.body.velocity.y -= 20;
            this.personaje.flipX ?
                 this.personaje.setAngle(90): this.personaje.setAngle(-90);
        }else{
            this.personaje.anims.play('walk'+this.ref, false);
            this.personaje.body.velocity.x = 0;
            this.personaje.body.velocity.y = 0;
        }
    }
    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    authomaticTweens(){
        this.add.tween({
            targets: [this.coin],
            loop: -1,
            onStart: (tween, obj, target) => {
                obj[0].anims.play('rotate',true);
            },
        });
    }
    // ============================================================================
    // Muestra mensaje ganador y regresa a la escena de islas
    // ============================================================================
    win(){
        let auxTxt = this.add.text(this.scale.width/2+20,this.scale.height/2,'+3',{font: "35px MiTica", fill:"#000000"});
        let auxCoin = this.add.sprite(this.scale.width/2,this.scale.height/2,'coin');
        this.nCoin += 3;
        this.add.tween({
            targets: [auxCoin, auxTxt],
            duration: 3000,
            x: 500,
            y: 0,
            alpha: 0,
            onComplete: (tween, obj, target) => {
                this.scene.start('Levels', {
                    personaje: this.personajeAct,
                    monedas: this.nCoin,
                    comprados: this.store,
                });
            },
        });
    }
}
export default Maze;