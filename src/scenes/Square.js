class Square extends Phaser.Scene {
    
    constructor(){
        super({
            key: 'Square'
        });
    }

    init(data){
        console.log('Magic Square Scene');
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
        this.obj = [16,3,2,13,5,10,11,8,9,6,7,12,4,15,14,1];
        this.ini = [16,3,0,0,5,0,11,0,9,6,0,12,0,15,0,1];
        this.tam = 16;
        this.pieces = [];
        this.auxDestino;
    }
    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'squareBack');   
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
        this.board();
        this.magicSquare();
        this.infoText = this.add.text(320, 310, '*El Número Mágico es 34',{font: "30px MiTica", fill:"#000000"});
        //Informacion del juego
        this.container4 = this.add.container(this.scale.width/2,this.scale.height/2).setDepth(1);
        this.modal4 = this.add.image(0,0,'modal');
        this.closeModal4 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText4 = this.add.text(-320, -100, 
                        '\n        Un cuadrado mágico es una tabla compuesto de\n'+
                        '       4x4 celdas (16 en total), donde cada celda debe\n'+
                        '       contener un único número entero. La suma de los\n'+
                        '       números presentes enuna fila, columna o diagonal\n'+
                        '       deben dar siempre el mismo resultado. A esta suma\n'+
                        '       se le llama "número mágico" o "constante mágica".',
                        {font: "25px MiTica", fill:"#000000"});
        this.container4.add([
            this.modal4, this.closeModal4, this.infoText4,
        ]);
        this.container4.setVisible(false);
        // ============================================================================
        // Eventos Drag & Drop (Funciones Puzzle)
        // ============================================================================
        const eventos = Phaser.Input.Events;
        
        this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) => {
            obj.setScale(0.9);
        });

        this.input.on(eventos.DRAG, (pointer,obj,dragX,dragY)=>{
            obj.x = dragX;
            obj.y = dragY;
        });
        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone) => {
            if ( !dropzone ) {
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
            }
            obj.setScale(1.0);
            this.move(obj.name,this.auxDestino);
            if(this.win() == true){
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
        });
        this.input.on(eventos.DROP, (pointer, obj, dropzone) => {
            obj.x = dropzone.x;
            obj.y = dropzone.y;
            this.auxDestino = dropzone.name;
        });

        // ============================================================================
        // Función de botones
        // ============================================================================
        //Boton de reinicio
        this.btnRestart.on('pointerover', () => {
            this.btnRestart.setScale(0.8);
        });
        this.btnRestart.on('pointerout', () => {
            this.btnRestart.setScale(0.7);
        });
        this.btnRestart.on('pointerup', () => {
            this.ini = [16,3,0,0,5,0,11,0,9,6,0,12,0,15,0,1];
            this.clean();
            this.magicSquare();
        });
        //Boton de salida
        this.btnExit.on('pointerover', () => {
            this.btnExit.setScale(0.8);
        });
        this.btnExit.on('pointerout', () => {
            this.btnExit.setScale(0.7);
        });
        this.btnExit.on('pointerup', () => {
            this.scene.start('Levels', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        //Boton de ayuda
        this.btnInfo.on('pointerover', () => {
            this.btnInfo.setScale(0.8);
        });
        this.btnInfo.on('pointerout', () => {
            this.btnInfo.setScale(0.7);
        });
        this.btnInfo.on('pointerup', () => {
            this.container4.setVisible(true);
        });
        //Boton que cierra el modal
        this.closeModal4.on('pointerover', () => {
            this.closeModal4.setScale(0.8);
        });
        this.closeModal4.on('pointerout', () => {
            this.closeModal4.setScale(0.75);
        });
        this.closeModal4.on('pointerup', () => {
            this.container4.setVisible(false);
        });
    }
    update(time, delta){

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
    // Función que agrega en pantalla el cuadro a utilizar
    // ============================================================================
    board(){
        let posX = 300, posY = 60;
        for(var i = 0; i < this.tam; i++){
            this.aux = this.add.image(posX,posY,'square').setInteractive();
            if(this.ini[i] == 0){
                //Se establece como zona dropeable
                this.aux.input.dropZone = true;
                //Asigna nombres a la zona dropeable
                this.aux.name = (i+1);
            }
            posX += 140;
            if((i+1)%4 == 0){
                posY += 72;
                posX = 300;
            }   
        }
    }
    // ============================================================================
    // Genera las piezas de referencia y utilizables
    // ============================================================================
    magicSquare(){
        let posX = 300, posY = 60;
        let auxPosition = this.numAleatorio(), cont = 0;
        for(var i = 0; i < this.tam; i++){
            var x2 = 190;
            if(this.ini[i] != 0){
                //piezas de referencia
                this.aux = this.add.image(posX,posY,'pSquare'+this.ini[i]);
            }else{
                //Da una posición aleatoria
                x2 += 120 * auxPosition[cont];
                //dropzone inferior
                this.drop = this.add.rectangle(x2,400,112,60).setInteractive();
                this.drop.input.dropZone = true;
                //pieza usable
                this.aux = this.add.image(x2,400,'pSquare'+this.obj[i]).setInteractive();
                this.aux.name = this.obj[i];
                this.input.setDraggable(this.aux);
                cont += 1;
            }
            //agregar piezas a un array para limpiar después
            this.pieces[i] = this.aux;
            //actualizar posiciones
            posX += 140;
            if((i+1)%4 == 0){
                posY += 72;
                posX = 300;
            }   
        }
    }
    // ============================================================================
    // Mueve la pieza de manera lógica
    // ============================================================================
    move(piece,drop){
        drop -= 1;
        this.ini[drop] = piece;
    }
    // ============================================================================
    // Determina si el cuadro mágio está completo 
    // ============================================================================
    win(){
        var auxArray = this.ini;
        var res = this.ini.length == this.obj.length 
                  && this.obj.every(
                        function(v,i)
                        { 
                            return v === auxArray[i]
                        } ) ? true : false;
    return res;
    }
    // ============================================================================
    // Limpia el board para que no se sobrepongan las piezas
    // ============================================================================
    clean(){
        if(this.pieces.length != 0){
            for(var i=0; i<this.pieces.length;i++){
                this.pieces[i].destroy();
            }
        }
    }
    // ============================================================================
    // Genera posiciones aleatorias para las piezas usables
    // ============================================================================
    numAleatorio(){
        var min = 0, max = 7, cantidad = 7;
        let numeros=[];
        while (numeros.length<cantidad) {
            const num=Math.floor((Math.random() * (max - min)) + min );
            if (numeros.indexOf(num)==-1) {
                numeros.push(num);
            }
        }
    return numeros;    
    }
}
export default Square;