class Four extends Phaser.Scene {    
    constructor(){
        super({
            key: "Four"
        });
    }
    init(data){
        console.log('Four Fours Scene');
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
        this.shipMarked = [false,false,false,false,false,false,false,false,false,false];
        this.idxNum;
        this.idxEq;
        this.numeros = [];
        this.ecuaciones = [];
        this.textos = [];
        this.marked = 0;
    }
    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'fourBack');
         // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        this.personaje = this.add.sprite(50,this.scale.height-50,this.personajeAct).setScale(.5).setDepth(2);
        this.personaje.setScrollFactor(0);
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"});
        this.coin = this.add.sprite(540,20,'coin').setScale(.5);
        this.authomaticTweens();
        //Informacion del juego
        this.container2 = this.add.container(this.scale.width/2,this.scale.height/2).setDepth(1);
        this.modal2 = this.add.image(0,0,'modal');
        this.closeModal2 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText2 = this.add.text(-320, -100,
                        '\n     Los 4 Cuatros es un problema que consiste en formar\n'+
                        '    los números del 0 al 9 usando solamente 4 númetos 4\n'+
                        '    y operaciones como la suma o resta, por ejemplo, para\n'+
                        '    obtener el 10 debes restar 4 a 44 y dividirlo entre 4.\n'+
                        '    Relaciona los barcos con las expresiones matemáticas\n'+
                        '    uno a la vez hasta que todos desaparezcan para ganar.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container2.add([
            this.modal2, this.closeModal2, this.infoText2,
        ]);
        this.container2.setVisible(false);
        // ============================================================================
        // Elementos jugables
        // ============================================================================
        const eventos = Phaser.Input.Events;
        //Asigna posiciones aleatorias a las ecuaciones
        let auxPositionA = this.numAleatorioA();
        let auxPositionB = this.numAleatorioB();
        //Ciclos para posicionar números/ecuaciones
        for(var i = 0; i < 5; i++){
            this.ship = this.add.image(150,80*(i+1),'ship').setScale(0.8).setInteractive();
            this.txt = this.add.text(150,80*(i+1),i,{font: "30px MiTica", fill:"#ffffff"});
            this.textos[i] = this.txt;
            this.ship.name = i;
            this.numeros[i] = this.ship;
            this.ec = this.add.image(400,80*(i+1),'ec'+auxPositionA[i]).setInteractive();
            this.ec.name = auxPositionA[i];
            this.ecuaciones[i] = this.ec;
        }
        for(var i = 0; i < 5; i++){
            this.ship = this.add.image(550,80*(i+1),'ship').setScale(0.8).setInteractive();
            this.txt = this.add.text(540,80*(i+1),i+5,{font: "30px MiTica", fill:"#ffffff"});
            this.textos[(i+5)] = this.txt;
            this.ship.name = (i+5);
            this.numeros[(i+5)] = this.ship;
            this.ec = this.add.image(850,80*(i+1),'ec'+auxPositionB[i]).setInteractive();
            this.ec.name = auxPositionB[i];
            this.ecuaciones[(i+5)] = this.ec;
        }
        // ============================================================================
        // Eventos de unión número/ecuación
        // ============================================================================
        this.numeros[0].on('pointerover', () => { this.numeros[0].setScale(0.9); });
        this.numeros[0].on('pointerout', () => { this.numeros[0].setScale(0.8); });
        this.numeros[0].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 0;
                this.numeros[0].flipX = true;
                this.shipMarked[0] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[1].on('pointerover', () => { this.numeros[1].setScale(0.9); });
        this.numeros[1].on('pointerout', () => { this.numeros[1].setScale(0.8); });
        this.numeros[1].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 1;
                this.numeros[1].flipX = true;
                this.shipMarked[1] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[2].on('pointerover', () => { this.numeros[2].setScale(0.9); });
        this.numeros[2].on('pointerout', () => { this.numeros[2].setScale(0.8); });
        this.numeros[2].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 2;
                this.numeros[2].flipX = true;
                this.shipMarked[2] = true;
            }
        });//____________________________________________________________________________
        this.numeros[3].on('pointerover', () => { this.numeros[3].setScale(0.9); });
        this.numeros[3].on('pointerout', () => { this.numeros[3].setScale(0.8); });
        this.numeros[3].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 3;
                this.numeros[3].flipX = true;
                this.shipMarked[3] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[4].on('pointerover', () => { this.numeros[4].setScale(0.9); });
        this.numeros[4].on('pointerout', () => { this.numeros[4].setScale(0.8); });
        this.numeros[4].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 4;
                this.numeros[4].flipX = true;
                this.shipMarked[4] = true;
            }
            console.log(this.idxNum);
            console.log(this.shipMarked);
        });
        //____________________________________________________________________________
        this.numeros[5].on('pointerover', () => { this.numeros[5].setScale(0.9); });
        this.numeros[5].on('pointerout', () => { this.numeros[5].setScale(0.8); });
        this.numeros[5].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 5;
                this.numeros[5].flipX = true;
                this.shipMarked[5] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[6].on('pointerover', () => { this.numeros[6].setScale(0.9); });
        this.numeros[6].on('pointerout', () => { this.numeros[6].setScale(0.8); });
        this.numeros[6].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 6;
                this.numeros[6].flipX = true;
                this.shipMarked[6] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[7].on('pointerover', () => { this.numeros[7].setScale(0.9); });
        this.numeros[7].on('pointerout', () => { this.numeros[7].setScale(0.8); });
        this.numeros[7].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 7;
                this.numeros[7].flipX = true;
                this.shipMarked[7] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[8].on('pointerover', () => { this.numeros[8].setScale(0.9); });
        this.numeros[8].on('pointerout', () => { this.numeros[8].setScale(0.8); });
        this.numeros[8].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 8;
                this.numeros[8].flipX = true;
                this.shipMarked[8] = true;
            }
        });
        //____________________________________________________________________________
        this.numeros[9].on('pointerover', () => { this.numeros[9].setScale(0.9); });
        this.numeros[9].on('pointerout', () => { this.numeros[9].setScale(0.8); });
        this.numeros[9].on('pointerup', () => {
            if(this.isMarked() == false){
                this.idxNum = 9;
                this.numeros[9].flipX = true;
                this.shipMarked[9] = true;
            }
        });
        //Ecuaciones
        this.ecuaciones[0].on('pointerover', () => { this.ecuaciones[0].setScale(0.9); });
        this.ecuaciones[0].on('pointerout', () => { this.ecuaciones[0].setScale(0.8); });
        this.ecuaciones[0].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[0].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[1].on('pointerover', () => { this.ecuaciones[1].setScale(0.9); });
        this.ecuaciones[1].on('pointerout', () => { this.ecuaciones[1].setScale(0.8); });
        this.ecuaciones[1].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[1].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[2].on('pointerover', () => { this.ecuaciones[2].setScale(0.9); });
        this.ecuaciones[2].on('pointerout', () => { this.ecuaciones[2].setScale(0.8); });
        this.ecuaciones[2].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[2].name;
                this.match();
            }
        });//____________________________________________________________________________
        this.ecuaciones[3].on('pointerover', () => { this.ecuaciones[3].setScale(0.9);});
        this.ecuaciones[3].on('pointerout', () => { this.ecuaciones[3].setScale(0.8); });
        this.ecuaciones[3].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[3].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[4].on('pointerover', () => { this.ecuaciones[4].setScale(0.9); });
        this.ecuaciones[4].on('pointerout', () => { this.ecuaciones[4].setScale(0.8); });
        this.ecuaciones[4].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[4].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[5].on('pointerover', () => { this.ecuaciones[5].setScale(0.9); });
        this.ecuaciones[5].on('pointerout', () => { this.ecuaciones[5].setScale(0.8); });
        this.ecuaciones[5].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[5].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[6].on('pointerover', () => { this.ecuaciones[6].setScale(0.9); });
        this.ecuaciones[6].on('pointerout', () => { this.ecuaciones[6].setScale(0.8); });
        this.ecuaciones[6].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[6].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[7].on('pointerover', () => { this.ecuaciones[7].setScale(0.9); });
        this.ecuaciones[7].on('pointerout', () => { this.ecuaciones[7].setScale(0.8); });
        this.ecuaciones[7].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[7].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[8].on('pointerover', () => { this.ecuaciones[8].setScale(0.9); });
        this.ecuaciones[8].on('pointerout', () => { this.ecuaciones[8].setScale(0.8); });
        this.ecuaciones[8].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[8].name;
                this.match();
            }
        });
        //____________________________________________________________________________
        this.ecuaciones[9].on('pointerover', () => { this.ecuaciones[9].setScale(0.9); });
        this.ecuaciones[9].on('pointerout', () => { this.ecuaciones[9].setScale(0.8); });
        this.ecuaciones[9].on('pointerup', () => {
            if(this.isMarked() == true){
                this.idxEq = this.ecuaciones[9].name;
                this.match();
            }
        });

        // ============================================================================
        // Función de botones
        // ============================================================================
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
        this.btnInfo.on('pointerup', () => { this.container2.setVisible(true); });
        //Boton que cierra el modal
        this.closeModal2.on('pointerover', () => { this.closeModal2.setScale(0.8); });
        this.closeModal2.on('pointerout', () => { this.closeModal2.setScale(0.75); });
        this.closeModal2.on('pointerup', () => { this.container2.setVisible(false); });
    }
    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    authomaticTweens(){
        this.add.tween({
            targets: [this.personaje],
            loop: -1,
            onStart: (tween, obj, target) => {
                if(this.personajeAct == 'pirata_1'){
                    obj[0].anims.play('idle', true);
                }else if(this.personajeAct == 'pirata_2'){
                    obj[0].anims.play('idle2', true);
                }else{
                    obj[0].anims.play('idle3', true);
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
    // Genera posiciones aleatorias para las primeras 5 ecuaciones
    // ============================================================================
    numAleatorioA(){
        var min = 0, max = 5, cantidad = 5;
        let numeros=[];
        while (numeros.length<cantidad) {
            const num=Math.floor((Math.random() * (max - min)) + min );
            if (numeros.indexOf(num)==-1) { numeros.push(num); }
        }
    return numeros;    
    }
    // ============================================================================
    // Genera posiciones aleatorias para las últimas 5 ecuaciones
    // ============================================================================
    numAleatorioB(){
        var min = 5, max = 10, cantidad = 5;
        let numeros=[];
        while (numeros.length<cantidad) {
            const num=Math.floor((Math.random() * (max - min)) + min );
            if (numeros.indexOf(num)==-1) { numeros.push(num); }
        }
    return numeros;    
    }
    // ============================================================================
    // Comprueba que no hay números marcados
    // ============================================================================
    isMarked(){
        var res = false;
        for(var i = 0; i < this.shipMarked.length; i++){
            if(this.shipMarked[i] == true){ res = true; break;}
        }
    return res;
    }
    // ============================================================================
    // Comprueba si coincide el número con su ecuación
    // ============================================================================
    match(){
        let auxEc;
        for(var i = 0; i < this.ecuaciones.length; i++){
            if(this.ecuaciones[i].name == this.idxEq){
                auxEc = this.ecuaciones[i];
            }
        }
        if(this.idxNum === this.idxEq){   
            this.tweens = this.add.tween({
                targets: [this.numeros[this.idxNum],this.textos[this.idxNum]],
                x: auxEc.x,
                y:auxEc.y,
                duration: 2000,
                onStart: () => {
                    this.numeros[this.idxNum].flipX = true;
                },
                onComplete: (tween, obj, target) => {
                    this.numeros[this.idxNum].setVisible(false);
                    this.textos[this.idxNum].setVisible(false);
                    auxEc.setVisible(false);
                    this.marked += 1;
                    if(this.winner() == true){
                        this.win();
                    }
                },
            });
        }else{
            this.tweens = this.add.tween({
                targets: [this.numeros[this.idxNum],this.textos[this.idxNum], auxEc],
                tint: 0xff0000,
                duration: 500,
                onComplete: (tween, obj, target) => {
                    this.numeros[this.idxNum].clearTint();
                    this.textos[this.idxNum].clearTint();
                    auxEc.clearTint();
                },
            });
            this.numeros[this.idxNum].flipX = false;
        }
        this.shipMarked[this.idxNum] = false;
    }
    // ============================================================================
    // Comprueba si ya ganaste
    // ============================================================================
    winner(){
        let resp = true;
        if(this.marked != 10){
                resp = false;
        }
    return resp;
    }
    // ============================================================================
    // Muestra mensaje ganador y regresa a la escena de islas
    // ============================================================================
    win(){
        let auxRect = this.add.rectangle(this.scale.width/2,this.scale.height/2,this.scale.width,this.scale.height,0x000000,.75).setVisible(false);
        let winTxt  = this.add.text(this.scale.width/2-150,this.scale.height/2,'Ganaste..!',{font: "70px MiTica", fill:"#ffffff"}).setVisible(false);
        let auxTxt  = this.add.text(this.scale.width/2+20,this.scale.height/2,'+3',{font: "35px MiTica", fill:"#ffffff"}).setVisible(false);
        let auxCoin = this.add.sprite(this.scale.width/2,this.scale.height/2,'coin').setVisible(false);
        this.nCoin += 3;
        this.add.tween({
            targets: [winTxt], duration: 1000, alpha: 0,
            onInit: (tween, obj, target) => { auxRect.setVisible(true); winTxt.setVisible(true); },
        });
        this.add.tween({
            targets: [auxCoin, auxTxt], delay: 1200,
            duration: 2000, x: 500, y: 0, alpha: 0,
            onInit: (tween, obj, target) => { auxTxt.setVisible(true); auxCoin.setVisible(true); },
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
export default Four;