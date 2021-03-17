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
    $code_postal = regex_data($data['codePostal']);
    $ville = regex_data($data['ville']);
    $proprietaire_carte = regex_data($data['proprietaireCarte']);
    $numero_carte = regex_data($data['numeroCarte']);
    $date_carte = regex_data($data['dateCarte']);
    $cryptogramme = regex_data($data['cryptogramme']);
    $civilite = regex_data($data['civilite']);

    //verif back

    $nomlength = strlen($nom);
    $prenomlength = strlen($prenom);
    $telephonelength = strlen($telephone);

    if ($nomlength <= 255) {
        if ($prenomlength <= 255) {
            if ($telephonelength <= 30) {
                $req = $bdd->prepare("UPDATE users SET nom = :nom, prenom = :prenom, adresse = :adresse, code_postal = :code_postal, ville = :ville, cb_proprietaire = :cb_proprietaire, cb_ = :prenom, WHERE id = :id");
                                        $req->bindParam(':nom', $nom);
                                        $req->bindParam(':prenom', $prenom);
                                        $req->bindParam(':telephone', $telephone);
                                        $req->bindParam(':id', $id);
                                        $req->execute();
                                        echo json_encode([
                                            'success' => true
                                        ]);
            } else {
                echo "Attention ! L'telephone fait plus de 30 caracteres !";
            }
        } else {
            echo "Attention ! Le prénom fait plus de 255 caracteres !";
        }
    } else {
        echo "Attention ! Le nom fait plus de 255 caracteres !";
    }
} else {
    echo json_encode([
        'success' => false
    ]);
}