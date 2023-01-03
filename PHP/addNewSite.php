<?php
    session_start();
    $nomS = isset($_POST['nomS']) ? $_POST['nomS'] : "nothing in nomS";
    $latitude = isset($_POST['latitude']) ? $_POST['latitude'] : "nothing in latitude";
    $lontitude = isset($_POST['lontitude']) ? $_POST['lontitude'] : "nothing in lontitude";
    $icon = isset($_POST['icon']) ? $_POST['icon'] : "nothing in icon";
    $img = isset($_POST['img']) ? $_POST['img'] : "nothing in img";
    $detail = isset($_POST['detail']) ? $_POST['detail'] : "nothing in detail";

    function AjoutNewSite($nomS, $latitude, $lontitude, $icon, $img, $detail){
        require("connexionPDO.php");
        $sql = "INSERT INTO LIEUX 
                VALUES (NULL, :nomS, :latitude, :lontitude, :icon, :img, :detail, :userId)";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':nomS', $nomS);
            $commande->bindParam(':latitude', $latitude);
            $commande->bindParam(':lontitude', $lontitude);
            $commande->bindParam(':icon', $icon);
            $commande->bindParam(':img', $img);
            $commande->bindParam(':detail', $detail);
            $commande->bindParam(':userId', $_SESSION["userData"]["numU"]);
            $commande->execute();
        } 
        catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans addNewSite" . $e->getMessage() . "\n");
            die();
        }
    }
    
    if ($nomS == "" || $latitude == "" || $lontitude == ""){
        echo false;
    }
    else {
        AjoutNewSite($nomS, $latitude, $lontitude, $icon, $img, $detail);
        echo true;
    }
?>