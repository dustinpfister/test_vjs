#!/bin/bash

top=$(cat ./pkg/top.txt)
bottom=$(cat ./pkg/bottom.txt)
js=$(cat ./js/lib/utils.js ./js/lib/units.js ./js/lib/map.js ./js/game.js ./js/draw.js ./js/sm.js ./js/states/state-title.js ./js/states/state-game.js ./js/main.js)
min=$(echo "$js" | uglifyjs)

echo "${top}${min}${bottom}";