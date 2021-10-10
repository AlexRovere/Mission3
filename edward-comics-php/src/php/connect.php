<?php
header("Access-Control-Allow-Origin: https://edward-comics.go.yj.fr/");
header("Content-Type: application/json; charset=UTF-8");

try {
    $bdd = new PDO('mysql:host=localhost;dbname=agenaayh_edward;charset=utf8', 'agenaayh_alex', 'Subar91000&'); // BDD EN LIGNE
    $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
