<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    $bdd = new PDO('mysql:host=localhost;dbname=id16357062_edward_comics;charset=UTF8', 'root', '');
    $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
 ?>
