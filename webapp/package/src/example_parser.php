<?php
    if( isset($_POST['n']) && isset($_POST['e']) && isset($_POST['m']) ){
        $n = $_POST['n'];
        $e = $_POST['e'];
        $m = nl2br($_POST['m']);
        $to = "hello@jonathanramos.net";
        $from = $e;
        $subject = "Contact form message";
        $message = '<b>Name:</b> '.$n.' <br><b>Email:</b> '.$e.' <p>'.$m.'</p>';
        $headers = "From $from\n";
        $headers .="MIME-Version: 1.0\n";
        $headers .="Content-type: text/html; charset=iso-8859-1\n";
        if( mail($to, $subject, $message, $headers)) {
            echo "success";
        } else {
            echo "Sorry, the message failed. Please try again later";
        }
    }
?>
