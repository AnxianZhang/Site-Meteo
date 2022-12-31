<?php
    $numLieu = isset($_POST['num']) ? $_POST['num'] : "nothing in num";

    require("connexionPDO.php");

    $sql = "DELETE 
            FROM LIEUX
            WHERE numS = :lieuToDelete;";
    try{
        $commande = $pdo->prepare($sql);
        $commande->bindParam(":lieuToDelete", $numLieu);            $commande->execute();

    }
    catch(PDOException $e){
        echo utf8_encode("Echec de la requete SQL dans getDefaultData" . $e->getMessage() . "\n");
        die();
    }

    echo "Lieux suprimé";
?>