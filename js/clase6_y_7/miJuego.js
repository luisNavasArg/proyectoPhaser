//instanciamos la clase phaser ancho, alto, renderizado, id
let juego = new Phaser.Game(960, 600, Phaser.CANVAS, ' ',
	//funciones principales o nativas del phaser
	{preload:preload, create:create,update:update});
//declaramos variables en un objeto para usar en el juego
const jugadorStats={
	puntaje:0,
	salto:300,
	rebote:200,
	velocidad:300,
	jugadorTieneLlave:false
};
const GRAVEDAD=300;
let plataformas, jugador, enemigos,fuego,cursores,pickups,paredesInvisibles;
//declarar funciones palabra reservada nombreFuncion 
function preload(){
	//pre cargamos nuestro recursos 
	juego.load.image('fondo','imagenes/Pampa/fondo.png');
	juego.load.image('piso','imagenes/Pampa/piso.png');
	juego.load.image('plata_8x1','imagenes/Pampa/plataforma_8x1.png');
	juego.load.image('plata_6x1','imagenes/Pampa/plataforma_6x1.png');
	juego.load.image('plata_4x1','imagenes/Pampa/plataforma_4x1.png');
	juego.load.image('plata_2x1','imagenes/Pampa/plataforma_2x1.png');
	juego.load.image('plata_1x1','imagenes/Pampa/plataforma_1x1.png');
	juego.load.spritesheet('jugador', 'imagenes/Pampa/jugadora_f.png',33,49);


}

function create(){
	juego.add.image(0,0,'fondo');
	//agregamos la física al juego
	juego.physics.startSystem(Phaser.Physics.ARCADE);
	//agregar la gravedad
	juego.physics.arcade.gravity.y=GRAVEDAD;

	plataformas = juego.add.group();
	plataformas.enableBody=true;

	let piso = plataformas.create(0,546,'piso');
	let plat8A = plataformas.create(0,420, 'plata_8x1');
	let plat8B = plataformas.create(672,378, 'plata_8x1');
	let plat6A = plataformas.create(462,167, 'plata_6x1');
	let plat4A = plataformas.create(126,252, 'plata_4x1');
	let plat2A = plataformas.create(798,84, 'plata_2x1');
	let plat1A = plataformas.create(588,504, 'plata_1x1');
	
	for(let n=0; n < plataformas.children.length;n++){
		let elemento = plataformas.children[n];
		fijarEnLugar(elemento);
	}

	jugador = juego.add.sprite(21, 485, 'jugador');
	juego.physics.arcade.enable(jugador);
	jugador.body.collideWorldBounds = true;

	cursores = juego.input.keyboard.createCursorKeys();

	//animaciones
	jugador.animations.add('ocioso' , [0]);
	jugador.animations.add('correr' , [1,2], 8,true);
	jugador.animations.add('saltar' , [3]);
	jugador.animations.add('caer' , [4]);



	cursores.up.onDown.add(saltar, this);
	console.log("El jugador tiene "+jugadorStats.puntaje+"  puntos");
	console.log(jugadorStats.velocidad);
	console.log(jugadorStats.jugadorTieneLlave);
}

function update(){
	juego.physics.arcade.collide(jugador, plataformas);
	if(cursores.right.isDown){
		mover(1);
	}else if(cursores.left.isDown){
		mover(-1);
	}else{
		jugador.body.velocity.x=0;
		jugador.animations.play('ocioso');
	}
	if(jugador.body.touching.down && 
		jugador.body.velocity.x !=0){
		jugador.animations.play('correr');
	}else if(!jugador.body.touching.down &&
		jugador.body.velocity.y < 0){
		jugador.animations.play('saltar');
	}else if(!jugador.body.touching.down &&
		jugador.body.velocity.y >= 0){
		jugador.animations.play('caer');
	}
}
function aleatorio(){
	let numero = Math.floor(Math.random()*18);
	alert(numero);
}
function fijarEnLugar(obj){
	obj.body.moves=false;
	obj.body.immovable=true;
	
}
function mover(direccion){
	jugador.body.velocity.x = 
	jugadorStats.velocidad * direccion;

}
function saltar(){
	if(jugador.body.touching.down){
		jugador.body.velocity.y = -jugadorStats.salto;
	}
}

