// Game-wide constants
var GAME_HEIGHT = 500;
var GAME_WIDTH = 800;
var DEFAULT_SPEED = 300;
var STARTING_LIFE = 150;
var ENEMY_LIFE = 100;
var SWITCH_WEAPON_TIMER = 1000;
var WEAPONS = [
	{name: 'Laser', velocity: 450, timer: 150, offset: 20, damage: 25},
	{name: 'Missile', velocity: 275, timer: 500, offset: 20, damage: 100}
];

// GLOBALS VARIABLES
var player;
var enemies;
var lasers; 
var explosions;
var cursors;
var music, pewpew;
var scoreText, hpText;
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;





