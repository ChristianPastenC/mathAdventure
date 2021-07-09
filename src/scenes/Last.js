class Hanoi extends Phaser.Scene {
    
    constructor(){ super({ key: "Last" }); }

    init(data){
        console.log('Last Scene');
        // ============================================================================
        // Personaje seleccionado como parametro, monedas y tienda
        // ============================================================================
        this.personajeAct = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
    }

    preload(){
        // ============================================================================
        // Variables de control
        // ============================================================================
        this.refChar = ['',''];                   // Determina los personajes mostrados
        this.personajeAct == 'pirata_1' ?
            this.refChar[0] = 'pirata_2' : 
                this.personajeAct == 'pirata_2' ?
                    this.refChar[0] = 'pirata_3' : 
                        this.refChar[0] = 'pirata_1';               
        this.refChar[0] == 'pirata_2' ?
            this.refChar[1] = 'pirata_3' : 
                this.refChar[0] == 'pirata_3' ?
                    this.refChar[1] = 'pirata_1' : 
                        this.refChar[1] = 'pirata_2';   
        this.A = 15;                              // Primera respuesta
        this.B = 15;                              // Segunda respuesta
        this.C = 15;                              // Tercera respuesta
    }

    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.sky = this.add.tileSprite(0,70,this.scale.width*3,this.scale.height/2,'lastSky').setOrigin(0,0);
        this.back = this.add.image(0,0,'lastBack').setOrigin(0,0);
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        // Botones
        this.btnExit    = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo    = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        // Personajes
        this.personaje  = this.add.sprite(300,this.scale.height-100,this.personajeAct).setScale(0.8);
        this.personaje2 = this.add.sprite(700,this.scale.height-100,this.refChar[0]).setScale(0.8).setFlipX(true);
        this.personaje3 = this.add.sprite(900,this.scale.height-100,this.refChar[1]).setScale(0.8).setFlipX(true);
        // Monedas actuales
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"}).setInteractive();
        this.coin    = this.add.sprite(540,20,'coin').setScale(.5);
        this.authomaticTweens();
        // ============================================================================
        // Elementos Jugables
        // ============================================================================
        this.baseA = this.add.image(275,150,'frameOpt').setScale(.15,.3);
        this.baseB = this.add.image(425,150,'frameOpt').setScale(.15,.3);
        this.baseC = this.add.image(575,150,'frameOpt').setScale(.15,.3);
        this.txtA  = this.add.text(240,120,this.A.toString(),{font: "60px MiTica", fill:"#000000"});
        this.txtB  = this.add.text(390,120,this.B.toString(),{font: "60px MiTica", fill:"#000000"});
        this.txtC  = this.add.text(540,120,this.C.toString(),{font: "60px MiTica", fill:"#000000"});
        // Botones para subir/bajar las respuestas
        this.btnDownA = this.add.image(250,225,'btnPrev').setScale(.7).setInteractive();
        this.btnUpA   = this.add.image(300,225,'btnNext').setScale(.7).setInteractive();
        this.btnDownB = this.add.image(400,225,'btnPrev').setScale(.7).setInteractive();
        this.btnUpB   = this.add.image(450,225,'btnNext').setScale(.7).setInteractive();
        this.btnDownC = this.add.image(550,225,'btnPrev').setScale(.7).setInteractive();
        this.btnUpC   = this.add.image(600,225,'btnNext').setScale(.7).setInteractive();
        // Elementos de de referencia
        this.baseRef = this.add.image(725,150,'frameOpt').setScale(.15,.3).setInteractive();
        this.txtRef  = this.add.text(710,120,'35',{font: "50px MiTica", fill:"#000000"});
        this.coinRef = this.add.sprite(690,150,'coin','gold_21').setScale(.5); 
        // Moneda de referencia
        this.dragCoin = this.add.sprite(500,50,'coin','gold_21').setVisible(false);
        this.input.setDraggable(this.txtCoin);
        this.baseRef.input.dropZone = true;
        // ============================================================================
        // Eventos Drag & Drop
        // ============================================================================
        const eventos = Phaser.Input.Events;
        this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => {
            if(this.txtRef.text != '36'){
                this.dragCoin.setVisible(true);
                this.dragCoin.setScale(0.9);
            }
        });

        this.input.on(eventos.DRAG, (pointer,obj,dragX,dragY)=>{ this.dragCoin.x = dragX;    this.dragCoin.y = dragY; });

        this.input.on(eventos.DRAG_END,(pointer,obj,dropzone)=>{
            if(!dropzone){
                this.dragCoin.x = obj.input.dragStartX;
                this.dragCoin.y = obj.input.dragStartY;
            }else{
                this.nCoin -= 1;
                this.txtCoin.setText(this.nCoin);
                this.txtRef.text = '36';
            }
            this.dragCoin.setVisible(false);
            this.dragCoin.setScale(1.0);
        });

        this.input.on(eventos.DROP,(pointer,obj,dropzone)=>{
            this.dragCoin.x = dropzone.x;
            this.dragCoin.y = dropzone.y;
            this.dragCoin.setVisible(false);
        });
        // ============================================================================
        // Función de botones
        // ============================================================================
        //Boton de salida
        this.btnExit.on('pointerover', () => { this.btnExit.setScale(0.8); });
        this.btnExit.on('pointerout',  () => { this.btnExit.setScale(0.7); });
        this.btnExit.on('pointerup',   () => {
            this.scene.start('Levels', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        //Boton de ayuda
        this.btnInfo.on('pointerover', () => { this.btnInfo.setScale(0.8); });
        this.btnInfo.on('pointerout',  () => { this.btnInfo.setScale(0.7); });
        this.btnInfo.on('pointerup',   () => {  });
        //***** Botones que disminuyen *****//
        this.btnDownA.on('pointerover', () => { this.btnDownA.setScale(.75); });
        this.btnDownA.on('pointerout',  () => { this.btnDownA.setScale(.70); });
        this.btnDownA.on('pointerup',   () => {
            this.A - 1 > 0 ? this.A -= 1 : this.A = this.A;
            this.A >= 10 ? this.txtA.text = this.A.toString() :
                this.txtA.text = '0'+this.A.toString();
            this.checkResult();
        });
        this.btnDownB.on('pointerover', () => { this.btnDownB.setScale(.75);} );
        this.btnDownB.on('pointerout',  () => { this.btnDownB.setScale(.70);} );
        this.btnDownB.on('pointerup',   () => {
            this.B - 1 > 0 ? this.B -= 1 : this.B = this.B;
            this.B >= 10 ? this.txtB.text = this.B.toString() :
                this.txtB.text = '0'+this.B.toString();
            this.checkResult();
        });
        this.btnDownC.on('pointerover', () => { this.btnDownC.setScale(.75); });
        this.btnDownC.on('pointerout',  () => { this.btnDownC.setScale(.70); });
        this.btnDownC.on('pointerup',   () => {
            this.C - 1 > 0 ? this.C -= 1 : this.C = this.C;
            this.C >= 10 ? this.txtC.text = this.C.toString() :
                this.txtC.text = '0'+this.C.toString();
            this.checkResult();
        });
        //***** Botones que aumentan *****//
        this.btnUpA.on('pointerover', () => { this.btnUpA.setScale(.75); });
        this.btnUpA.on('pointerout',  () => { this.btnUpA.setScale(.70); });
        this.btnUpA.on('pointerup',   () => {
            this.A + 1 < 36 ? this.A += 1 : this.A = this.A;
            this.A >= 10 ? this.txtA.text = this.A.toString() :
                this.txtA.text = '0'+this.A.toString();
            this.checkResult();
        });
        this.btnUpB.on('pointerover', () => { this.btnUpB.setScale(.75); });
        this.btnUpB.on('pointerout',  () => { this.btnUpB.setScale(.70); });
        this.btnUpB.on('pointerup',   () => {
            this.B + 1 < 36 ? this.B += 1 : this.B = this.B;
            this.B >= 10 ? this.txtB.text = this.B.toString() :
                this.txtB.text = '0'+this.B.toString();
            this.checkResult();
        });
        this.btnUpC.on('pointerover', () => { this.btnUpC.setScale(.75); });
        this.btnUpC.on('pointerout',  () => { this.btnUpC.setScale(.70); });
        this.btnUpC.on('pointerup',   () => {
            this.C + 1 < 36 ? this.C += 1 : this.C = this.C;
            this.C >= 10 ? this.txtC.text = this.C.toString() :
                this.txtC.text = '0'+this.C.toString();
            this.checkResult();
        });

    }

    update(time, delta){
        this.sky.tilePositionX += .3;
    }

    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    authomaticTweens(){
        this.add.tween({
            targets: [this.personaje, this.personaje2, this.personaje3],
            loop: -1,
            onStart: (tween, obj, target) => {
                if(this.personajeAct == 'pirata_1'){
                    obj[0].anims.play('idle',  true);
                    obj[1].anims.play('idle2', true);
                    obj[2].anims.play('idle3', true);
                }else if(this.personajeAct == 'pirata_2'){
                    obj[0].anims.play('idle2', true);
                    obj[1].anims.play('idle3', true);
                    obj[2].anims.play('idle',  true);
                }else{
                    obj[0].anims.play('idle3', true);
                    obj[1].anims.play('idle',  true);
                    obj[2].anims.play('idle2', true);
                }
            },
        });
        this.add.tween({
            targets: [this.coin],
            loop: -1,
            onStart: (tween, obj, target) => {
                obj[0].anims.play('rotate',true);
            },
        });
    }
    // ============================================================================
    // Muestra un mensaje de ganador 
    // ============================================================================
    winner(isWinner){
        if(isWinner === true){
            let auxTxt = this.add.text(this.scale.width/2+20,this.scale.height/2,'+2',{font: "35px MiTica", fill:"#000000"});
            let auxCoin = this.add.sprite(this.scale.width/2,this.scale.height/2,'coin');
            this.nCoin += 2;
            this.add.tween({
                targets: [auxCoin, auxTxt],
                duration: 3000,
                x: 500, y: 0, alpha: 0,
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
    // ============================================================================
    // Método que verfica las variables 
    // ============================================================================
    checkResult(){
        console.log(this.A, ' ', this.B, ' ', this.C);
        this.A == 18 && this.B == 12 &&
        this.C == 4 && this.txtRef.text == '36' ?
            this.winner(true) :
            this.winner(false);
    }

}
export default Hanoi;
