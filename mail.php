<?php
/**
 * Created by PhpStorm.
 * User: Steve
 * Date: 9/21/14
 * Time: 8:24 PM
 */
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

$newLine = "\r\n";

$text = $name . $newLine . $email . $newLine . $message;

$text = str_replace("\n.", "\n..", $text);


$success = mail ( "svenoaks@gmail.com" , "Email from Resume" , $text);

if ($success) exit('success'); else exit('failure');
