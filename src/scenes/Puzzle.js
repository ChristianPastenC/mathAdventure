class Puzzle extends Phaser.Scene {
    
    constructor(){
        super({
            key: "Puzzle"
        });
    }

    init(data){
        console.log('Puzzle Scene');
        // ============================================================================
        // Personaje seleccionado como parametro
        // ============================================================================
        this.personajeAct = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
        // ============================================================================
        // Variables de control
        // ============================================================================
        this.grid = [];
        this.pieces = [];
        this.black = null;
    }
    create(){
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.back = this.add.image(this.scale.width/2,this.scale.height/2,'puzzleBack');   
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive();
        this.btnInfo = this.add.image(920,30,'btnHelp').setScale(.7).setInteractive();
        this.btnRestart = this.add.image(30,30,'btnReload').setScale(.7).setInteractive();
        this.personaje = this.add.sprite(75,this.scale.height-80,this.personajeAct).setScale(0.75).setDepth(2);
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"});
        this.coin = this.add.sprite(540,20,'coin').setScale(.5);
        this.authomaticTweens();
        //Informacion del juego
        this.container1 = this.add.container(this.scale.width/2,this.scale.height/2).setDepth(3);
        this.modal1 = this.add.image(0,0,'modal');
        this.closeModal1 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.infoText1 = this.add.text(-320, -100,
                        '\n   Un 8 puzzle es un juego que consta de una cuadrícula\n'+
                        '     de 3x3. Con uno de los cuadrados vacío, el objetivo\n'+
                        '       es mover los cuadros de alrededor en diferentes\n'+
                        '         posiciones, hasta formar la figura mostrada.',
                        {font: "25px MiTica", fill:"#000000"});
        this.ref = this.add.image(200,100,'puzzleRef');
        this.container1.add([
            this.modal1, this.closeModal1, this.infoText1, this.ref
        ]);
        this.container1.setVisible(false);
        // ============================================================================
        // Poner Puzzle en pantalla
        // ============================================================================
        do{
            this.clean();
            this.board();
        }while(this.isSolvable(this.matrix(this.grid)) != true);
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
        //Función Puzzle
        this.input.on(eventos.DRAG_END,(pointer,obj,dropzone)=>{
            var name = obj.name,
                namebk = this.black.name;
            if(dropzone && (
                ((obj.input.dragStartX+200)===this.black.x && obj.input.dragStartY===this.black.y) ||
                ((obj.input.dragStartX-200)===this.black.x && obj.input.dragStartY===this.black.y) ||
                ((obj.input.dragStartY+100)===this.black.y && obj.input.dragStartX===this.black.x) ||
                ((obj.input.dragStartY-100)===this.black.y && obj.input.dragStartX===this.black.x)
            ))
            {
                this.black.x = obj.input.dragStartX;
                this.black.y = obj.input.dragStartY;
                this.move(name,namebk);
                if(this.isCompleted()){
                    this.win();
                }
            }else{
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
            }
            obj.setScale(1.0);
        });

        this.input.on(eventos.DROP,(pointer,obj,dropzone)=>{
            obj.x = dropzone.x;
            obj.y = dropzone.y;
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
            do{
                this.clean();
                this.board();
            }while(this.isSolvable(this.matrix(this.grid)) != true);
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
            this.container1.setVisible(true);
        });
        //Boton que cierra el modal
        this.closeModal1.on('pointerover', () => {
            this.closeModal1.setScale(0.8);
        });
        this.closeModal1.on('pointerout', () => {
            this.closeModal1.setScale(0.75);
        });
        this.closeModal1.on('pointerup', () => {
            this.container1.setVisible(false);
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
    // Posiciona de manera aleatoria las piezas en la interfaz
    // ============================================================================
    board(){
        for(var i = 0; i<9; i++){
            this.grid[i] = i;
        }
        var posX = 225, posY = 50;
        this.grid.sort(function() { return Math.random() - 0.1})
        for(var i=0;i<this.grid.length;i++){
            if((this.grid[i] + 1) != 9){
                this.aux = this.add.image(posX,posY,'p'+(this.grid[i]+1)).setOrigin(0,0).setDepth(2).setInteractive();
                this.input.setDraggable(this.aux);
                this.aux.name = this.grid[i] + 1;
                this.grid[i] = this.aux.name;
                this.pieces[i] = this.aux;
            }else{
                this.black = this.add.image(posX,posY,'space').setOrigin(0,0).setDepth(2).setInteractive();
                this.black.input.dropZone = true;
                this.black.name = this.grid[i] + 1;
                this.grid[i] = this.black.name;
                this.pieces[i] = this.black;
            }
            posX += 200;
            if((i+1)%3 == 0){
                posY += 100;
                posX = 225;
            }   
        }
    }
    // ============================================================================
    // Mueve las piezas de manera lógica en el array de referencia
    // ============================================================================
    move(init,end){
        var a, b;
        for(var i=0; i<9; i++){
            if(init == this.grid[i])
                a = i;
            if(end == this.grid[i])
                b = i;
        }
        this.grid[a] = end;
        this.grid[b] = init;
    }
    // ============================================================================
    // Determina si el puzzle ya está terminado
    // ============================================================================
    isCompleted(){
        var complete = true;
        for(var i = 0; i < 9; i++){
            if(this.grid[i] != (i+1)){
                complete = false;
                break;
            }else{
                continue;
            }
        }
        return complete;
    }
    // ============================================================================
    // Función auxiliar que convierte un array en matriz de 3x3
    // ============================================================================
    matrix(initArray){
        console.log(initArray);
        let arr = new Array(3);
        for(let i = 0; i < arr.length; i++){
            arr[i] = new Array(3);
        }
        for(let i = 0; i < initArray.length; i++){
            if(initArray[i] == 9){
                arr[Math.trunc(i/3)][Math.trunc(i%3)] = 0;     
            }else{
                arr[Math.trunc(i/3)][Math.trunc(i%3)] = initArray[i]; 
            }
        }
        console.log('as matrix',arr);
    return arr;
    }
    // ============================================================================
    // Cuenta la cantidad de inversiones
    // ============================================================================
    getInvCount(arr)
    {
        console.log(arr);
        let inv_count = 0 ;
        for(let i=0;i<2;i++){
            for(let j=i+1;j<3;j++){
                // Valor de 0 para el espacio vacío
                if (arr[j][i] > 0 && arr[j][i] > arr[i][j]){
                    inv_count += 1;
                }
            }
        }
    return inv_count;
    }
    // ============================================================================
    // Determina si el puzzle tiene solución
    // ============================================================================
    isSolvable(puzzle)
    {
        // Cuenta las inversiones en un 8 puzzle dado
        let invCount = this.getInvCount(puzzle);
        // Retorna true si el conteo de inversiones es par
    return (invCount % 2 == 0);
    }
    
    // ============================================================================
    // Limpia el board para que no se sobrepongan las piezas
    // ============================================================================
    clean(){
        if(this.pieces.length != 0){
            for(var i=0; i<9;i++){
                this.pieces[i].destroy();
            }
        }
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

export default Puzzle;