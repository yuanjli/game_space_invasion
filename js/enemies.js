
function spawnEnemy(){
	//console.log('CREATE ENEMY!');
	var enemy = enemies.getFirstExists(false);
	//set the enemy in the world
	enemy.reset(GAME_WIDTH - 10, game.rnd.integerInRange(50, GAME_HEIGHT - 50));
	enemy.body.velocity.x = -250;
	enemy.life = ENEMY_LIFE;
}

function hurtPlayer(player, enemy){
	//console.log('ow');
	boom.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(player.body.x, player.body.y);
	explosion.play('smallboom', 30, false, true);

	// Logic
	enemy.kill();
	player.life -= 25;
	hpText.text = 'life: ' + player.life.toString();

	if(player.life <= 0){
		player.kill();
		gameOver();
		//to do: game over function
	}else if(player.life <= 100){
		player.tint = '0xff0000';
	}
}

function weaponEnemy(weapon, enemy){
	// Sounds and visual effects 
	boom.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x, enemy.body.y);
	explosion.play('smallboom', 30, false, true);

	// Game Logic:
	enemy.life -= WEAPONS[currentWeapon].damage;
 	if(enemy.life <= 0){
 		enemy.kill();
 		addScore(10);
 	}
	weapon.kill();
}	
