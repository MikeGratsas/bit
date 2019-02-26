<?php
function scalePNG($filename)
{
    $srcImg = @imagecreatefrompng($filename);
    if($srcImg)
    {
      $width = imagesx($img);
      if(isset($_GET['width'])){
        $width = intval($_GET['width']);
      }
      if(isset($_GET['height'])){
        $height = intval($_GET['height']);
        return imagescale($srcImg, $width, $height);
      }
      return imagescale($srcImg, $width);
    }
    return null;
}

function getFile() {
  $filename = null;
  $path = '../images/';
  if(isset($_GET['color'])){
      switch ($_GET['color']) {
          case 'white':
              if(isset($_GET['kind'])){
                switch ($_GET['kind']) {
                    case '1':
                        $filename = $path.'ch_white.png';
                        break;
                    case '2':
                        $filename = $path.'ch_q_white.png';
                        break;
                }
              }
              break;
          case 'black':
              if(isset($_GET['kind'])){
                switch ($_GET['kind']) {
                    case '1':
                        $filename = $path.'ch_black.png';
                        break;
                    case '2':
                        $filename = $path.'ch_q_black.png';
                        break;
                }
              }
              break;
      }
  }
  return $filename;
}

$file = getFile();
if ($file) {
  $img = scalePNG($file);
  if ($img) {
    header('Content-Type: image/png');
    imagepng($img);
    imagedestroy($img);
  }
}
?>
