#!/bin/bash

top=$(cat ./pkg/top.txt)
bottom=$(cat ./pkg/bottom.txt)
js=$(cat ./js/lib/utils.js ./js/lib/map.js ./js/lib/game.js ./js/lib/draw.js ./js/main.js)
min=$(echo "$js" | uglifyjs)

echo "${top}${min}${bottom}";