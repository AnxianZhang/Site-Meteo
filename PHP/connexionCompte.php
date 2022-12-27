<?php
    session_start();
    $profil = array();
    $username = isset($_POST['userName']) ? $_POST['userName'] : "nothing in userName";
    $password = isset($_POST['password']) ? $_POST['password'] : "nothing in password";

    function isExistingAcount($username, &$profil){
        require("connexionPDO.php");
        $sql = "SELECT *
                FROM USER_DATA
                WHERE mail=:username;";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':username', $username);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($result) != 0){
                    $profil = $result[0];
                    return $result[0]["mdp"];
                }
                return "";
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }
    }

    $bdMdp = isExistingAcount($username, $profil);
    

    if($bdMdp != ""){ // compte  existe (si le mot de passe du compet et pas vide)
        if(password_verify($password, $bdMdp)){
            $_SESSION["userData"] = $profil;
            echo "connexion reussi";
        }
        else{
            echo "mdp faux";
        }
    }
    else{
        echo "compte n'existe pas";
    }
    
?>