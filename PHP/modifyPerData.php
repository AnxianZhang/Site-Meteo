<?php
    session_start();
    $newFname = isset($_POST["newFname"]) ? $_POST["newFname"] : "nothing in newFName";
    $newLname = isset($_POST["newLname"]) ? $_POST["newLname"] : "nothing in newLName";
    $change = isset($_POST["change"]) ? $_POST["change"] : "nothing in change";

    function changeName (){
        require("connexionPDO.php");
        global $newFname, $newLname;
        $sql;

        if($newFname == ""){
            $sql = "UPDATE USER_DATA
                    SET prenomU = :newLname
                    WHERE numU = :currNumUser;";
        }
        else if($newLname == ""){
            $sql = "UPDATE USER_DATA
                    SET nomU = :newFname
                    WHERE numU = :currNumUser;";
        }
        else{ // si les deux ne sont pas null
            $sql = "UPDATE USER_DATA
                    SET nomU = :newFname, prenomU = :newLname
                    WHERE numU = :currNumUser;";
        }

        try{
            $commande = $pdo->prepare($sql);
            
            if($newFname == ""){
                $commande->bindParam(':newLname', $newLname);
            }
            else if($newLname == ""){
                $commande->bindParam(':newFname', $newFname);
            }
            else{ // si les deux ne sont pas null
                $commande->bindParam(':newLname', $newLname);
                $commande->bindParam(':newFname', $newFname);
            }
            $commande->bindParam(':currNumUser', $_SESSION["userData"]["numU"]);
            $commande->execute();
        } 
        catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }
    }

    if ($change == "name"){
        changeName();
        echo("Donnée(s) mofidié(s)");
    }
    else if($change == "pwd"){
        // function to change pwd
    }
?>