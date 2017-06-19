<?php
$pass = "u7kE;>=vzOxc]HmN9[";
$user = "u643208829_track";
$servername  = "sql57.hostinger.co.uk";
$conn = new mysqli($servername, $user, $pass);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>