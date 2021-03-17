<?php

require 'connect.php';

function regex_data($param)
{
    $param = trim($param);
    $param = stripcslashes($param);
    $param = htmlspecialchars($param);
    return $param;
}


$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $data = json_decode($postdata, true);

    $id = $data['id'];
    $nom = regex_data($data['nom']);
    $prenom = regex_data($data['prenom']);
    $adresse = regex_data($data['adresse']);
    $ville = regex_data($data['ville']);
    $proprietaire_carte = regex_data($data['proprietaireCarte']);
    $numero_carte = regex_data($data['numeroCarte']);
    $date_carte = regex_data($data['dateCarte']);
    $cryptogramme = regex_data($data['cryptogramme']);


    //verif back

    $nomlength = strlen($nom);
    $prenomlength = strlen($prenom);
    $adresselength = strlen($adresse);
    $villelength = strlen($ville);
    $proprietaire_cartelength = strlen($proprietaire_carte);
    $numero_cartelength = strlen($numero_carte);
    $date_cartelength = strlen($date_cartelength);
    $cryptogrammelength = strlen($cryptogramme);

    if ($nomlength <= 255) {
        if ($prenomlength <= 255) {
            if ($adresselength <= 255) {
                if ($villeength <= 255) {
                    if ($proprietaire_cartelength <= 255) {
                        if ($numero_cartelength <= 16) {
                            if ($date_cartelength <= 255) {
                                if ($cryptogrammelength <= 3) {
                                    $req = $bdd->prepare("SELECT * FROM users WHERE id = :id");
                                    $req->execute(array(
                                        'id' => $id
                                    ));
                                    $resultat = $req->fetch();
                                    echo json_encode([
                                        'success' => true,
                                        'user' => $resultat
                                    ]);
                                } else {
                                    echo "Attention ! Le nom fait plus de 255 caracteres !";
                                }
                            } else {
                                echo "Attention ! Le prénom fait plus de 255 caracteres !";
                            }
                        } else {
                            echo "Attention ! L'adresse fait plus de 255 caracteres !";
                        }
                    } else {
                        echo "Attention ! La ville fait plus de 255 caracteres !";
                    }
                } else {
                    echo "Attention ! Le propriétaire de la carte fait plus de 255 caracteres !";
                }
            } else {
                echo "Attention ! Le numéro de la carte fait plus de 16 caracteres !";
            }
        } else {
            echo "Attention ! La date de la carte fait plus de 30 caracteres !";
        }
    } else {
        echo "Attention ! Le cryptogramme fait plus de 3 caracteres !";
    }
} else {
    echo json_encode([
        'success' => false
    ]);
}

?>
