class Riddle extends Phaser.Scene {    
    constructor(){ super({ key: "Riddle" }); }
    init(data){
        // ============================================================================
        // Personaje seleccionado como parametro y monedas
        // ============================================================================
        this.personajeAct = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
    }
    preload(){
        // ============================================================================
        // Variables de control
        // ============================================================================   
        this.actObj;                                //Guarda la referencia del objeto actual
        this.inicio = ['pollo','zorro','maiz'];     //Lista de objetos del lado inicial
        this.final = ['','',''];                    //Lista de objetos del lado objetivo
        this.tope = false;                          //Verifica que no suban más que un objeto al bote
        this.auxDestino = '';                       //Referencia de la zona donde se deja caer el objeto (bote/arriba/abajo)
        this.idx;                                   //Indice de referencia para mover el objeto
        this.direct;                                //Direccion en la que se mueve el objeto (destino = true / origen = false)
    }
    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.water = this.add.tileSprite(this.scale.width/2,this.scale.height/2-40, this.scale.width, this.scale.height, "waterRiddle");
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'riddleBack');
        // ============================================================================
        // Elementos jugables
        // ============================================================================
        this.drop = this.add.image(200,250,'dropRiddle').setInteractive();
        this.drop.input.dropZone = true;
        //Zonas dropeables inferiores
        this.dropF = this.add.image(350,340,'dropRiddle').setInteractive().setScale(2,1);
        this.dropF.input.dropZone = true;
        this.dropH = this.add.image(500,340,'dropRiddle').setInteractive().setScale(2,1);
        this.dropH.input.dropZone = true;
        this.dropS = this.add.image(650,340,'dropRiddle').setInteractive().setScale(2,1);
        this.dropS.input.dropZone = true;
        //Zonas dropeables superiores
        this.dropFH = this.add.image(500,120,'dropRiddleH').setInteractive();
        this.dropFH.input.dropZone = true;
        this.dropHH = this.add.image(580,120,'dropRiddleH').setInteractive();
        this.dropHH.input.dropZone = true;
        this.dropSH = this.add.image(660,120,'dropRiddleH').setInteractive();
        this.dropSH.input.dropZone = true;
        this.dropFH.setAlpha(0);
        this.dropHH.setAlpha(0);
        this.dropSH.setAlpha(0);
        //Objetos interactivos
        this.personaje = this.add.sprite(110,260,this.personajeAct).setScale(.5);
        this.fox = this.add.image(350,380,'foxRiddle').setInteractive();
        this.hen = this.add.image(500,380,'henRiddle').setFlipX(true).setInteractive();
        this.sack = this.add.image(650,380,'sackRiddle').setInteractive();
        this.boat = this.add.image(150,300,'boatRiddle').setFlipX(true).setInteractive();
        this.play1 = this.add.image(300,270,'btnPlay').setScale(.7).setInteractive().setVisible(false);
        this.play2 = this.add.image(920,180,'btnPlay').setScale(.7).setInteractive().setVisible(false);
        //Convertir piezas a objetos movibles
        this.input.setDraggable(this.fox);
        this.input.setDraggable(this.hen);
        this.input.setDraggable(this.sack);
        //Asignar nombres a objetos
        this.drop.name = 'boat';
        this.fox.name = 'zorro';
        this.hen.name = 'pollo';
        this.sack.name = 'maiz';
        this.dropFH.name = 'base';
        this.dropHH.name = 'base';
        this.dropSH.name = 'base';
        //Crear grupo referente al bote, para un mejor movimiento en el tween
        this.bote = this.add.container(0,0);
        this.bote.addAt(this.personaje,1);
        this.bote.addAt(this.boat,2);
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        //Anuncio de cuando pierdes el reto
        this.lose = this.add.rectangle(0,0,1000,450,0x000000,.75).setOrigin(0,0).setVisible(false);
        this.loseText = this.add.text(this.scale.width/2, this.scale.height/2, 
            '                                           PERDISTE ..!\n'+
            '       Usa el botón de reinicio para comenzar de nuevo.',
            {font: "25px MiTica", fill:"#ffffff"}).setOrigin(.5,.5).setVisible(false);
        //Botones para instrucciones, regresar y reiniciar
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        this.btnRestart = this.add.image(30,30,'btnReload').setScale(.7).setInteractive();
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"}).setDepth(2);
        this.coin = this.add.sprite(540,20,'coin').setDepth(2).setScale(.5);
        this.authomaticTweens();
        //Informacion del juego
        this.container7 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal7 = this.add.image(0,0,'modal');
        this.closeModal7 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText7 = this.add.text(-320, -100, 
                        '\n          En esta isla un pirata tiene que cruzar un río\n'+
                        '   con un zorro, un pollo y un saco de maíz. Tiene un bote,\n'+
                        '   y sólo puede llevar con él una cosa a la vez. Si el zorro\n'+
                        '         y el pollo quedan solos, el zorro se come al pollo. \n'+
                        '   Si el pollo y el maíz quedan solos, el pollo se come el maíz\n'+
                        '              Ayuda al pirata a cumplir su objetivo.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container7.add([
            this.modal7, this.closeModal7, this.infoText7,
        ]);
        this.container7.setVisible(false);
        // ============================================================================
        // Eventos Drag & Drop
        // ============================================================================
        const eventos = Phaser.Input.Events;
        
        //Mueve el objeto draggable segun el puntero
        this.input.on(eventos.DRAG, (pointer,obj,dragX,dragY)=>{
            obj.x = dragX;
            obj.y = dragY;
        });
        //Determina que hacer cuando termina el drag
        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {  
            /* Regresa a la posicion inicial del objeto en caso de 
                 1. No sea una zona dropeable
                 2. Se mueva hacia el bote y este ya se encuentre lleno
            */
            if ( !dropzone || (this.auxDestino == 'boat' && this.tope == true) ) {
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
            }else if(this.auxDestino == 'boat'){
                this.play1.setVisible(true);
                this.actObj = obj;
                this.tope = true;
                //Si el destino es el bote elimina el objeto de su origen lógico 
                this.dropItem(this.actObj.name);
            }else if(this.auxDestino == 'base'){
                //Si el objeto llega a la zona superior lo agrega a su destino lógico 
                if(this.actObj == obj){
                    this.move(this.actObj.name,true);
                    this.actObj = '';
                    this.play1.setVisible(false);
                    this.tope = false;
                }
            }else{
                this.move(this.actObj.name,false);
                this.play1.setVisible(false);
                this.tope = false;
            }
        });

        
        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            obj.x = dropzone.x;
            obj.y = dropzone.y + 30;
            //Asigna un nombre al referente destino (dropzone)
            this.auxDestino = dropzone.name;
        });

        //Boton de animación
        this.play1.on('pointerover', () => { this.play1.setScale(.8); });
        this.play1.on('pointerout',  () => { this.play1.setScale(.7); });
        this.play1.on('pointerup',   () => { this.cross();            });
        this.play2.on('pointerover', () => { this.play2.setScale(.8); });
        this.play2.on('pointerout',  () => { this.play2.setScale(.7); });
        this.play2.on('pointerup',   () => { this.crossBack();        });
        // ============================================================================
        // Función de botones
        // ============================================================================
        //Boton de reinicio
        this.btnRestart.on('pointerover', () => { this.btnRestart.setScale(0.8); });
        this.btnRestart.on('pointerout',  () => { this.btnRestart.setScale(0.7); });
        this.btnRestart.on('pointerup',   () => {
            this.registry.destroy();
            this.events.off();
            this.scene.restart()
        });
        //Boton de salida
        this.btnExit.on('pointerover', () => { this.btnExit.setScale(0.8); });
        this.btnExit.on('pointerout',  () => { this.btnExit.setScale(0.7); });
        this.btnExit.on('pointerup', () => {
            this.scene.start('Levels', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        //Boton de ayuda
        this.btnInfo.on('pointerover', () => { this.btnInfo.setScale(0.8);       });
        this.btnInfo.on('pointerout',  () => { this.btnInfo.setScale(0.7);       });
        this.btnInfo.on('pointerup',   () => { this.container7.setVisible(true); });
        //Boton que cierra el modal
        this.closeModal7.on('pointerover', () => { this.closeModal7.setScale(0.8); });
        this.closeModal7.on('pointerout',  () => { this.closeModal7.setScale(0.75); });
        this.closeModal7.on('pointerup',   () => { this.container7.setVisible(false); });
    }
    update(time,delta){ this.water.tilePositionX += .75; }
    // ============================================================================
    // Genera una interpolación de movimiento donde 
    // el bote cruza con el objeto elegido 
    // hacía el otro lado
    // ============================================================================    
    cross(){
        this.play1.setVisible(false);
        this.add.tween({
            targets: [this.bote],
            x: 620,
            y: -100,
            duration: 4000,
            onStart: () => {
                this.dropF.setAlpha(0);
                this.dropH.setAlpha(0);
                this.dropS.setAlpha(0);
                if(this.check() == false){
                    this.lose.setVisible(true);
                    this.loseText.setVisible(true);
                }
            },
            onComplete: () => {
                this.play2.setVisible(true);
                this.dropFH.setAlpha(1);
                this.dropHH.setAlpha(1);
                this.dropSH.setAlpha(1);
            },
        });
        this.add.tween({
            targets: [this.actObj],
            x: 800,
            y: 180,
            duration: 4000,
        });
        this.add.tween({
            targets: [this.drop],
            x: 810,
            y: 140,
            duration: 4000,
        });
    }
    // ============================================================================
    // Regresa el bote a la posicion inicial 
    // ============================================================================
    crossBack(){
        this.play2.setVisible(false);
        this.add.tween({
            targets: [this.bote],
            x: 0,
            y: 0,
            duration: 4000,
            onStart: () => {
                this.dropFH.setAlpha(0);
                this.dropHH.setAlpha(0);
                this.dropSH.setAlpha(0);
                if(this.check() == false){
                    this.lose.setVisible(true);
                    this.loseText.setVisible(true);
                }
            },
            onComplete: () => {
                this.play1.setVisible(true);
                this.dropF.setAlpha(1);
                this.dropH.setAlpha(1);
                this.dropS.setAlpha(1);
            },
        });
        this.add.tween({
            targets: [this.actObj],
            x: 200,
            y: 280,
            duration: 4000, 
        });
        this.add.tween({
            targets: [this.drop],
            x: 200,
            y: 250,
            duration: 4000,
        });
    }
    // ============================================================================
    // Elimina el objeto lógico al pasarlo al bote 
    // ============================================================================
    dropItem(object){
        let direct;
        for(var i = 0; i < this.inicio.length; i++){
            if(this.inicio[i] == object){
                this.idx = i;
                direct = true;
            }
        }
        for(var i = 0; i < this.final.length; i++){
            if(this.final[i] == object){
                this.idx = i;
                direct = false;
            }
        }
        direct ? this.inicio[this.idx] = '' : this.final[this.idx] = '';
    }
    // ============================================================================
    // Mueve los objetos de manera lógica 
    // ============================================================================
    move(object,direct){
        if(object){
            let idx = this.idx;
            direct ? this.final[idx] = object : this.inicio[idx] = object;
            if(this.winner() == true){
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
    }
    // ============================================================================
    // Verifica que no se queden solos los que se puedan comer
    // devuelve true si se puede seguir con el juego 
    // ============================================================================
    check(){
        let resp = true;
        //Zorro con Pollo
        if(this.inicio.includes('') && (this.inicio.includes('pollo')) && (this.inicio.includes('zorro'))){
            resp = false;
            this.hen.setVisible(false);
        }else if(this.final.includes('') && (this.final.includes('pollo')) && (this.final.includes('zorro'))){
            resp = false;
            this.hen.setVisible(false);
        }
        // Pollo con maiz
        else if(this.inicio.includes('') && (this.inicio.includes('pollo')) && (this.inicio.includes('maiz'))){
            resp = false;
            this.sack.setVisible(false);
        }else if(this.final.includes('') && (this.final.includes('pollo')) && (this.final.includes('maiz'))){
            resp = false;
            this.sack.setVisible(false);
        }
    return resp;
    }
    // ============================================================================
    // Verifica si todos los objetos han sido cambiados de lado
    // ============================================================================
    winner(){
        let resp;
        this.final.includes('pollo') &&
            this.final.includes('zorro') &&
            this.final.includes('maiz') ? 
                resp = true : resp = false;
    return resp;
    }
    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    authomaticTweens(){
        this.add.tween({
            targets: [this.coin], loop: -1,
            onStart: (tween, obj, target) => { obj[0].anims.play('rotate',true); },
        });
    }
}
export default Riddle;