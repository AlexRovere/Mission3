<?php

require 'connect.php';

$theme = $_GET['theme'];
$valeur = $_GET['valeur'];

$policies = [];
$sql = $bdd->prepare("SELECT * FROM comics WHERE $theme = '$valeur'");
$sql -> execute();
$results = $sql->fetchAll();
if (count($results) > 0) {
  
  foreach ($results as $donnees) {
    $policies[] =  $donnees;      
  }
  echo json_encode($policies);
}
