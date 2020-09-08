<?php
session_start();
header('location:login.php');

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
	echo "USERS EXIST";
}
else
{
	$qy="insert into users(name,password) values('$name','$pswd')";
	mysqli_query($con,$qy);

}
?>