class Levels extends Phaser.Scene {
    
    constructor(){
        super({
            key: "Levels"
        });
    }

    init(data){
        console.log('Levels Scene');
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
        this.ship;
    }

    create(){
        const eventos = Phaser.Input.Events;
        // ============================================================================
        // Elementos background
        // ============================================================================
        this.water = this.add.tileSprite(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height, "waterTileSprite");
        this.water.setScrollFactor(0);
        this.frame = this.add.image(this.scale.width/2,this.scale.height/2,'mapFrame').setDepth(1);
        this.frame.setScrollFactor(0);
        // ============================================================================
        // Elementos Utilizables
        // ============================================================================
        this.island1 = this.physics.add.image(750,350,'isla1');
        this.island2 = this.physics.add.image(1050,60,'isla2').setScale(.9);
        this.island4 = this.physics.add.image(1600,300,'isla4').setScale(.75);
        this.island5 = this.physics.add.image(2100,100,'isla5').setScale(1,.75);
        this.island6 = this.physics.add.image(2100,380,'isla6').setScale(.75);
        this.island7 = this.physics.add.image(2800,350,'isla7');
        this.island8 = this.physics.add.image(3400,250,'isla8');
        this.ship = this.add.rectangle(150,100,30,30);
        this.physics.add.existing(this.ship);
        this.shipRight = this.physics.add.image(150,75,'shiptoRight');
        this.shipDown = this.physics.add.image(150,75,'shiptoDown');
        this.shipDown.setVisible(false);
        this.shipLeft = this.physics.add.image(150,75,'shiptoLeft');
        this.shipLeft.setVisible(false);
        this.shipUp = this.physics.add.image(150,75,'shiptoUp');
        this.shipUp.setVisible(false);
        // ============================================================================
        // Interfaz y decoración
        // ============================================================================
        //Boton de salida
        this.btnExit = this.add.image(970,28,'btnClose').setScale(.7).setInteractive().setDepth(2);
        this.btnExit.setScrollFactor(0);
        //Botones de movimiento
        this.btnUp = this.add.image(920,340,'btnUp').setScale(0.8).setInteractive().setDepth(2);
        this.btnUp.setScrollFactor(0);
        this.btnDown = this.add.image(920,420,'btnDown').setScale(0.8).setInteractive().setDepth(2);
        this.btnDown.setScrollFactor(0);
        this.btnLeft = this.add.image(870,380,'btnPrev').setScale(0.8).setInteractive().setDepth(2);
        this.btnLeft.setScrollFactor(0);
        this.btnRight = this.add.image(970,380,'btnNext').setScale(0.8).setInteractive().setDepth(2);
        this.btnRight.setScrollFactor(0);
        //Personaje
        this.personaje = this.add.sprite(90,this.scale.height-80,this.personajeAct).setScale(0.75).setDepth(2);
        this.personaje.setScrollFactor(0);
        //Monedas
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"}).setDepth(2);
        this.txtCoin.setScrollFactor(0);
        this.coin = this.add.sprite(540,20,'coin').setDepth(2).setScale(.5);
        this.coin.setScrollFactor(0);
        this.authomaticTweens();
        // ============================================================================
        // Función de botones principales
        // ============================================================================
        //Boton de salida
        this.btnExit.on('pointerover', () => {
            this.btnExit.setScale(0.8);
        });
        this.btnExit.on('pointerout', () => {
            this.btnExit.setScale(0.7);
        });
        this.btnExit.on('pointerup', () => {
            this.scene.start('Bootloader', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        //Movimiento hacia arriba
        this.btnUp.on('pointerover', () => {
            this.btnUp.setScale(0.9);
            this.upPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(true);
        });
        this.btnUp.on('pointerout', () => {
            this.btnUp.setScale(0.8);
            this.upPressed = false;
        });
        this.btnUp.on('pointerup', () => {
            this.upPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(true);
        });
        //Movimiento hacia abajo
        this.btnDown.on('pointerover', () => {
            this.btnDown.setScale(0.9);
            this.downPressed = true;
            this.shipDown.setVisible(true);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(false);
        });
        this.btnDown.on('pointerout', () => {
            this.btnDown.setScale(0.8);
            this.downPressed = false;
        });
        this.btnDown.on('pointerup', () => {
            this.downPressed = true;
            this.shipDown.setVisible(true);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(false);
        });
        //Movimiento a la Izquierda
        this.btnLeft.on('pointerover', () => {
            this.btnLeft.setScale(0.9);
            this.leftPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(true);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(false);
        });
        this.btnLeft.on('pointerout', () => {
            this.btnLeft.setScale(0.8);
            this.leftPressed = false;
        });
        this.btnLeft.on('pointerup', () => {
            this.leftPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(true);
            this.shipRight.setVisible(false);
            this.shipUp.setVisible(false);
        });
        //Movimiento a la Derecha
        this.btnRight.on('pointerover', () => {
            this.btnRight.setScale(0.9);
            this.rightPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(true);
            this.shipUp.setVisible(false);
        });
        this.btnRight.on('pointerout', () => {
            this.btnRight.setScale(0.8);
            this.rightPressed = false;
        });
        this.btnRight.on('pointerup', () => {
            this.rightPressed = true;
            this.shipDown.setVisible(false);
            this.shipLeft.setVisible(false);
            this.shipRight.setVisible(true);
            this.shipUp.setVisible(false);
        });
        // ============================================================================
        //  Configuración de Cámara (sigue al barco al moverse) 
        // ============================================================================
        this.cameras.main.setBounds(0, 0,  3600, 450);
        this.cameras.main.startFollow(this.shipRight);
        this.cameras.main.followOffset.set(200, 0);
        // ============================================================================
        //  Configuración de Colisiones
        // ============================================================================
        this.physics.add.collider(this.ship,this.island1, ()=> {
            this.desactivaMovimiento();
            this.container1.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island2, ()=> {
            this.desactivaMovimiento();
            this.container2.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island4, ()=> {
            this.desactivaMovimiento();
            this.container4.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island5, ()=> {
            this.desactivaMovimiento();
            this.container5.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island6, ()=> {
            this.desactivaMovimiento();
            this.container6.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island7, ()=> {
            this.desactivaMovimiento();
            this.container7.setVisible(true);
        });
        this.physics.add.collider(this.ship,this.island8, ()=> {
            this.desactivaMovimiento();
            this.container8.setVisible(true);
        });
        // ============================================================================
        //  Creación de Modales
        // ============================================================================
        // Modal Nivel Uno
        this.container1 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal1 = this.add.image(0,0,'modal');
        this.closeModal1 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init1 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText1 = this.add.text(-320, -100,
                        '\n   Un 8 puzzle es un juego que consta de una cuadrícula\n'+
                        '     de 3x3. Con uno de los cuadrados vacío, el objetivo\n'+
                        '       es mover los cuadros de alrededor en diferentes\n'+
                        '         posiciones, hasta formar la figura mostrada.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container1.add([
            this.modal1, this.closeModal1, this.init1, this.infoText1,
        ]);
        this.container1.setVisible(false);
        this.modal1.setScrollFactor(0);
        this.closeModal1.setScrollFactor(0);
        this.init1.setScrollFactor(0);
        this.container1.setScrollFactor(0);
        this.infoText1.setScrollFactor(0);
        // Modal Nivel Dos
        this.container2 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal2 = this.add.image(0,0,'modal');
        this.closeModal2 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init2 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText2 = this.add.text(-320, -100,
                        '    Los 4 Cuatros es un problema que consiste en formar\n'+
                        '    los números del 0 al 9 usando solamente 4 númetos 4\n'+
                        '    y operaciones como la suma o resta, por ejemplo, para\n'+
                        '    obtener el 10 debes restar 4 a 44 y dividirlo entre 4.\n'+
                        '    Relaciona los barcos con las expresiones matemáticas\n'+
                        '    uno a la vez hasta que todos desaparezcan para ganar.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container2.add([
            this.modal2, this.closeModal2, this.init2, this.infoText2,
        ]);
        this.container2.setVisible(false);
        this.modal2.setScrollFactor(0);
        this.closeModal2.setScrollFactor(0);
        this.init2.setScrollFactor(0);
        this.container2.setScrollFactor(0);
        this.infoText2.setScrollFactor(0);
        // Modal Nivel Cuatro
        this.container4 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal4 = this.add.image(0,0,'modal');
        this.closeModal4 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init4 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText4 = this.add.text(-320, -100, 
                        '       Un cuadrado mágico es una tabla compuesto de\n'+
                        '       4x4 celdas (16 en total), donde cada celda debe\n'+
                        '       contener un único número entero. La suma de los\n'+
                        '       números presentes enuna fila, columna o diagonal\n'+
                        '       deben dar siempre el mismo resultado. A esta suma\n'+
                        '       se le llama "número mágico" o "constante mágica".',
                        {font: "25px MiTica", fill:"#000000"});
        this.container4.add([
            this.modal4, this.closeModal4, this.init4, this.infoText4,
        ]);
        this.container4.setVisible(false);
        this.modal4.setScrollFactor(0);
        this.closeModal4.setScrollFactor(0);
        this.init4.setScrollFactor(0);
        this.container4.setScrollFactor(0);
        this.infoText4.setScrollFactor(0);
        // Modal Nivel Cinco
        this.container5 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal5 = this.add.image(0,0,'modal');
        this.closeModal5 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init5 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText5 = this.add.text(-320, -100, 
                        'Las Torres de Hanoi es un rompecabezas matemático que\n'+
                        'consiste en mover 4 piezas de la primera a la tercera torre.\n\n'+
                        '-Solo se puede mover un disco a la vez. \n'+
                        '-Una pieza grande no puede estar sobre una más pequeña. \n'+
                        '-Solo se puede desplazar la pieza de arriba en cada poste. \n',
                        {font: "25px MiTica", fill:"#000000"});
        this.container5.add([
            this.modal5, this.closeModal5, this.init5, this.infoText5,
        ]);
        this.container5.setVisible(false);
        this.modal5.setScrollFactor(0);
        this.closeModal5.setScrollFactor(0);
        this.init5.setScrollFactor(0);
        this.container5.setScrollFactor(0);
        this.infoText5.setScrollFactor(0);
        // Modal Nivel Seis
        this.container6 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal6 = this.add.image(0,0,'modal');
        this.closeModal6 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init6 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText6 = this.add.text(-320, -100, 
                        '\n    Un laberinto es un juego estilo rompecabezas, con \n'+
                        '       diversos grados de complejidad. El objetivo del \n'+
                        '  laberinto es encontrar el camino desde la entrada hasta\n'+
                        '   la salida. Entrenan la capacidad de pensar de forma \n'+
                        '             lógica y la toma óptima de decisiones.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container6.add([
            this.modal6, this.closeModal6, this.init6, this.infoText6,
        ]);
        this.container6.setVisible(false);
        this.modal6.setScrollFactor(0);
        this.closeModal6.setScrollFactor(0);
        this.init6.setScrollFactor(0);
        this.container6.setScrollFactor(0);
        this.infoText6.setScrollFactor(0);
        // Modal Nivel Siete
        this.container7 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal7 = this.add.image(0,0,'modal');
        this.closeModal7 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init7 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText7 = this.add.text(-320, -100, 
                        '        En esta isla un pirata tiene que cruzar un río\n'+
                        '   con un zorro, un pollo y un saco de maíz. Tiene un bote,\n'+
                        '   y sólo puede llevar con él una cosa a la vez. Si el zorro\n'+
                        '         y el pollo quedan solos, el zorro se come al pollo. \n'+
                        '   Si el pollo y el maíz quedan solos, el pollo se come el maíz\n'+
                        '              Ayuda al pirata a cumplir su objetivo.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container7.add([
            this.modal7, this.closeModal7, this.init7, this.infoText7,
        ]);
        this.container7.setVisible(false);
        this.modal7.setScrollFactor(0);
        this.closeModal7.setScrollFactor(0);
        this.init7.setScrollFactor(0);
        this.container7.setScrollFactor(0);
        this.infoText7.setScrollFactor(0);
        // Modal Nivel Ocho
        this.container8 = this.add.container(this.scale.width/2,this.scale.height/2);
        this.modal8 = this.add.image(0,0,'modal');
        this.closeModal8 = this.add.image(270,-130,'btnClose').setScale(0.75).setInteractive();
        this.init8 = this.add.image(0,120,'btnInit').setInteractive();
        this.infoText8 = this.add.text(-320, -100, 
                        '    En esta isla se realiza la repartición de un tesoro, de un\n'+
                        '       total de 35 monedas, el primer pirata debe recibir la\n'+
                        '         mitad, el segundo una tercera parte y el último la \n'+
                        '          novena parte del total. Ayuda a los tres piratas\n'+
                        '              a saber cuantas monedas recibirá cada uno.\n'+
                        '                Pista: Usa las monedas que has ganado.',
                        {font: "25px MiTica", fill:"#000000"});
        this.container8.add([
            this.modal8, this.closeModal8, this.init8, this.infoText8,
        ]);
        this.container8.setVisible(false);
        this.modal8.setScrollFactor(0);
        this.closeModal8.setScrollFactor(0);
        this.init8.setScrollFactor(0);
        this.container8.setScrollFactor(0);
        this.infoText8.setScrollFactor(0);
        // ============================================================================
        //  Función de botones en modales
        // ============================================================================
        // Modal Nivel Uno
        this.closeModal1.on('pointerover', () => {
            this.closeModal1.setScale(.8);
        });
        this.closeModal1.on('pointerout', () => {
            this.closeModal1.setScale(.75);
        });
        this.closeModal1.on('pointerup', () => {
            this.container1.setVisible(false);
            this.initialPosition();
        });

        this.init1.on('pointerover', () => {
            this.init1.setScale(1.1);
        });
        this.init1.on('pointerout', () => {
            this.init1.setScale(1);
        });
        this.init1.on('pointerup', () => {
            console.log('Inicia Nivel 1');
            this.scene.start('Puzzle', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Dos
        this.closeModal2.on('pointerover', () => {
            this.closeModal2.setScale(.8);
        });
        this.closeModal2.on('pointerout', () => {
            this.closeModal2.setScale(.75);
        });
        this.closeModal2.on('pointerup', () => {
            this.container2.setVisible(false);
            this.initialPosition();
        });

        this.init2.on('pointerover', () => {
            this.init2.setScale(1.1);
        });
        this.init2.on('pointerout', () => {
            this.init2.setScale(1);
        });
        this.init2.on('pointerup', () => {
            console.log('Inicia Nivel 2');
            this.scene.start('Four', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Cuatro
        this.closeModal4.on('pointerover', () => {
            this.closeModal4.setScale(.8);
        });
        this.closeModal4.on('pointerout', () => {
            this.closeModal4.setScale(.75);
        });
        this.closeModal4.on('pointerup', () => {
            this.container4.setVisible(false);
            this.initialPosition();
        });

        this.init4.on('pointerover', () => {
            this.init4.setScale(1.1);
        });
        this.init4.on('pointerout', () => {
            this.init4.setScale(1);
        });
        this.init4.on('pointerup', () => {
            this.scene.start('Square', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Cinco
        this.closeModal5.on('pointerover', () => {
            this.closeModal5.setScale(.8);
        });
        this.closeModal5.on('pointerout', () => {
            this.closeModal5.setScale(.75);
        });
        this.closeModal5.on('pointerup', () => {
            this.container5.setVisible(false);
            this.initialPosition();
        });

        this.init5.on('pointerover', () => {
            this.init5.setScale(1.1);
        });
        this.init5.on('pointerout', () => {
            this.init5.setScale(1);
        });
        this.init5.on('pointerup', () => {
            console.log('Inicia Nivel 5');
            this.scene.start('Hanoi', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Seis
        this.closeModal6.on('pointerover', () => {
            this.closeModal6.setScale(.8);
        });
        this.closeModal6.on('pointerout', () => {
            this.closeModal6.setScale(.75);
        });
        this.closeModal6.on('pointerup', () => {
            this.container6.setVisible(false);
            this.initialPosition();
        });

        this.init6.on('pointerover', () => {
            this.init6.setScale(1.1);
        });
        this.init6.on('pointerout', () => {
            this.init6.setScale(1);
        });
        this.init6.on('pointerup', () => {
            this.scene.start('Maze', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Siete
        this.closeModal7.on('pointerover', () => {
            this.closeModal7.setScale(.8);
        });
        this.closeModal7.on('pointerout', () => {
            this.closeModal7.setScale(.75);
        });
        this.closeModal7.on('pointerup', () => {
            this.container7.setVisible(false);
            this.initialPosition();
        });

        this.init7.on('pointerover', () => {
            this.init7.setScale(1.1);
        });
        this.init7.on('pointerout', () => {
            this.init7.setScale(1);
        });
        this.init7.on('pointerup', () => {
            console.log('Inicia Nivel 7');
            this.scene.start('Riddle', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });

        // Modal Nivel Ocho
        this.closeModal8.on('pointerover', () => {
            this.closeModal8.setScale(.8);
        });
        this.closeModal8.on('pointerout', () => {
            this.closeModal8.setScale(.75);
        });
        this.closeModal8.on('pointerup', () => {
            this.container8.setVisible(false);
            this.initialPosition();
        });

        this.init8.on('pointerover', () => {
            this.init8.setScale(1.1);
        });
        this.init8.on('pointerout', () => {
            this.init8.setScale(1);
        });
        this.init8.on('pointerup', () => {
            console.log('Inicia Nivel 8');
            this.scene.start('Last', {
                personaje: this.personajeAct,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
    }

    update(time, delta){
        this.water.tilePositionX += .75;
        
        if(this.downPressed == true && this.shipDown.y <= 360){
            this.ship.y += 2.5;
            this.shipDown.y += 2.5;
            this.shipLeft.y += 2.5;
            this.shipRight.y += 2.5;
            this.shipUp.y += 2.5;
        }
        if(this.leftPressed == true && this.shipLeft.x >= 100){
            this.ship.x -= 2.5;
            this.shipDown.x -= 2.5;
            this.shipLeft.x -= 2.5;
            this.shipRight.x -= 2.5;
            this.shipUp.x -= 2.5;
        }
        if(this.rightPressed == true && this.shipRight.x <= 3450){
            this.ship.x += 2.5;
            this.shipDown.x += 2.5;
            this.shipLeft.x += 2.5;
            this.shipRight.x += 2.5;
            this.shipUp.x += 2.5;
        }
        if(this.upPressed == true && this.shipUp.y >= 50){
            this.ship.y -= 2.5;
            this.shipDown.y -= 2.5;
            this.shipLeft.y -= 2.5;            
            this.shipRight.y -= 2.5;
            this.shipUp.y -= 2.5;
        }
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
    // Regresa el barco a la posición inicial
    // ============================================================================
    initialPosition(){
        this.ship.x = 150;
        this.ship.y = 100;
        this.shipDown.x = 150;
        this.shipDown.y = 75;
        this.shipLeft.x = 150;
        this.shipLeft.y = 75;
        this.shipRight.x = 150;
        this.shipRight.y = 75;
        this.shipUp.x = 150;
        this.shipUp.y = 75;
    }
    // ============================================================================
    // Cancela el movimiento del barco al chocar con una isla
    // ============================================================================
    desactivaMovimiento(){
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
    }
}

export default Levels;