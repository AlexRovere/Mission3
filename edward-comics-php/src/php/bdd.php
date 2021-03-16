<?php
require 'connect.php';

   //echo "Connected successfully";
$policies = [];
 $sql = $bdd->prepare("SELECT * FROM comics");
 $sql -> execute();
 $results = $sql->fetchAll(); 
 if (count($results) > 0) {
  
    foreach ($results as $donnees) {
      $policies[] =  $donnees;      
    }
    echo json_encode($policies);
  }