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

if ($success) echo "SUBMISSION SUCCESSFUL"; else echo "NOT";

echo "<!DOCTYPE html>
			<html>
				<head>
				<title>Form Submissiont</title>
				</head>
				<body>
				<h2>Form submission successful!</h2>
				<ul>
					<li><h3>User Name: $name</h3></li>
					<li><h3>User Pass: $email</h3></li>
					<li><h3>American: $message</h3></li>

				</ul
				</body>
			</html>";