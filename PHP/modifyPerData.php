<?php
    session_start();
    $newFname = isset($_POST["newFname"]) ? $_POST["newFname"] : "nothing in newFName";
    $newLname = isset($_POST["newLname"]) ? $_POST["newLname"] : "nothing in newLName";

    $oldPwd = isset($_POST["oldPwd"]) ? $_POST["oldPwd"] : "nothing in oldPwd";
    $newPwd = isset($_POST["newPwd"]) ? $_POST["newPwd"] : "nothing in newPwd";

    $change = isset($_POST["change"]) ? $_POST["change"] : "nothing in change";

    require("connexionPDO.php");

    function changeName ($newFname, $newLname){
        global $pdo;

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

    function isSamePwd($oldPwd){
        global $pdo;

        $sql = "SELECT *
                FROM USER_DATA
                WHERE numU = :currNumUser";
        try{
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':currNumUser', $_SESSION["userData"]["numU"]);

            if ($commande->execute()){
                $result = $commande->fetchAll(PDO::FETCH_ASSOC);
            }
        } catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }

        return password_verify($oldPwd, $result[0]["mdp"]);
    }

    function changePwd($newPwd){
        global $pdo;

        $sql = "UPDATE USER_DATA
                SET mdp = :newPwd
                WHERE numU = :currNumUser;";
        try{
            $hash = password_hash($newPwd, PASSWORD_BCRYPT);
            $commande = $pdo->prepare($sql);
            
            $commande->bindParam(':newPwd', $hash);
            $commande->bindParam(':currNumUser', $_SESSION["userData"]["numU"]);
            $commande->execute();
        } 
        catch(PDOException $e){
            echo utf8_encode("Echec de la requete SQL dans creationCompte" . $e->getMessage() . "\n");
            die();
        }
    }

    if ($change == "name"){
        changeName($newFname, $newLname);
        echo("Donnée(s) mofidié(s)");
    }
    else if($change == "pwd"){
        if (!isSamePwd($oldPwd)){
            echo false;
            return;
        }
        changePwd($newPwd);
        echo true;
    }
?>