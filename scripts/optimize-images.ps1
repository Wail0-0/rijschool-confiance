Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$imgDir = Join-Path $root "images"

function Get-JpegEncoder {
  [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
}

function Save-Jpeg {
  param([System.Drawing.Image]$Image, [string]$OutPath, [int]$Quality, [int]$MaxWidth = 0)

  $w = $Image.Width
  $h = $Image.Height
  if ($MaxWidth -gt 0 -and $w -gt $MaxWidth) {
    $ratio = $MaxWidth / $w
    $w = [int]($w * $ratio)
    $h = [int]($h * $ratio)
  }

  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($Image, 0, 0, $w, $h)

  $encoder = Get-JpegEncoder
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

  $bmp.Save($OutPath, $encoder, $params)
  $size = [Math]::Round((Get-Item $OutPath).Length / 1KB)
  Write-Host "  -> $OutPath  ($($w)x$($h), ${size} KB)"

  $g.Dispose()
  $bmp.Dispose()
}

# hero.png (3,3 MB PNG-foto) -> geoptimaliseerde hero.jpg
$heroSrc = Join-Path $imgDir "hero.png"
if (Test-Path $heroSrc) {
  $src = [System.Drawing.Image]::FromFile($heroSrc)
  Save-Jpeg -Image $src -OutPath (Join-Path $imgDir "hero.jpg") -Quality 82
  $src.Dispose()
}

# rotterdam.jpg (2,8 MB) opnieuw comprimeren (zelfde bestandsnaam)
$rdamSrc = Join-Path $imgDir "rotterdam.jpg"
if (Test-Path $rdamSrc) {
  $orig = [System.Drawing.Image]::FromFile($rdamSrc)
  $clone = New-Object System.Drawing.Bitmap($orig)
  $orig.Dispose()
  Save-Jpeg -Image $clone -OutPath $rdamSrc -Quality 80
  $clone.Dispose()
}

Write-Host "Afbeeldingen geoptimaliseerd."
