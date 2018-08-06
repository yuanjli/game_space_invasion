// Fire the current chosen weapon: 
function fireWeapon() {
	//if those conditions are not met, you can't use this function:
	if (game.time.now < weaponTimer || player.life <= 0) {
		return;
	}
	//console.log('FIRE!');
	var weapon;
	if (WEAPONS[currentWeapon].name === 'Laser') {
		weapon = lasers.getFirstExists(false);
		pewpew.play();
	}
	else if (WEAPONS[currentWeapon].name === 'Missile') {
		weapon = missiles.getFirstExists(false);
		launch.play();
	}
	weapon.reset(player.x + WEAPONS[currentWeapon].offset, player.y + WEAPONS[currentWeapon].offset); // this line could also be (player.x, player.y)	
	weapon.body.velocity.x = WEAPONS[currentWeapon].velocity;
	weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
}

// Changes the weapons
function switchWeapon() {
	if (game.time.now < switchTimer) {
		return;
	}
	//console.log('switchWeapon!');
	currentWeapon++;
	if(currentWeapon >= WEAPONS.length){
		currentWeapon = 0;
	}
	switchTimer = game.time.now + SWITCH_WEAPON_TIMER;
}



