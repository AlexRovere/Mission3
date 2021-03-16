<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    $bdd = new PDO('mysql:host=localhost;dbname=id16357062_edward_comics;', 'id16357062_sarox', 'Azertyuiop-123456789');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
 ?>
