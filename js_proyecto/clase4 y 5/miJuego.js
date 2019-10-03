//instanciamos la clase phaser ancho, alto, renderizado, id
let juego = new Phaser.Game(960, 600, Phaser.CANVAS, ' ',
	//funciones principales o nativas del phaser
	{preload:preload, create:create,update:update});
//declaramos variables para usar en el juego
const jugadorStats={
	puntaje:0,
	salto:400,
	rebote:200,
	velocidad:300,
	jugadorTieneLlave:false
};
const GRAVEDAD=300;
let plataformas,enemigos,fuego,cursores,pickups,paredesInvisibles;
//declarar funciones palabra reservada nombreFuncion 
function preload(){
	//pre cargamos nuestro recursos 
	juego.load.image('fondo','imagenes/Pampa/fondo.png');
	juego.load.image('piso','imagenes/Pampa/piso.png');

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

	console.log("El jugador tiene "+jugadorStats.puntaje+"  puntos");
	console.log(jugadorStats.velocidad);
	console.log(jugadorStats.jugadorTieneLlave);
}

function update(){
	
}
function aleatorio(){
	let numero = Math.floor(Math.random()*18);
	alert(numero);
}