module.exports=style2json;

function style2json(literal) {
	// in: "shape=square;whiteSpace=wrap;html=1;"
	// out: {shape:"square"}

    // from http://jsfiddle.net/mattball/aT77q/ (just fixed), TODO: find something safer, less naive
    var styles = literal.split(';'),
        i = styles.length,
        json = { style: {} },
        style, k, v;

    while (i--) {
        style = styles[i].split('=');
        k = (style[0] || "").trim();
        v = (style[1] || "").trim();
        if (k.length > 0 && v.length > 0) {
            json.style[k] = v;
        }
    }
    return json.style;
}