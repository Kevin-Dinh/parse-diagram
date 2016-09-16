/*
Parses magic format ;-))

$ echo "TOPO|shape=singleArrow;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontSize=18;fontColor=#000000;align=cent
er;arrowWidth=0.275;arrowSize=0.07542372881355933;strokeColor=#000000;rotation=90;" | node extract.js
singleArrow:TOPO

*/
var byline = require("byline");
byline(process.stdin, { keepEmptyLines: false })
    .on("data", function(line) {;
        parseLine(line + "");
    });


// NTH module maybe
var style2json = require("../lib/style2json.js");

function parseLine(line) {

    var parts = line.split('|');
    var label = parts[0] || "";
    var style = parts[1] || "";

    // TODO: test for non shapes, blind rewrite
    var shapeObj = ~style.indexOf("shape") && style2json(style);
    shapeObj && console.log(`${label}:${shapeObj.shape}`);
}
