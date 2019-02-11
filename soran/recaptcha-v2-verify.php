<?php
echo 'request received '.$_POST['subscribe'].$_POST['g-recaptcha-response'].$_POST['email'];
if(isset($_POST['subscribe']) && !empty($_POST['subscribe'])){
  echo 'request received '.$_POST['g-recaptcha-response'];
  if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])){
    //your site secret key
    $secret = getenv('GRECAPTCHA2_SECRET');
    echo 'secret'.$secret;
    //get verify response data
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response'].'&remoteip='.$_SERVER['REMOTE_ADDR']);
	  header('Content-type:application/json');
	  echo $verifyResponse;
    $responseData = json_decode($verifyResponse);
    if($responseData->success){
		    $hostname = $_SERVER['SERVER_NAME'];
		    if(isset($hostname) && strcasecmp($hostname, $responseData->hostname) !== 0){
			         error_log('Host name mismatch.');
		    }else{
			         //contact form submission code goes here
			         $email = !empty($_POST['email'])?$_POST['email']:'';

			         error_log(sprintf('Your subscribe to %s request have submitted successfully.', $email));
		    }
    }else{
        error_log('Robot verification failed, please try again.');
    }
  }else{
    error_log('Please click on the reCAPTCHA box.');
  }
}
?>
