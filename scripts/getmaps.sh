#!/bin/bash

# Base URL (modify as needed)
BASE_URL="https://tiles.stadiamaps.com/tiles/stamen_watercolor/18"
#BASE_URL="https://tile.thunderforest.com/pioneer/18"
#API_KEY="?apikey=60ec428444874e97a66f0cab4d7b13b2"
# BASE_URL="https://tile.openstreetmap.org/18"
API_KEY="86733f4c-5d62-422f-acdf-882f4fa43fa7"
XOFFSET=147008  # Modify as needed
YOFFSET=157644  # Modify as needed

# Outer loop iterates 17 times
 for i in $(seq 0 30); do
   for j in $(seq 0 20); do
       X=$((i + XOFFSET))
       Y=$((j + YOFFSET))
       URL="${BASE_URL}/${X}/${Y}.png"
        #echo "Fetching: ${URL}"
       curl -H "Authorization: Stadia-Auth $API_KEY" "${URL}" -o "tile_${X}_${Y}.png"
       #echo "Saved response to tile_${X}_${Y}.png"
   done
done

# Create a montage of the downloaded tiles in correct order
montage $(for j in $(seq 0 20); do for i in $(seq 0 30); do echo -n "tile_$((i + XOFFSET))_$((j + YOFFSET)).png "; done; done) \
        -mode concatenate -tile 31x21 final_montage.png

echo "Final montage saved as final_montage.png"
