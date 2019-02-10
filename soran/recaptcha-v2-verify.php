<?php
if(isset($_POST['submit']) && !empty($_POST['submit'])){
  if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])){
    //your site secret key
    $secret = getenv('GRECAPTCHA2_SECRET');
    //get verify response data
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response'].'&remoteip='.$_SERVER['REMOTE_ADDR']);
	header('Content-type:application/json');
	echo $verifyResponse;
    $responseData = json_decode($verifyResponse);
    if($responseData->success){
		$hostname = $_SERVER['SERVER_NAME'];
		if(isset($hostname) && strcasecmp($hostname, $responseData->hostname) !== 0){
			$errMsg = 'Host name mismatch.';
		}else{
			//contact form submission code goes here
			$email = !empty($_POST['email'])?$_POST['email']:'';

			$succMsg = 'Your subscribe request have submitted successfully.';
		}
    }else{
        $errMsg = 'Robot verification failed, please try again.';
    }
  }else{
    $errMsg = 'Please click on the reCAPTCHA box.';
  }
}
?>