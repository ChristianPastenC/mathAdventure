class Hanoi extends Phaser.Scene {    
    constructor(){ super({ key: "Hanoi" }); }

    init(data){
        // ============================================================================
        // Personaje seleccionado como parametro
        // ============================================================================
        this.personajeAct = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
    }

    preload(){
        this.inicio = ['1','2','3','4'];
        this.auxiliar = [];
        this.destino = [];
        this.auxDestino;
    }

    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'towersBack');
        this.towerA = this.add.image(220,225,'tower').setInteractive();
        this.towerB = this.add.image(520,225,'tower').setInteractive();
        this.towerC = this.add.image(820,225,'tower').setInteractive();
        this.frame = this.add.image(this.scale.width/2,this.scale.height/2,'towersFrame');
        //Establecer torres como zonas dropeables
        this.towerA.input.dropZone = true;
        this.towerB.input.dropZone = true;
        this.towerC.input.dropZone = true;
        //Asignar nombres a la zona dropeable
        this.towerA.name = 'torreA';
        this.towerB.name = 'torreB';
        this.towerC.name = 'torreC';
        // ============================================================================
        // Elementos utilizables
        // ============================================================================
        this.pieceD = this.add.image(225,335,'piece').setInteractive();
        this.pieceC = this.add.image(225,285,'piece').setScale(0.8,1).setInteractive();
        this.pieceB = this.add.image(225,235,'piece').setScale(0.6,1).setInteractive();
        this.pieceA = this.add.image(225,185,'piece').setScale(0.4,1).setInteractive();
        //Convertir piezas a objetos movibles
        this.input.setDraggable(this.pieceA);
        this.input.setDraggable(this.pieceB);
        this.input.setDraggable(this.pieceC);
        this.input.setDraggable(this.pieceD);
        //Asignar nombres a objetos
        this.pieceA.name = '1';
        this.pieceB.name = '2';
        this.pieceC.name = '3';
        this.pieceD.name = '4';
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        this.btnRestart = this.add.image(30,30,'btnReload').setScale(.7).setInteractive();
        this.personaje = this.add.sprite(75,this.scale.height-80,this.personajeAct).setScale(0.75).setDepth(2);
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"}).setDepth(2);
        this.coin = this.add.sprite(540,20,'coin').setDepth(2).setScale(.5);
        this.authomaticTweens();
        //Informacion del juego
        this.container5 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal5 = this.add.image(0,0,'modal');
        this.closeModal5 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText5 = this.add.text(-320, -100, 
                        '\nLas Torres de Hanoi es un rompecabezas matemático que\n'+
                        'consiste en mover 4 piezas de la primera a la tercera torre.\n\n'+
                        '-Solo se puede mover un disco a la vez. \n'+
                        '-Una pieza grande no puede estar sobre una más pequeña. \n'+
                        '-Solo se puede desplazar la pieza de arriba en cada poste. \n',
                        {font: "25px MiTica", fill:"#000000"});
        this.container5.add([
            this.modal5, this.closeModal5, this.infoText5,
        ]);
        this.container5.setVisible(false);
        // ============================================================================
        // Eventos Drag & Drop
        // ============================================================================
        const eventos = Phaser.Input.Events;
        
        this.input.on(eventos.DRAG, (pointer,obj,dragX,dragY)=>{ obj.x = dragX; obj.y = dragY; });

        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {  
            if ( !dropzone || this.isHead(obj.name) == false || this.canMove(obj.name,this.auxDestino) == false) {
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
            }else{
                if(this.auxDestino == 'torreA'){
                    this.move(obj.name,this.inicio);
                }else if(this.auxDestino == 'torreB'){
                    this.move(obj.name,this.auxiliar);
                }else if(this.auxDestino == 'torreC'){
                    this.move(obj.name,this.destino);
                }
                this.winner(this.hanoiWin());
            }
        });

        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            obj.x = this.optimizePosition(dropzone.name)[0];
            obj.y = this.optimizePosition(dropzone.name)[1];
            this.auxDestino = dropzone.name;
        });

        // ============================================================================
        // Función de botones
        // ============================================================================
        //Boton de reinicio
        this.btnRestart.on('pointerover', () => { this.btnRestart.setScale(0.8); });
        this.btnRestart.on('pointerout',  () => { this.btnRestart.setScale(0.7); });
        this.btnRestart.on('pointerup',   () => { this.initialStatus(); });
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
        this.btnInfo.on('pointerup',   () => { this.container5.setVisible(true); });
        //Boton que cierra el modal
        this.closeModal5.on('pointerover', () => { this.closeModal5.setScale(0.8); });
        this.closeModal5.on('pointerout',  () => { this.closeModal5.setScale(0.75); });
        this.closeModal5.on('pointerup',   () => { this.container5.setVisible(false); });
    }

    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    authomaticTweens(){
        this.add.tween({
            targets: [this.personaje], loop: -1,
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
            targets: [this.coin], loop: -1,
            onStart: (tween, obj, target) => { obj[0].anims.play('rotate',true); },
        });
    }
    // ============================================================================
    // Se optimiza la posición que obtendra la pieza en el destino 
    // de acuerdo a si ya hay piezas o no
    // ============================================================================
    optimizePosition(tower){
        var posX = 225, posY = 335;
        if(tower == 'torreA'){
            var ref = this.inicio.length;
            posY = posY - (ref * 50);
        }else if(tower == 'torreB'){
            var ref = this.auxiliar.length;
            posX = posX + 300;
            posY = posY - (ref * 50);
        }else if(tower == 'torreC'){
            var ref = this.destino.length;
            posX = posX + 600;
            posY = posY - (ref * 50);
        }
    return [posX, posY];
    }
    // ============================================================================
    // Determina si una pieza puede cambiar de posición
    // se asegura que solo sea movible el head de la torre
    // ============================================================================
    isHead(piece){
        var res;
        piece === this.inicio[0] || piece === this.auxiliar[0] ||
         piece === this.destino[0] ? res = true : res = false;
    return res;
    }
    // ============================================================================
    // Se mueve la pieza de manera lógica, realiza
    // cambios en los arreglos que referencian cada torre
    // ============================================================================
    move(piece,tower){
        if(this.inicio.includes(piece)){
            this.inicio.splice(0,1);
        }else if(this.auxiliar.includes(piece)){
            this.auxiliar.splice(0,1);
        }else if(this.destino.includes(piece)){
            this.destino.splice(0,1);
        } 
        tower.unshift(piece);
    }
    // ============================================================================
    // Determina si la pieza puede moverse a la torre destino valida
    // que la torre esté vacía o que no existan piezas menores debajo
    // ============================================================================
    canMove(piece,tower){
        var res;
        if(tower == 'torreA'){
            piece < this.inicio[0] || !this.inicio.length ? res = true : res = false;
        }else if(tower == 'torreB'){
            piece < this.auxiliar[0] || !this.auxiliar.length ? res = true : res = false;
            
        }else if(tower == 'torreC'){
            piece < this.destino[0] || !this.destino.length ? res = true : res = false;
        }
    return res;
    }
    // ============================================================================
    // Determina si todas las piezas fueron movidas de Inicio a Destino 
    // ============================================================================
    hanoiWin(){
        var auxArray = ['1','2','3','4'];
        var res = this.destino.length == auxArray.length 
                  && this.destino.every( function(v,i)
                    {  return v === auxArray[i] })
                    ? true : false;
    return res;
    }
    // ============================================================================
    // Muestra un mensaje de ganador 
    // ============================================================================
    winner(isWinner){
        if(isWinner === true){
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
    // ============================================================================
    // Reiniciar escena
    // ============================================================================
    initialStatus(){
        this.inicio.splice(0,this.inicio.length);
        this.auxiliar.splice(0,this.auxiliar.length);
        this.destino.splice(0,this.destino.length);
        this.inicio.push('1');
        this.inicio.push('2');
        this.inicio.push('3');
        this.inicio.push('4');
        this.pieceA.setPosition(225,185);
        this.pieceB.setPosition(225,235);
        this.pieceC.setPosition(225,285);
        this.pieceD.setPosition(225,335);
    }
}
export default Hanoi;