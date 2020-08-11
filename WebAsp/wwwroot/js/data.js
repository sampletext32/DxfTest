var raw = `[
    ["line", 10, 10, 200, 10 ], 
    ["line",  200, 10, 200, 110 ], 
    ["line", 200, 110, 10, 110 ], 
    ["line", 10, 110, 10, 10 ], 
    ["circle", 60, 60, 10],
    ["circle", 100, 60, 10],
    ["circle", 140, 60, 10]
]`;
// ["arc", x, y, r, angle1, angle2]
// ["spline", x1, y1, .....]

var data = JSON.parse(raw);
