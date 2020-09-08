<?php

session_start();

?>




<!DOCTYPE html>
<html>
<head>
	<title>GameZone</title>
	<link rel="stylesheet" type="text/css" href="css/mainstyle.css">
	<link href='https://fonts.googleapis.com/css?family=Amita' rel='stylesheet'>
	<link href='https://fonts.googleapis.com/css?family=Arizonia' rel='stylesheet'>
</head>
<body>
	<h1 class="glow">WELCOME TO GAME ZONE</h1>>
	<h3>HEY <?php echo $_SESSION['username']; ?></h3>
  <h2>CHOOSE ONE AND GO AHEAD</h2>

	<div id="myNav" class="overlay">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <div class="overlay-content">
    <a href="snakegame.html">Catch the Cup cake</a>
    <a href="ticktack.html">Tick Tack</a>
    <a href="#">Guess the Word</a>
    <a href="#">Other</a>
  </div>
</div>


<p>Click on the element below to get the game lists.</p>
<a href="phpfiles/logout.php"> LOG OUT</a>
<br>

<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

<script>
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
</script>

</body>
</html>