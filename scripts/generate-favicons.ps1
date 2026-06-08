Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot

function New-ConfianceIcon {
  param([int]$Size, [string]$OutPath)

  $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::FromArgb(255, 13, 31, 60))

  $blue = [System.Drawing.Color]::FromArgb(255, 30, 79, 155)
  $white = [System.Drawing.Color]::White
  $black = [System.Drawing.Color]::FromArgb(255, 17, 17, 17)
  $pad = [int][Math]::Round($Size * 0.12)
  $box = $Size - (2 * $pad)
  $penWidth = [Math]::Max(1.0, $Size * 0.04)

  $brush = New-Object System.Drawing.SolidBrush($blue)
  $pen = New-Object System.Drawing.Pen($white, $penWidth)

  $g.TranslateTransform($Size / 2.0, $Size / 2.0)
  $g.RotateTransform(-8)
  $g.TranslateTransform(-$Size / 2.0, -$Size / 2.0)
  $g.FillRectangle($brush, $pad, $pad, $box, $box)
  $g.DrawRectangle($pen, $pad, $pad, $box, $box)
  $g.ResetTransform()

  $fontSize = [int][Math]::Round($Size * 0.52)
  $font = New-Object System.Drawing.Font("Arial", [single]$fontSize, [System.Drawing.FontStyle]::Bold)
  $textBrush = New-Object System.Drawing.SolidBrush($black)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF(0, ($Size * 0.02), $Size, $Size)
  $g.DrawString("L", $font, $textBrush, $rect, $format)

  $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $g.Dispose()
  $bmp.Dispose()
  $brush.Dispose()
  $pen.Dispose()
  $font.Dispose()
  $textBrush.Dispose()
}

New-ConfianceIcon -Size 48 -OutPath (Join-Path $root "favicon-48x48.png")
New-ConfianceIcon -Size 192 -OutPath (Join-Path $root "favicon-192x192.png")
New-ConfianceIcon -Size 180 -OutPath (Join-Path $root "apple-touch-icon.png")
Copy-Item (Join-Path $root "favicon-48x48.png") (Join-Path $root "favicon.ico") -Force

Write-Host "Favicons gegenereerd in $root"
