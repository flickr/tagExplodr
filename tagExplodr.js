function tagsExplode(tag_string) {
	var tag,
	    tags,
	    new_string;
	
	//
	// run the tag string from the input through a function to replace commas and whitespace in double quotes
	//
	new_string = tag_string.replace(/"(.*?)"/g, function(str, p1) {
		
		//
		// convert the whitespace and commas into something we can replace easily later
		//
		p1 = p1.replace(/(,)/g, function(str, p1) {
			p1 = '{COMMA}';
			return p1;
		});
		p1 = p1.replace(/(\s+)/g, function(str, p1) {
			p1 = '{WHITESPACE' + p1.charCodeAt(0) + '}';
			return p1;
		});
		
		return p1;
	});
	
	//
	// split the new string based on comma, if one exists, else whitespace
	//
	if (new_string.indexOf(',') > -1) {
		tags = new_string.split(/,/);
	}
	else {
		tags = new_string.split(/\s+/);
	}
	
	//
	// replace the whitespace and comma codes converted, with actual whitespace and commas
	//
	for (tag in tags) {
		
		tags[tag] = tags[tag].replace(/\{WHITESPACE([0-9]+)\}/g, function(str, p1) {
			p1 = String.fromCharCode(p1);
			return p1;
		});
		
		tags[tag] = tags[tag].replace(/\{COMMA\}/g, function(str, p1) {
			p1 = ',';
			return p1;
		});
		
	}
	
	Y.Array.each(tags, function(tag, index) {
		tag = Y.Lang.trim(tag);
		tags[index] = tag;
	});
	
	tags = Y.Array.filter(tags, function(tag, index) {
		return tag.length > 0;
	});
	
	return tags;
}