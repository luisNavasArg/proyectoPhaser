//inicializar el juego
let juego = new Phaser.Game(724, 700, Phaser.CANVAS, '', {
    preload: cargandoRecursos,
    create: creandoElJuego,
    update: verificando
});

function cargandoRecursos() {
    console.log('cargandoRecursos');
}

function creandoElJuego() {
    console.log('creandoElJuego');

}
let numero = 0;

function verificando() {
    console.log(numero);
    numero++;
}