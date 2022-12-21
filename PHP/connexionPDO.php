<?php
    $hostName = "localhost";
    $base = "famoussites";
    $loginBD = "root";
    $passWordBD = "root";

    try{
        $DSN = "mysql:server=$hostName; dbname=$base";
        $pdo = new PDO($DSN, $loginBD, $passWordBD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        echo utf8_encode("Connexion to DB failed : " . $e->getMessage() . "\n");
        die();
    }
?>