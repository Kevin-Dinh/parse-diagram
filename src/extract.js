/*
Parses magic format ;-))

$ echo "TOPO|shape=singleArrow;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontSize=18;fontColor=#000000;align=cent
er;arrowWidth=0.275;arrowSize=0.07542372881355933;strokeColor=#000000;rotation=90;" | node extract.js
singleArrow:TOPO

*/
var str = [];
var byline = require("byline");
byline(process.stdin /*,{keepEmptyLines:true}*/ ) //
    .on("data", function(line) {
        str.push(line += "");
        //console.error("data:", line);
    }).on("end", function() {
        parseStarletOut(str.join("$"));
    });

var style2json = require("../lib/style2json.js");



function parseStarletOut(str) {
    //console.error("str", str);
    var arrSplit = str.split('$'); // split value-style string literals
    var arrVS = [];
    var obj = {};
    var component = {};


    arrSplit.forEach(function(value) {
        if (value && value.trim().length) {
            arrVS = value.split('|'); // split value from style
            // check style string

            if (arrVS[1] && arrVS[1].indexOf("shape") !== 1) {
                obj = style2json(arrVS[1]);
                if (arrVS[0] && arrVS[0].trim().length) {
                    label = arrVS[0];
                    console.log(obj.shape + ":" + label);
                }
            }
        }
    });
}
