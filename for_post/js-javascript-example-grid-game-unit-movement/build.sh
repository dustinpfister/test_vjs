#!/bin/bash

top=$(cat ./pkg/top.txt)
bottom=$(cat ./pkg/bottom.txt)
js=$(cat ./lib/utils.js ./lib/map.js ./lib/game.js ./lib/draw.js ./main.js)
min=$(echo "$js" | uglifyjs)

echo "${top}${min}${bottom}";