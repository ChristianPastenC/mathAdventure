class Bootloader extends Phaser.Scene {
    constructor(){ super({ key: "Bootloader" }); }
    init(data){
        this.character = data.personaje;
        this.nCoin = data.monedas;
        this.store = data.comprados;
        if(!this.character){    this.character = 'pirata_1'; }
        if(!this.nCoin)    {    this.nCoin = 18;             }
        if(!this.store)    {    this.store = [false,false];  } 
    }
    preloadBar() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(335, 165, 320, 50);

        let loadingText = this.make.text({
            x: width / 2 ,
            y: height / 2 - 35,
            text: 'Cargando ...',
            style: {
                font: '30px MiTica',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: (width / 2) - 10,
            y: (height / 2) + 5,
            text: '0%',
            style: {
                font: '18px MiTica',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(345, 175, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }

    preload(){
        this.preloadBar();
        this.load.path = "./assets/";
        
        // ============================================================================
        // Menu Principal
        // ============================================================================
        this.load.image('background','Inicio/back.jpg' );
        this.load.image('logo','Inicio/logo.png');
        this.load.image('frame','Inicio/container.png');
        this.load.image('bgCharacter','Inicio/backChoose.jpg');
        this.load.image('frameOpt','Inicio/optContainer.png');
        // ============================================================================
        // UI
        // ============================================================================
        this.load.image('btnBlock','GUI/btn_block.png');
        this.load.image('btnCar','GUI/btn_car.png');
        this.load.image('btnClose','GUI/btn_close.png');
        this.load.image('btnConfig','GUI/btn_config.png');
        this.load.image('btnDown','GUI/btn_down.png');
        this.load.image('btnHelp','GUI/btn_help.png');
        this.load.image('btnMusicOff','GUI/btn_musicOff.png');
        this.load.image('btnMusicOn','GUI/btn_musicOn.png');
        this.load.image('btnNext','GUI/btn_next.png');
        this.load.image('btnOk','GUI/btn_ok.png');
        this.load.image('btnPlay','GUI/btn_play.png');
        this.load.image('btnPrev','GUI/btn_prev.png');
        this.load.image('btnReload','GUI/btn_reload.png');
        this.load.image('btnUp','GUI/btn_up.png');
        this.load.image('btnInit','GUI/btn_init.png');
        this.load.atlas('coin', '/GUI/coin/coin.png',
                        '/GUI/coin/coin_atlas.json');
        this.load.animation('coinAnim', '/GUI/coin/coin_anim.json');
        // ============================================================================
        // Personajes
        // ============================================================================
        this.load.atlas('pirata_1', '/Personajes/pirata_1.png',
                        '/Personajes/pirata_1_atlas.json');
        this.load.animation('pirata_1Anim', '/Personajes/pirata_1_anim.json');
        this.load.atlas('pirata_2', '/Personajes/pirata_2.png',
                        '/Personajes/pirata_2_atlas.json');
        this.load.animation('pirata_2Anim', '/Personajes/pirata_2_anim.json');
        this.load.atlas('pirata_3', '/Personajes/pirata_3.png',
                        '/Personajes/pirata_3_atlas.json');
        
        this.load.animation('pirata_3Anim', '/Personajes/pirata_3_anim.json');
        // ============================================================================
        // Instrucciones
        // ============================================================================
        this.load.image('instruct1', '/Inicio/Instrucciones/1.png');
        this.load.image('instruct2', '/Inicio/Instrucciones/2.png');
        this.load.image('instruct3', '/Inicio/Instrucciones/3.png');
        this.load.image('instruct4', '/Inicio/Instrucciones/4.png');
        // ============================================================================
        // Sonidos
        // ============================================================================
        this.load.audio('mainSong', 'Sonidos/pirates_big_ship.mp3');
        // ============================================================================
        // Map Scene
        // ============================================================================
        this.load.image('mapFrame','Levels/mapFrame.png');
        this.load.image('waterTileSprite','Levels/waterTileSprite.png');
        this.load.image('shiptoDown','Levels/ship_down.png');
        this.load.image('shiptoLeft','Levels/ship_left.png');
        this.load.image('shiptoRight','Levels/ship_right.png');
        this.load.image('shiptoUp','Levels/ship_up.png');
        this.load.image('modal','Levels/modalContainer.png');
        //Islas
        this.load.image('isla1','Levels/islaA.png');
        this.load.image('isla2','Levels/islaB.png');
        this.load.image('isla4','Levels/islaD.png');
        this.load.image('isla5','Levels/islaE.png');
        this.load.image('isla6','Levels/islaF.png');
        this.load.image('isla7','Levels/islaG.png');
        this.load.image('isla8','Levels/islaH.png');
        // ============================================================================
        // Hanoi's Towers Scene
        // ============================================================================
        this.load.image('towersBack','Hanoi/back.png');
        this.load.image('towersFrame','Hanoi/frame.png');
        this.load.image('tower','Hanoi/tower.png');
        this.load.image('piece','Hanoi/piece.png');
        // ============================================================================
        // Puzzle Scene
        // ============================================================================
        this.load.image('puzzleBack', 'Puzzle/back.png');
        this.load.image('puzzleRef','Puzzle/puzzle.png');
        this.load.image('space', 'Puzzle/space.png');
        for(var i=1; i<9; i++){
            this.load.image('p'+i,'Puzzle/p'+i+'.png');
        }
        // ============================================================================
        // Maze Scene
        // ============================================================================
        this.load.image('mazeBack','Maze/back.png');
        this.load.image('wallH','Maze/wall.png');
        this.load.image('wallV','Maze/wallV.png');
        // ============================================================================
        // Magic Square Scene
        // ============================================================================
        this.load.image('squareBack','Square/back.png');
        this.load.image('square','Square/square.png');
        for(var i=1; i<=16; i++){ this.load.image('pSquare'+i,'Square/p'+i+'.png'); }
        // ============================================================================
        // Four Fours Scene
        // ============================================================================
        this.load.image('fourBack','Four/back.jpg');
        this.load.image('ship','Four/ship.png');
        for(var i=0; i<10; i++){ this.load.image('ec'+i,'Four/ec'+i+'.png'); }
        this.load.image('rope','Four/rope.png');
        // ============================================================================
        // Riddle Scene
        // ============================================================================
        this.load.image('riddleBack','Riddle/back.png');
        this.load.image('foxRiddle','Riddle/fox.png');
        this.load.image('henRiddle','Riddle/hen.png');
        this.load.image('boatRiddle','Riddle/boat.png');
        this.load.image('sackRiddle','Riddle/sack.png');
        this.load.image('dropRiddle','Riddle/drop.png');
        this.load.image('dropRiddleH','Riddle/dropH.png');
        this.load.image('waterRiddle','Riddle/water.png');
        // ============================================================================
        // Last Scene
        // ============================================================================
        this.load.image('lastBack', 'Last/back.png');
        this.load.image('lastSky', 'Last/sky.png');
    }

    create(){
        // ============================================================================
        // Pantalla Inicial
        // ============================================================================
        this.mainContainer = this.add.container(0,0);
        this.back = this.add.image(this.scale.width/2, this.scale.height/2,'background');
        this.logo = this.add.image(820,120,'logo').setRotation(0.2);
        this.btnPlay = this.add.image(500,360,'btnPlay').setScale(1.5).setInteractive();
        this.btnCar = this.add.image(350,400,'btnCar').setInteractive();
        this.btnConfig = this.add.image(650,400,'btnConfig').setInteractive();
        this.txtHow = this.add.text(0,425,'¿Cómo Jugar?',{font: "20px MiTica", fill:"#000000"}).setInteractive();
        this.mainContainer.add([
            this.back,this.logo,
            this.btnPlay,this.btnCar,this.btnConfig,
            this.txtHow,
        ]);

        //Sonidos
        this.musica = this.sound.add('mainSong', { loop: true, volume: 0.8 });

        // ============================================================================
        // Selección de personaje / Store
        // ============================================================================
        this.characterContainer = this.add.container(0,0);
        this.bgCharacter = this.add.image(this.scale.width/2,this.scale.height/2,'bgCharacter');
        this.frame = this.add.image(this.scale.width/2,this.scale.height/2,'frame');
        this.btnNext = this.add.image(750,300,'btnNext').setInteractive();
        this.btnPrev = this.add.image(250,300,'btnPrev').setInteractive();
        this.btnClose = this.add.image(940,30,'btnClose').setScale(0.5).setInteractive();
        this.refChar = this.add.image(100,70,'btnCar').setScale(1.5);
        this.p1Select = this.add.sprite(this.scale.width/2+30,300,'pirata_1');
        this.p2Select = this.add.sprite(this.scale.width/2+30,300,'pirata_2');
        this.p2Select.setVisible(false);
        this.p3Select = this.add.sprite(this.scale.width/2+30,300,'pirata_3');
        this.p3Select.setVisible(false);
        this.pCosto = this.add.text(600,360,'15',{font: "35px MiTica", fill:"#000000"}).setVisible(false);
        this.pCoin = this.add.sprite(670,380,'coin','gold_21').setScale(.5).setVisible(false); 
        this.txtCoin = this.add.text(470,0,this.nCoin,{font: "35px MiTica", fill:"#000000"});
        this.coin = this.add.sprite(540,20,'coin').setScale(.5);
        this.btnAceptChar = this.add.image(this.scale.width/2,420,'btnOk').setInteractive();
        this.characterContainer.add([
            this.bgCharacter,this.frame,
            this.btnPrev,this.btnNext,this.btnClose,
            this.refChar,
            this.p1Select,this.p2Select,this.p3Select,
            this.pCoin,this.pCosto,this.txtCoin,this.coin,
            this.btnAceptChar,
        ]);
        this.characterContainer.setVisible(false);
        this.characterTweens();

        // ============================================================================
        // Pantalla de Opciones (Activa/Desactiva Música)
        // ============================================================================
        this.optContainer = this.add.container(0,0);
        this.frameOpt = this.add.image(this.scale.width/2,this.scale.height/2,'frameOpt');
        this.closeOpt = this.add.image(780,120,'btnClose').setInteractive();
        this.musicOn = this.add.image(500,225,'btnMusicOn').setScale(1.5).setInteractive();
        this.musicOff = this.add.image(500,225,'btnMusicOff').setScale(1.5).setInteractive();
        this.musicOff.setVisible(false);
        this.optContainer.add([
            this.frameOpt,this.closeOpt,
            this.musicOn, this.musicOff,
        ]);
        this.optContainer.setVisible(false);
        // ============================================================================
        // Pantalla de Instrucciones (How to play)
        // ============================================================================
        this.howContainer = this.add.container(0,0);
        this.frameHow = this.add.image(this.scale.width/2,this.scale.height/2,'frameOpt');
        this.inst1 = this.add.image(this.scale.width/2,this.scale.height/2,'instruct1');
        this.inst2 = this.add.image(this.scale.width/2,this.scale.height/2,'instruct2').setVisible(false);
        this.inst3 = this.add.image(this.scale.width/2,this.scale.height/2,'instruct3').setVisible(false);
        this.inst4 = this.add.image(this.scale.width/2,this.scale.height/2,'instruct4').setVisible(false);
        this.closeHow = this.add.image(780,90,'btnClose').setInteractive().setScale(.75);
        this.nextHow = this.add.image(800,225,'btnNext').setInteractive().setScale(.6);
        this.prevHow = this.add.image(200,225,'btnPrev').setInteractive().setScale(.6);
        this.howContainer.add([
            this.frameHow, this.inst1,
            this.inst2, this.inst3, this.inst4,
            this.closeHow, this.nextHow, this.prevHow
        ]);
        this.howContainer.setVisible(false);
        // ============================================================================
        // Funcion de botones (Pantalla Inicial)
        // ============================================================================
        // Iniciar juego
        this.btnPlay.on('pointerover', () => {  this.btnPlay.setScale(1.6); });
        this.btnPlay.on('pointerout',  () => {   this.btnPlay.setScale(1.5); });
        this.btnPlay.on('pointerup',   () => {
            this.scene.start('Levels', {
                personaje: this.character,
                monedas: this.nCoin,
                comprados: this.store,
            });
        });
        // Abrir seleccion de personajes
        this.btnCar.on('pointerover', () => {   this.btnCar.setScale(1.1);  });
        this.btnCar.on('pointerout',  () => {    this.btnCar.setScale(1);    });
        this.btnCar.on('pointerup',   () => {
            this.mainContainer.setVisible(false);
            this.characterContainer.setVisible(true);
        });
        // Abrir configuracion
        this.btnConfig.on('pointerover', () => {  this.btnConfig.setScale(1.1);   });
        this.btnConfig.on('pointerout',  () =>  {  this.btnConfig.setScale(1);     });
        this.btnConfig.on('pointerup',   () =>   {  this.optContainer.setVisible(true); }); 
        // Instrucciones
        this.txtHow.on('pointerover', () => { this.txtHow.setScale(1.1);  });
        this.txtHow.on('pointerout',  () => {  this.txtHow.setScale(1);  });
        this.txtHow.on('pointerup',   () => {  this.howContainer.setVisible(true);  });
        // ============================================================================
        // Funcion de botones (Pantalla de Personajes)
        // ============================================================================
        // Cerrar Ventana
        this.btnClose.on('pointerover', () => { this.btnClose.setScale(0.6); });
        this.btnClose.on('pointerout',  () => { this.btnClose.setScale(0.5); });
        this.btnClose.on('pointerup',   () => {
            this.characterContainer.setVisible(false);
            this.mainContainer.setVisible(true);
        });
        // Aceptar/Comprar personaje 
        this.btnAceptChar.on('pointerover', () => { this.btnAceptChar.setScale(1.1); });
        this.btnAceptChar.on('pointerout',  () => { this.btnAceptChar.setScale(1); });
        this.btnAceptChar.on('pointerup',   () => {
            if(this.p1Select.visible == true){
                this.character = 'pirata_1';
            }else if(this.p2Select.visible == true){
                this.buyCharacter(this.nCoin,0) ?
                 this.character = 'pirata_2': this.character = 'pirata_1';
            }else{
                this.buyCharacter(this.nCoin,1) ?
                 this.character = 'pirata_3': this.character = 'pirata_1';
            }
            this.characterContainer.setVisible(false);
            this.mainContainer.setVisible(true);   
        });
        // Flecha hacía atrás
        this.btnPrev.on('pointerover', () => { this.btnPrev.setScale(1.1); });
        this.btnPrev.on('pointerout',  () => { this.btnPrev.setScale(1); });
        this.btnPrev.on('pointerup',   () => {
            if(this.p1Select.visible == true){
                this.p1Select.setVisible(false);
                this.p3Select.setVisible(true);
                this.available();
            }else if(this.p2Select.visible == true){
                this.p2Select.setVisible(false);
                this.p1Select.setVisible(true);
                this.pCoin.setVisible(false);
                this.pCosto.setVisible(false);
            }else{
                this.p3Select.setVisible(false);
                this.p2Select.setVisible(true);
                this.available();
            }
        });
        // Flecha hacía delante
        this.btnNext.on('pointerover', () => { this.btnNext.setScale(1.1); });
        this.btnNext.on('pointerout',  () => { this.btnNext.setScale(1); });
        this.btnNext.on('pointerup',   () => {
            if(this.p1Select.visible == true){
                this.p1Select.setVisible(false);
                this.p2Select.setVisible(true);
                this.available();
            }else if(this.p2Select.visible == true){
                this.p2Select.setVisible(false);
                this.p3Select.setVisible(true);
                this.available();
            }else{
                this.p3Select.setVisible(false);
                this.p1Select.setVisible(true);
                this.pCoin.setVisible(false);
                this.pCosto.setVisible(false);
            }
        });
        // ============================================================================
        // Funcion de botones (Pantalla de Opciones)
        // ============================================================================
        // Cerrar ventana
        this.closeOpt.on('pointerover', () => { this.closeOpt.setScale(1.1); });
        this.closeOpt.on('pointerout',  () => { this.closeOpt.setScale(1); });
        this.closeOpt.on('pointerup',   () => { this.optContainer.setVisible(false); });
        // Desactivar música
        this.musicOff.on('pointerover', () => { this.musicOff.setScale(1.6); });
        this.musicOff.on('pointerout',  () => { this.musicOff.setScale(1.5); });
        this.musicOff.on('pointerup',   () => {
            this.musicOff.setVisible(false);
            this.musicOn.setVisible(true);
            this.musica.stop();
        });
        // Activa música
        this.musicOn.on('pointerover', () => { this.musicOn.setScale(1.6); });
        this.musicOn.on('pointerout',  () => {  this.musicOn.setScale(1.5); });
        this.musicOn.on('pointerup',   () => {
            this.musicOff.setVisible(true);
            this.musicOn.setVisible(false);
            this.musica.play();
        });
        // ============================================================================
        // Funcion de botones (Pantalla de Instrucciones)
        // ============================================================================
        // Cerrar ventana
        this.closeHow.on('pointerover', () => { this.closeHow.setScale(.8); });
        this.closeHow.on('pointerout',  () => { this.closeHow.setScale(.75); });
        this.closeHow.on('pointerup',   () => { this.howContainer.setVisible(false); });
        // Flecha hacía atrás
        this.prevHow.on('pointerover', () => { this.prevHow.setScale(.7); });
        this.prevHow.on('pointerout',  () => { this.prevHow.setScale(.6); });
        this.prevHow.on('pointerup',   () => {
            if(this.inst1.visible == true){
                this.inst1.setVisible(false);
                this.inst4.setVisible(true);
            }else if(this.inst2.visible == true){
                this.inst2.setVisible(false);
                this.inst1.setVisible(true);
            }else if(this.inst3.visible == true){
                this.inst3.setVisible(false);
                this.inst2.setVisible(true);
            }else{
                this.inst4.setVisible(false);
                this.inst3.setVisible(true);
            }
        });
        // Flecha hacía delante
        this.nextHow.on('pointerover', () => { this.nextHow.setScale(.7); });
        this.nextHow.on('pointerout',  () => { this.nextHow.setScale(.6); });
        this.nextHow.on('pointerup',   () => {
            if(this.inst1.visible == true){
                this.inst1.setVisible(false);
                this.inst2.setVisible(true);
            }else if(this.inst2.visible == true){
                this.inst2.setVisible(false);
                this.inst3.setVisible(true);
            }else if(this.inst3.visible == true){
                this.inst3.setVisible(false);
                this.inst4.setVisible(true);
            }else{
                this.inst4.setVisible(false);
                this.inst1.setVisible(true);
            }
        });
    }
    // ============================================================================
    // Función que agrega interpolaciones al personaje mostrado
    // ============================================================================
    characterTweens(){
        let a, b, c;
        this.add.tween({
            targets: [this.characterContainer],
            loop: -1,
            onStart: (tween, obj, target) => {
                a = this.p1Select;
                a.anims.play('idle', true);
                b = this.p2Select;
                b.anims.play('idle2', true);
                c = this.p3Select;
                c.anims.play('idle3', true);
            },
        });
        this.add.tween({
            targets: [this.coin], loop: -1,
            onStart: (tween, obj, target) => { obj[0].anims.play('rotate',true); },
        });
    }
    // ============================================================================
    // Comprobar si han sido o no comprados los personajes
    // ============================================================================
    available(){
        if(this.store[0] == false && this.p2Select.visible == true){
            this.p2Select.setTint(0x696969);
            this.pCoin.setVisible(true);
            this.pCosto.setVisible(true);
        }else if(this.store[0] == true && this.p2Select.visible == true ){
            this.p2Select.clearTint();
            this.pCoin.setVisible(false);
            this.pCosto.setVisible(false);
        }
        if(this.store[1] == false && this.p3Select.visible == true ){
            this.p3Select.setTint(0x696969);
            this.pCoin.setVisible(true);
            this.pCosto.setVisible(true);
        }else if( this.store[1] == true && this.p3Select.visible == true ){
            this.p3Select.clearTint();
            this.pCoin.setVisible(false);
            this.pCosto.setVisible(false);
        }
    }
    // ============================================================================
    // Comprar personaje
    // ============================================================================
    buyCharacter(coins, refChar){
        let resp = false;
        if(this.store[refChar] == false){
            if(coins >= 15){
                var r = confirm("Confirma tu compra de personaje");
                if (r == true) {
                    this.store[refChar] = true;
                    this.nCoin -= 15;
                    this.available();
                    this.txtCoin.setText(this.nCoin);
                    resp = true;
                }
            }else{
                alert('Aún no tienes monedas suficientes para comprar este personaje');
            }
        }else{
            resp = true;
        }
    return resp;
    }
}
export default Bootloader;