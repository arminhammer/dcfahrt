#!/bin/bash

mkdir tileoutput
cd tilesprites

FILES=*

for f in $FILES
do
  base=$(basename $f .png)
  echo $base
  convert -crop 128x128 $f ../tileoutput/$base\_%d.png
done
