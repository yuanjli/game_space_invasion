//main.js
//This is the Space invasion game: learning coding from brandii 

// Local storages. 

console.log("main.js is loading well.")

// Main function for the game to start:
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
	init: init,
	preload: preload,
	create: create,
	update: update
});


var player, cursors;
//Initialize the game:
function init() {
	console.log('init');
}
// set the game physics:
function preload(){
	//console.log('preload');
	//Initialize arcade physics:
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// this preload the background and and player image for later use.
	game.load.image('bg', '../assets/img/cool-space-background.jpg');
	game.load.image('player', '../assets/img/ship.png');
	game.load.image('lasers', '../assets/img/beam.png');
	game.load.image('missile', '../assets/img/missile.png');
	game.load.image('enemy1', '../assets/img/enemy1.png');

	// Load animations 
	game.load.spritesheet('smallboom', '../assets/img/explosion.png', 64, 64);

	// Load audio files for later use:
	game.load.audio('music', '../assets/audio/Shadelike.mp3');
	game.load.audio('pewpew', ['../assets/audio/laser.ogg', '../assets/audio/laser.mp3']);
	game.load.audio('launch','../assets/audio/missile.mp3');
	game.load.audio('boom', ['../assets/audio/explosion.ogg', '../assets/audio/explosion.mp3']);
}

//The function create the game element:
function create(){
	//console.log('create');
	//create the background and make it scroll: 
	var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
	background.autoScroll(-30, 0);

	// Set up sounds 
	music = game.add.audio('music');
	pewpew = game.add.audio('pewpew', 0.1);
	launch = game.add.audio('launch', 0.5);
	boom = game.add.audio('boom', 0.8);
	music.play();

	//create the player, place it in the world, and give it life:
	player = game.add.sprite(100, 200, 'player');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.score = 0;
	player.life = STARTING_LIFE;

	// Create laser objects for shooting: 
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'lasers');
	lasers.setAll('outOfBoundsKill', true);
	lasers.setAll('checkWorldBounds', true);

	// Create missile objects
	missiles = game.add.group();
	missiles.enableBody = true;
	missiles.physicsBodyType = Phaser.Physics.ARCADE;
	// 10 is the most number of missiles will be on the screen:
	missiles.createMultiple(10, 'missile');
	missiles.setAll('outOfBoundsKill', true);
	missiles.setAll('checkWorldBounds', true);

	// Create enemies
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;
	// 50 is how many can be on the screen at the same time:
	enemies.createMultiple(50, 'enemy1');
	enemies.setAll('outOfBoundsKill', true);
	enemies.setAll('checkWorldBounds', true);
	enemies.forEach(function(enemy){
		enemy.life = ENEMY_LIFE;
	});

	// Create explosion: explosions
	explosions = game.add.group();
	explosions.createMultiple(10, 'smallboom');
	explosions.setAll('anchor.x', 0);
	explosions.setAll('anchor.y', 0);
	explosions.forEach(function(explosion){
		explosion.animations.add('smallboom');
	});


	//Add keyboard controls: 
	cursors = game.input.keyboard.createCursorKeys(); //Arrow Keys 
	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

	//Add Score and HP text to the screen: 
	hpText = game.add.text(GAME_WIDTH - 150, 20, 'Life: ' + player.life.toString(), {fill: '#fff'});
	scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 45, 'Score: ' + player.score.toString(), {fill: '#fff'});

	// Create enemies in a loop
	game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);


}

function update() {
	//console.log('update');
	player.body.velocity.set(0);
	//checks left and right: 
	if(cursors.left.isDown){
		player.body.velocity.x = -DEFAULT_SPEED;
	}
	else if(cursors.right.isDown){
		player.body.velocity.x = DEFAULT_SPEED;
	}
	//checks the up and down 
	if (cursors.up.isDown) {
		player.body.velocity.y = -DEFAULT_SPEED;
	}
	else if(cursors.down.isDown){
		player.body.velocity.y = DEFAULT_SPEED;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		// FIRE THE weapon:
		fireWeapon();
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
		switchWeapon();
	}
	// Define my desired collisions:
	game.physics.arcade.overlap(player, enemies, hurtPlayer); //, null, this);
	game.physics.arcade.overlap(lasers, enemies, weaponEnemy);
	game.physics.arcade.overlap(missiles, enemies, weaponEnemy);

}






















