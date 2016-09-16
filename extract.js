var exec = require('child_process').exec;
var string = require('string');

// convert string to JSON form
// string must be separated with = character and delimited with semi-colon between properties
// eg. shape=square;whiteSpace=wrap;html=1;

function str2json(literal) {

  var style = literal.split(';')
  var attrib = [];
  var jsonForm = '';
  var styleJSON = []; // this will hold the converted string

  style.forEach(function(value){
    attrib = value.split('=');

    if (attrib[0] != undefined && attrib[0] != '') {
      len1 = attrib[0].length + 2;
      attrib[0] = string(attrib[0]).pad(len1,'"').s;
    }

    if (attrib[1] != undefined && attrib[1] != '') {
      len2 = attrib[1].length + 2;
      attrib[1] = string(attrib[1]).pad(len2,'"').s;
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

function parseStarletOut(error, stdout, stderr) {
  var arrSplit = stdout.split('$'); // split value-style string literals
  var arrVS = [];
  var obj = {};
  var component = {};

  arrSplit.forEach(function(value){
    if (value.trim() != '' || value != undefined) {
      arrVS = value.split('|') // split value from style

      // check style string
      if (arrVS[1] != undefined && arrVS[1].trim() != '') {
        if (string(arrVS[1]).contains('shape')) {
          obj = str2json(arrVS[1])

          // check value string
	  if (arrVS[0] != undefined && arrVS[0].trim() != '') {
	    label = arrVS[0];
	    console.log(obj.shape + ":" + label)
//            getObjType(obj.shape, label)
	  }
        }
      }
    }
  });
} // end function parseStarletOut

// use cheerio and json tool to extract xml value
// npm install -g cheerion-cli
// npm install -g json
// execute xmlstarlet to extract value and style attribute from mxCell element
// send output to function parseStarletOut()

exec("cat socpo_isop_roadmap.html | cheerio \"div\" -a data-mxgraph | json xml | xmlstarlet fo > xmlformatted.xml; xmlstarlet sel -t -m \"//mxCell\" -v \"concat(@value,'|',@style,'$')\" xmlformatted.xml", parseStarletOut)


