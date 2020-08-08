<?php
function scalePNG($filename)
{
    $srcImg = @imagecreatefrompng($filename);
    if($srcImg)
    {
      $width = imagesx($img);
      $widthParam = $_GET['width'];
      if(isset($widthParam)){
        $width = intval($widthParam);
      }
      $heightParam = $_GET['height'];
      if(isset($heightParam)){
        $height = intval($heightParam);
        return imagescale($srcImg, $width, $height);
      }
      return imagescale($srcImg, $width);
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
