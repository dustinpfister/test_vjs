canvasMod.load({
    pointsMethods : {
        name: 'circle',
        method: function(cx, cy, radius, pointCount){
            pointCount = pointCount === undefined ? 100 : pointCount;
            var points = [[]];
            var i = 0, x, y, radian;
            while(i < pointCount){
                radian = Math.PI * 2 / pointCount * i;
                x = cx + Math.cos(radian) * radius;
                y = cy + Math.sin(radian) * radius;
                points[0].push(x, y);
                i += 1;
            }
            return points;
        }
    }
});