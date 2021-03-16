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
    $email = regex_data($postdata['email']);
    $password = regex_data($postdata['password']);

    $req = $bdd->prepare("SELECT * INTO users WHERE email = :email");
    $req->bindParam(':email', $email);
    $resultat = $req->execute();

}

    if ($resultat) {
        $passwordCorrect = password_verify($password, $resultat['password']);
            if($passwordCorrect) {
                echo json_encode([
                    "success" => true
                ]);
                session_start();
                $_SESSION['nom'] = $resultat['nom'];
                $_SESSION['prenom'] = $resultat['prenom'];
                $_SESSION['telephone'] = $resultat['telephone'];
                $_SESSION['email'] = $resultat['email'];
                $_SESSION['adresse'] = $resultat['adresse'];
                $_SESSION['codePostal'] = $resultat['code_postal'];
                $_SESSION['ville'] = $resultat['ville'];
            }
            else { //MOT DE PASSE INCORECCT
                echo json_encode([
                    "success" => false,
                    "errors" => ["
                    Mauvais identifiant ou mot de passe !" 
                    ]
                ]);
            }
        }    
    else { //IDENTIFIANT INCORRECT
        echo json_encode([
            "success" => false,
            "errors" => ["
                    Mauvais identifiant ou mot de passe !"
                    ]
                ]);
        }
    
       
?>
