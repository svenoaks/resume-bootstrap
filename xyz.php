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

/*The email from your resume site will come from whatever address you set here.
We place the email address of the sender in the body to prevent spam.*/

$success = mail ( "myemailaddress@host.com" , "Email from Resume" , $text);

if ($success) exit('success'); else exit('failure');
