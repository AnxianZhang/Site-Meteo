<?php
    session_start();
    $nomS = isset($_POST['nomS']) ? $_POST['nomS'] : "nothing in nomS";
    $latitude = isset($_POST['latitude']) ? $_POST['latitude'] : "nothing in latitude";
    $lontitude = isset($_POST['lontitude']) ? $_POST['lontitude'] : "nothing in lontitude";
    $icon = isset($_POST['icon']) ? $_POST['icon'] : "nothing in icon";
    $img = isset($_POST['img']) ? $_POST['img'] : "nothing in img";
    $detail = isset($_POST['detail']) ? $_POST['detail'] : "nothing in detail";

    ////////pour AddSite
    function AjoutNewSite($nomS, $latitude, $lontitude, $icon, $img, $detail){
        require("connexionPDO.php");
        $sql = "INSERT INTO LIEUX 
                VALUES (NULL, :nomS, :latitude, :lontitude, :icon, :img, :detail, :userId)";
        if($icon == ""){
            $icon="https://www.freeiconspng.com/thumbs/address-icon/addressing-information--mecca-911-3.png";
        }
        if($img == ""){
            $img="https://img.freepik.com/vecteurs-libre/paysage-montagne-design-plat-dessine-main_23-2149158786.jpg?w=2000";
        }
        if($detail == ""){
            $detail="votre adresse personalisé";
        }
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':nomS', $nomS);
            $commande->bindParam(':latitude', $latitude);
            $commande->bindParam(':lontitude', $lontitude);
            $commande->bindParam(':icon', $icon);
            $commande->bindParam(':img', $img);
            $commande->bindParam(':detail', $detail);
            $commande->bindParam(':userId', $_SESSION["userData"]["numU"]);
            ///////jsp comment donner val de userId
            $commande->execute();
        } 
        catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans addNewSite" . $e->getMessage() . "\n");
            die();
        }
        
    }//////////// si c vide 
    if ($nomS == "" || $latitude == "" || $lontitude == ""){
        echo "les champs: nom, lat, lon sont obligatoires";
    }
    else {
        AjoutNewSite($nomS, $latitude, $lontitude, $icon, $imag, $detail);
        echo "c fait";
    }
?>