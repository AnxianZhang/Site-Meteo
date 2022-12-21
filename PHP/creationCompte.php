<?php
    $fname = isset($_POST["fname"]) ? $_POST["fname"] : "nothing in fname";
    $lname = isset($_POST["lname"]) ? $_POST["lname"] : "nada in lname";
    $mail = isset($_POST["mail"]) ? $_POST["mail"] : "rien in mail";
    $mdp = isset($_POST["mdp"]) ? $_POST["mdp"] : "niete in mdp";

    // echo $mail;

    function isExistingAcount($mail){
        require("connexionPDO.php");
        $sql = "SELECT *
                FROM USER_DATA
                WHERE mail=:mail;";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':mail', $mail);
            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
                return count($result) != 0;
                // echo json_encode($result);
                // var_dump($result);
                // die();
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }
    }
    
    if(!isExistingAcount($mail)){
        // save new user
    }
    else{
        echo "existing acount";
    }
?>