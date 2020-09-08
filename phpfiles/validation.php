<?php
session_start();


$con=mysqli_connect('localhost','root');
if($con)
{
echo "connectin done";
}
else
{
echo "failed";
}
mysqli_select_db($con,'gamedatabase');
$name=$_POST['user'];
$pswd=$_POST['password'];
$q="select * from users where name='$name' && password='$pswd'";
$result=mysqli_query($con,$q);
$num=mysqli_num_rows($result);
if($num>=1)
{
	$_SESSION['username']=$name;
	header('location:../main.php');
}
else
{
	echo "NOT FOUND";
	header('location:login.php');
}
?>