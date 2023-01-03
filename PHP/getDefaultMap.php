<?php
    require("connexionPDO.php");
    $sql = "SELECT *
            FROM lieux
            WHERE userId=:defaultSite;";
    try{
        $commande = $pdo->prepare($sql);
        $defaultSiteId = 0;
        $commande->bindParam(":defaultSite", $defaultSiteId);
        if ($commande->execute()){
            $result = $commande->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans getDefaultData" . $e->getMessage() . "\n");
        die();
    }
    echo json_encode($result);
?>