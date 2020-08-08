<?php
function scalePNG($filename)
{
    $srcImg = imagecreatefrompng($filename);
    if($srcImg)
    {
      $srcWidth = imagesx($img);
      $srcHeight = imagesy($img);
      $width = srcWidth;
      if(isset($_GET['width'])){
        $width = intval($_GET['width']);
      }
      $height = $srcHeight;
      if(isset($_GET['height'])){
        $height = intval($_GET['height']);
      }
      $destImg = imagecreatetruecolor($width, $height);
      imagealphablending($destImg, false);
      imagesavealpha($destImg, true);
      imagecopyresampled($destImg, $srcImg, 0, 0, 0, 0, $width, $height, $srcWidth, $srcHeight);
      return $destImg;
    }
    return null;
}

function getFile() {
  $filename = null;
  $path = '../images/';
  $color = $_GET['color'];
  $kind = $_GET['kind'];
  if(isset($color)){
      switch ($color) {
          case 'white':
              if(isset($kind)){
                switch ($kind) {
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
              if(isset($kind)){
                switch ($kind) {
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
