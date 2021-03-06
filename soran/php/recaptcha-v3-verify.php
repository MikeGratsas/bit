<?php
$recaptchaResponse = $_POST['g-recaptcha-response'];
if(isset($recaptchaResponse) && !empty($recaptchaResponse)){
    //your site secret key
    $secret = getenv('GRECAPTCHA3_SECRET');
    //get verify response data
    $remoteAddress = $_SERVER['REMOTE_ADDR'];
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$recaptchaResponse.'&remoteip='.$remoteAddress);
    header('Content-type:application/json');
    echo $verifyResponse;
    $responseData = json_decode($verifyResponse);
    if($responseData->success){
	    $hostname = $_SERVER['SERVER_NAME'];

        if(isset($hostname) && strcasecmp($hostname, $responseData->hostname) !== 0){
            error_log('Host name mismatch.');
        }
        else{
            $action = $_POST['g-recaptcha-action'];
            if(isset($action) && strcasecmp($action, $responseData->action) !== 0){
               error_log('Action mismatch.');
            }
            else{
               $threshold = 0.5;
               if(isset($threshold) && $threshold > $responseData->score){
                   error_log('Score threshold not met.');
               }
               else{
                   //contact form submission code goes here
                   $email = !empty($_POST['email'])?$_POST['email']:'';
                   $badchars = array('\n', '\r', '\t');
                   $safeemail = str_replace($badchars, '', $email);

                   error_log(sprintf('Your subscribe to %s request have submitted successfully.', $safeemail));
               }
            }
        }
    }
    else{
        error_log('Robot verification failed, please try again.');
    }
}
else{
    error_log('Please click on the reCAPTCHA box.');
}
?>
