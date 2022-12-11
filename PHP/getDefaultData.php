<?php
    require("connexion.php");
    $sql = "SELECT * FROM lieux;";
    try{
        $commande = $pdo->prepare($sql);
        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($result);
            // die();
        }
    }
    catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL " . $e->getMessage() . "\n");
        die();
    }
    // echo json_encode($result);
?>