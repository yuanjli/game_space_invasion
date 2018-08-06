function addScore(amount){
	player.score += amount;
	scoreText.text = 'Score: ' + player.score.toString();

}

function gameOver(){
	console.log('Game Over!');
	music.pause();
	swal({
		title: 'Good job!',
		text: 'Thanks for playing!',
		type: 'warning', 
		showCancel: false,
		confirmButtonText: 'Cool',
		closeOnConfirm: true
	});
}