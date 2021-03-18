<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try {
    // $bdd = new PDO('mysql:host=localhost; dbname=accajcdg_edward-comics;charset=UTF8', 'accajcdg_guest', 'qVgWJMxM342R9Dy'); // BDD EN LIGNE
    $bdd = new PDO('mysql:host=localhost; dbname=edward;charset=UTF8', 'root', ''); // BDD LOCAL 
    $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
 ?>
