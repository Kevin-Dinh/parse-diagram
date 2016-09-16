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



// convert string to JSON form
// string must be separated with = character and delimited with semi-colon between properties
// eg. shape=square;whiteSpace=wrap;html=1;

function style2json(literal) {

    var style = literal.split(';')
    var attrib = [];
    var jsonForm = '';
    var styleJSON = []; // this will hold the converted string

    style.forEach(function(value) {
        attrib = value.split('=');

        if (attrib[0] != undefined && attrib[0] != '') {
            len1 = attrib[0].length + 2;
            attrib[0] = `"${attrib[0]}"`
        }

        if (attrib[1] != undefined && attrib[1] != '') {
            len2 = attrib[1].length + 2;
            attrib[1] = '"' + attrib[1] + "\""; //;-)))
        }

        jsonForm = attrib.join(":");
        if (jsonForm != '') {
            styleJSON.push(jsonForm);
        }

    });

    var parseMe = "{" + styleJSON.join(",") + "}";
    var json = JSON.parse(parseMe);

    return json;
}

function parseStarletOut(str) {
    //console.error("str", str);
    var arrSplit = str.split('$'); // split value-style string literals
    var arrVS = [];
    var obj = {};
    var component = {};


    arrSplit.forEach(function(value) {
        if (value && value.trim() != '') {
            arrVS = value.split('|') // split value from style

            // check style string
            if (arrVS[1] != undefined && arrVS[1].trim() != '') {
                if (arrVS[1].indexOf("shape") !== 1) {
                    obj = style2json(arrVS[1])
                        // check value string
                    if (arrVS[0] != undefined && arrVS[0].trim() != '') {
                        label = arrVS[0];
                        console.log(obj.shape + ":" + label)
                    }
                }
            }
        }
    });
}
