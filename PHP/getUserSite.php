<?php
    require("connexionPDO.php");
    session_start();
    $sql = "SELECT *
            FROM lieux
            WHERE userId=:currUser;";
    try{
        $commande = $pdo->prepare($sql);

        $commande->bindParam(":currUser", $_SESSION["userData"]["numU"]);
        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($result);
            // die();
        }
    }
    catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans getDefaultData" . $e->getMessage() . "\n");
        die();
    }
    echo json_encode($result);
?>