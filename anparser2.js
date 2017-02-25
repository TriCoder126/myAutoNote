var data;
var page = [];
var activeLine = 0;
var currentTable = -1;
var currentTableColumns = -1;
var actualDocText = "";

function makeDocFromKey(){
		//TODO
		//Add current text to queue

		var content = document.getElementById("document").value;
		var cursorLocation = $('#document').prop("selectionStart");
		var doctext = content.split('\n');
		var curline = getLineFromLocation(doctext, cursorLocation);
		
		scrollFromType(doctext, curline);



		if(activeFolder >= 0 && activeNote >= 0){
			if(content != fs_folders[activeFolder].node.notes.edges[parseInt(activeNote)].node.content)
				push(activeFolder, activeNote);
			
			saveSecure("currentNote", content);
			saveSecure("lastNote", activeFolder + "," + activeNote);
			fs_folders[activeFolder].node.notes.edges[parseInt(activeNote)].node.content = content;
			saveSecure("usersfolders", JSON.stringify(fs_folders));
			
		}

		//if(page.length == 0)
			parse(content);
		//else{
			parse
		//}
		lastNote = activeFolder + "," + activeNote;

		
		
}

function reBuildDocWithReferene(ob){
	var outbox = document.getElementById(ob);
	if(page != null && page.length > 0){
		while (outbox.hasChildNodes()) {
	    	outbox.removeChild(outbox.lastChild);
		}
		for(var i = 0; i < page.length; i++){
			data = page[i];
			if(typeof data.table.columns == 'undefined')
				$('#'+ob).append(print());
			else
				$('#'+ob).append(printTable());

		}
	}
}

function reBuildDoc(){
	if(page != null && page.length > 0){
		while (outbox.hasChildNodes()) {
	    	outbox.removeChild(outbox.lastChild);
		}
		for(var i = 0; i < page.length; i++){
			data = page[i];
			if(typeof data.table.columns == 'undefined')
				$('#outbox').append(print());
			else
				$('#outbox').append(printTable());

		}
	}
}

function parseWithReference(input, ob){
	var outbox = document.getElementById(ob);
	while (outbox.hasChildNodes()) {
    	outbox.removeChild(outbox.lastChild);
	}
	currentTable = -1;
	currentTableColumns = -1;

	var lines = input.split("\n");
	page = [];
	//console.log(input);
	for(var i = 0; i < lines.length; i++){
		data = { raw:lines[i], content:lines[i].replace(/</g, "&lt;").replace(/>/g, "&gt;"), words:lines[i].split(" "), lineNumber:0, vocab:-1, bulletPointLevel:0, url:[], headerSize:0, italic:[], margin:0,
		  tableColumn:-1, table:{}, underline:[]};
		data.lineNumber = i;
		
		
		var marker = isTableMarker();

		if(!marker/*typeof data.table.columns == 'undefined'*/ || data.content.length==0){//Not a table marker

			findURL();
			isVocab();
			isBulletPoint();

			isHeader();
			isTitle();
			//isItalic();
			replaceChars();
			if(currentTable >= 0){
				//console.log(currentTable, page);
				page[currentTable].table.content[currentTableColumns].push(data);
			}else
				page.push(data);
		}
	}

}

function mathExpression(a){
	if(a.length >= 3){
		for(var i = 0; i < a.length; i++){
			if( (a.charAt(i) >= '0' && a.charAt(i) <= '9') || a.charAt(i) == '+' || a.charAt(i) == '-'  || a.charAt(i) == '*'  || a.charAt(i) == '/'  || a.charAt(i) == ' ' || a.charAt(i) == ')'  || a.charAt(i) == '('  ){
				
			}else{
				return false;
			}
			
		}
		var lastChar = a.charAt(a.length-1);
		return (lastChar != '+' && lastChar != '-' && lastChar != '*' && lastChar != '/' && lastChar != '(' && lastChar != '=' )
		}
	//var letterNumber = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;  
	//return a.match(letterNumber); 
	
}

function parse(input){
	var outbox = document.getElementById("outbox");
	while (outbox.hasChildNodes()) {
    	outbox.removeChild(outbox.lastChild);
	}
	currentTable = -1;
	currentTableColumns = -1;

	var lines = input.split("\n");
	page = [];
	//console.log(input);
	for(var i = 0; i < lines.length; i++){
		data = { raw:lines[i], content:lines[i].replace(/</g, "&lt;").replace(/>/g, "&gt;"), words:lines[i].split(" "), lineNumber:0, vocab:-1, bulletPointLevel:0, url:[], headerSize:0, italic:[], margin:0,
		  tableColumn:-1, table:{}, underline:[], bold:[], italic:[]};
		data.lineNumber = i;
		
		
		var marker = isTableMarker();

		if(!marker || data.content.trim().length==0/*typeof data.table.columns == 'undefined'*/){//Not a table marker
			//if(mathExpression(data.content.trim())){
				//console.log(math.eval(data.content));
				
			//}
			findURL();
			isVocab();
			findBasics();
			isBulletPoint();

			isHeader();
			isTitle();
			//isItalic();
			replaceChars();
			if(data.content.length >= 3) try{
					data.content += " = " +math.eval(data.content);
					data.headerSize = 2;
				}catch(err){}

			if(currentTable >= 0){
				//console.log(currentTable, page);
				page[currentTable].table.content[currentTableColumns].push(data);
			}else
				page.push(data);
		}
	}

	reBuildDoc();
}

function parseText(text, line){
	data = { content:text.replace(/</g, "&lt;").replace(/>/g, "&gt;"), words:text.split(" "), lineNumber:0, vocab:-1, bulletPointLevel:0, url:[], headerSize:0, italic:[], margin:0,
	tableColumn:-1, table:{}};
	data.lineNumber = line;
	
	findURL();
		isVocab();
		isBulletPoint();
		isHeader();
		//isItalic();
		replaceChars();
		page[line]  = data;
	//var marker = isTableMarker();

	/*if(!marker){//Not a table marker
		findURL();
		isVocab();
		isBulletPoint();
		isHeader();
		//isItalic();
		replaceChars();
		if(currentTable >= 0){
			//console.log(currentTable, page);
			page[currentTable].table.content[currentTableColumns].push(data);
		}else
			page[line]  = data;*/
	//}
}

function isTableMarker(){
	var line = data.content.trim();
	var columns = 0;
	while(columns < line.length && line.charAt(columns) == '`'){
		columns++;
	}


	if(columns == line.length){
		if(currentTable >= 0 && line.length == 1){

			//page[currentTable].table.rows = Math.max(page[currentTable].table[currentTableColumns].length, page[currentTable].table.rows);
			currentTableColumns++;
			
			if(currentTableColumns == page[currentTable].table.columns){
				currentTable = -1;
				currentTableColumns = -1;
			}else{
				
			page[currentTable].table.content.push([]);
			}
		}else if(line.length > 1){
			data.table = new Object();
			data.table.columns = columns;
			data.tableMark = columns;
			currentTable = data.lineNumber;
			currentTableColumns = 0;
			page.push(data);
			//page[currentTable].table.rows = 0;
			page[currentTable].table.content = [];
			page[currentTable].table.content.push([]);
		}
		return true;
	}
	return false;
}

//counts the number of trailing tildas to determine the size of the header (1=large, 6=small)
function isHeader(){
	var headerSize = 0;
	data.headerSize = 0;
	var i = data.content.length-1;
	while(data.content.charAt(i) == '`'){
		headerSize++;
		i--;
	}
	data.content = data.content.substring(0, data.content.length-headerSize);
	if(headerSize > 6)
		headerSize =  6;
	data.headerSize = headerSize;
	//console.log("Header: ", data.headerSize);

}

function isTitle(){
	if(data.headerSize == 0 && data.vocab == -1){
		var content = data.content;
		var words = content.split(" ");
		var score = 0;
		for(var i = 0; i < words.length; i++){
			if(words[i].length > 0)
				score = (isWordUperCase(words[i])||containsIntegers(words[i]) ? score+1 : score);
		}
		if(score/words.length >= 0.6){
			data.headerSize = 2;
		}
	}
}

function findBasics(){
	for(var i = data.content.length; i >= 1; i--){
		if(data.content.substring(i-2, i) == "`u"){
			var shift = (data.underline.length%2==0) ? 2 : 0;
			var t = (data.underline.length%2==0) ? "</u>": "<u>";
			var l = data.content.substring(0, i-2);
			var r = data.content.substring(i);
			data.content = l + t + r;
			data.underline.push(i-shift);
		}else if(data.content.substring(i-2, i) == "`b"){
			var shift = (data.bold.length%2==0) ? 2 : 0;
			var t = (data.bold.length%2==0) ? "</b>": "<b>";
			var l = data.content.substring(0, i-2);
			var r = data.content.substring(i);
			data.content = l + t + r;
			data.bold.push(i-shift);
		}else if(data.content.substring(i-2, i) == "`i"){
			var shift = (data.italic.length%2==0) ? 2 : 0;
			var t = (data.italic.length%2==0) ? "</i>": "<i>";
			var l = data.content.substring(0, i-2);
			var r = data.content.substring(i);
			data.content = l + t + r;
			data.italic.push(i-shift);
		}
	}

	if(data.underline.length == 1){
		data.content = data.content.replace("`u", "<u>");
	}
	if(data.bold.length == 1){
		data.content = data.content.replace("`b", "<b>");
	}if(data.italic.length == 1){
		data.content = data.content.replace("`i", "<i>");
	}
}

function isWordUperCase(input){
	if(input.charCodeAt(0) >= 65 && input.charCodeAt(0) <=  90)
		return true;
	else
		return false;
}

function containsIntegers(input){
	if(input.charCodeAt(0) >= 48 && input.charCodeAt(0) <=  57)
		return true;
	else
		return false;
}

//implied that isHeader and isBullet point has already been called
function isItalic(){
	
	for(var i = data.bulletPointLevel+1; i < (data.content.length-data.headerSize); i++){
		if(data.content.charAt(i) == "`"){
			data.italic.push(i);
			i++;
		}
	}

	//console.log("Italic: ", data.italic);
}

//Counts how many tildas exist at the beginning of the line
function isBulletPoint(){
	var level = 0;
	while(data.content.charAt(level) == '`'){
		level++;
	}
	data.content = data.content.substring(level);

	data.bulletPointLevel = level;
	data.vocab -= level;

	//console.log("Bullet Point: ", data.bulletPointLevel);
}

//Looks for the standard content splitting character ("-", ":", "=") and marks the earliest location of them to be used to bold the left hand side and store the right
//under the case when the vocab word is hyphined (abc-def) do a check if there is a dash followed by another character and if the dash had no surrounding spaces dont use it
function isVocab(){
	var text = data.content.trim();
	var dash = text.indexOf('-');
	var colin = text.indexOf(':');
	var equals = text.indexOf('=');
	var tilda = text.indexOf('`');
	var marks = [];

	if(dash > 0){
		if(data.url.length > 0){
			var t = false;
			for(var i = 0; i < data.url.length-1; i+=2){
				if(dash < data.url[i+1] && dash > data.url[i]){
					break;
				}else{
					t = true;
				}
			}
			if(t)
				marks.push(dash);
		}else
			marks.push(dash);
	}
	if(colin > 0){
		if(data.url.length > 0){
			var t = false;
			for(var i = 0; i < data.url.length-1; i+=2){
				if(colin < data.url[i+1] && colin > data.url[i]){
					break;
				}else{
					t = true;
				}
					
			}
			if(t)
				marks.push(colin);
		}else
			marks.push(colin);
		
	}
	/*if(tilda > 0){
		if(data.url.length > 0){
			var t = false;
			for(var i = 0; i < data.url.length-1; i+=2){
				if(tilda < data.url[i+1] && tilda > data.url[i]){
					break;
				}else{
					t = true;
				}
					
			}
			if(t)
				marks.push(tilda);
		}else
			marks.push(tilda);
		
	}*/
	if(equals > 0){
		if(data.url.length > 0){
			var t = false;

			for(var i = 0; i < data.url.length-1; i+=2){
				if(equals < data.url[i+1] && equals > data.url[i]){
					break;
				}else{
					t = true;
				}
			}
			if(t)
				marks.push(equals);
		}else
			marks.push(equals);
		
	}

	var maxLeftHandCharacters = 0;
	var w = 0;
	while(w < data.words.length && w < 5){
		maxLeftHandCharacters += data.words[w].length;
		w++;
	}

	if(marks.length > 0){
		//var split = text.length;
		var split = text.length;
		for(var i = 0 ; i < marks.length; i++){
			if(marks[i] < split && marks[i] <= maxLeftHandCharacters)
				split = marks[i];
		}
		if(split < text.length)
			data.vocab = split;

		//console.log("Vocab: ", split);
	}
}



//replaces common characters (arrows)
function replaceChars(){
	var mark;
	data.content = data.content.replace(/&lt;-&gt;/, String.fromCharCode(8596));
	data.content = data.content.replace(/&lt;-/, String.fromCharCode(8592));
	data.content = data.content.replace(/-&gt;/, String.fromCharCode(8594));
}



//checks each word per line that is could contain (https://_) and checks if it is a url
function findURL(){
	var leftLength = 0;
	for(var i = 0; i < data.words.length; i++){
		if(data.words[i].length >= 9){
			if(isURL(data.words[i])){
				data.url.push(leftLength);
				data.url.push(leftLength+data.words[i].length);
			}
		}
		leftLength += data.words[i].length;
	}
	//console.log("URL: ", data.url);
}

function isURL(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}


function printTable(){
	var tableContent = data;
	//console.log(data);

	var html = "<table style=\"width:100%\">";

	var rows = 0;
	for(var i = 0 ; i < tableContent.table.columns; i++){
		rows = Math.max(tableContent.table.content[i].length, rows);
	}

	for(var i = 0; i < rows; i++){
			html += "<tr>";

		for(var j = 0; j < tableContent.table.columns; j++){
			if(i < tableContent.table.content[j].length){
				data = tableContent.table.content[j][i];
				var rowContent = print();
				html += "<td>" + rowContent + "</td>";
			}else{
				html += "<td></td>";
			}
		}
		html += "</tr>";
		
	}

	html += "</table>";
	return html;
}

/*
isVocab();
replaceChars();*
isBulletPoint();*
findURL();
isHeader();*
isItalic();
*/
function print(){
	var tagTypes = [ "p", "h1", "h2", "h3", "h4", "h5", "h6" ];
	var fontSizeTypes = [ "20", "35", "26", "22", "18", "18", "18" ];
	var html = "";


		var openTag = tagTypes[data.headerSize];
		var color = '#444444';
		var opacity = 1;

		if(data.content.trim().length == 0){
			html += "<p><br></p>";
		}else{
			if(data.headerSize > 0){
				color = $('#header').css('background-color');
				opacity = 1-(0.1)*data.headerSize;
			}
			var closeTag = openTag;



			if(data.bulletPointLevel > 0){
				//data.margin += (25)*(data.bulletPointLevel);
				var type = "disk";
				if(data.bulletPointLevel%3 == 1){
					type = "disk";
				}else if(data.bulletPointLevel%3 == 2){
					type = "circle";
				}else{
					type = "square";
				}
				
				if(openTag == "p"){
					html += "<ul><li class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" style=\"list-style-type:" + type+";";
					closeTag = "li></ul";
				}else{
					//html += "<ul><li style=\"list-style-type:" + type+";\">";
					//html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" ";
					html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" ";
					html += ">" + "<ul><li style=\"list-style-type:" + type+";font-size:"+fontSizeTypes[data.headerSize] + "px;";
					closeTag = "li><ul></"+closeTag;
					//closeTag = "</" + closeTag + "></li></ul";
				}
			}else{
				html += "<" + openTag + " class=\"formatted_text\" id=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\" onkeyup=\"editFormattedText()\" onmouseover=\"hoverOverText(this)\" " + " style=\"";
			}

			html += "color:"+color+";opacity:"+opacity + ";margin-left:"+(data.margin+(25*(data.bulletPointLevel)))+"px;\">";

			//var html = "<" + openTag + "color:"+color+";opacity:"+opacity + ";margin-left:"+data.margin+"px;\" class=\"" + data.lineNumber + "\" onclick=\"onTextClicked(this)\"" + ">";


			

			var content = data.content;

			var mark = 0;
			var right = data.content;
			if(data.vocab > 0){
				var left = data.content.substring(0, data.vocab).replace(/ /g, "&nbsp;&nbsp;");
				right = data.content.substring(data.vocab+1);

				html += "<b>" + left + "</b> " + data.content.substring(data.vocab, data.vocab+1).replace(/  /g, "&nbsp;&nbsp;") + " ";
				//mark = left.length;
			}

			if(data.url.length > 0){
				for(var i = 0; i < data.url.length-1; i+=2){
					if(data.url[i] > data.vocab){
						html += right.substring(mark, data.url[i]).replace(/  /g, "&nbsp;&nbsp;") + "<ins \"onclick=\"urlclick(this)\">" + right.substring(data.url[i], data.url[i+1]) + "</ins>";
						mark = data.url[i+1];
					}
				}
				html += right.substring(mark);
			}else
				html += right.replace(/  /g, "&nbsp;&nbsp;");

			
			
			html += "</" + closeTag + ">";
		}
	
	return html;
		
}

function editFormattedText(e){
	console.log("dgaf");
}

function hoverOverText(e){
	/*var id = $(e)[0].id;
	activeLine = parseInt(id);
	placeTabs(id);*/
}

function placeTabs(id){
	$('#tabs').css('opacity', 1);
	$('#tabs').css('top', ($('#'+id).position().top + parseInt($('#'+id).css('margin-top').replace("px", ""))));
	$('#tabs').css('left', $('#'+id).css('margin-left'));
}

function tabLeftClicked(){
	if(page[activeLine].margin > 0){
		page[activeLine].margin -= 25;
		reBuildDoc();
		//placeTabs(activeLine);
	}

}

function tabRightClicked(){
	//console.log(page[activeLine].margin + " : " + page[6].margin + " : " + page[6].bulletPointLevel);
	page[activeLine].margin += 25;
	reBuildDoc();
	//placeTabs(activeLine);

}

function urlclick(e){
	if(smartClickMode){
		if(!$('#webview').is(":visible")){
			$('#outbox').css('height', '50%');
			$('#outbox').css('max-height', '50%');
			$('#outbox').css('resize', 'vertical');
		}
		$('#webview').show();
		var url = $(e)[0].textContent;
		$('iframe').attr('src', url);
	}else{
		var text = document.getElementById("document").value.split('\n');
		//console.log($(e)[0].textContent);
		var characterCount = 0;
		for(var i = 0; i < $(e).attr("class"); i++){
			characterCount += text[i].length+1;
		}
		
		//Doesn't scroll enough if the text on a particular line is wrapped
		var adjust = countBlankLines(text, $(e).attr("class"));
		heighlightText(characterCount, characterCount+text[i].length);
		//$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')*(parseInt($(e).attr("class"))+adjust)/text.length-100}, 100);
		$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')/$('#outbox').prop('scrollHeight')*$('#outbox').scrollTop() }, 100);
	}

}

var workingLine = 0;
var lastEditedText = "";

function onTextClicked(e){
	//console.log(page);
	
	if(page[parseInt($(e).attr("id"))].url.length > 0){
		urlclick(e);
	}
	workingLine = parseInt($(e).attr("id"));
	//console.log(workingLine);
	//lastEditedText = page[workingLine].content;
	//lastEditedText = $('#'+workingLine).text();
	//console.log(lastEditedText);
	var text = document.getElementById("document").value.split('\n');
	
	if(smartClickMode && (typeof $(e)[0].firstChild != 'undefined' && $(e)[0].firstChild.tagName == "B")){
		var word = $(e)[0].firstChild.textContent.split(" ");
		if(!$('#webview').is(":visible")){
			$('#outbox').css('height', '50%');
			$('#outbox').css('max-height', '50%');
			$('#outbox').css('resize', 'vertical');
		}
		$('#webview').show();

	}else{
		//console.log($(e)[0].textContent);
		var characterCount = 0;
		for(var i = 0; i < $(e).attr("id"); i++){
			characterCount += text[i].length+1;
		}
		
		//Doesn't scroll enough if the text on a particular line is wrapped
		var adjust = countBlankLines(text, $(e).attr("id"));
		heighlightText(characterCount, characterCount+text[i].length);
		//$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')*(parseInt($(e).attr("class"))+adjust)/text.length-100}, 100);
		$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')/$('#outbox').prop('scrollHeight')*$('#outbox').scrollTop() }, 100);
	}

}

function getLineFromLocation(text, cursorLocation){
	var count = 0;
	for(var i = 0; i < text.length; i++){
		count += text[i].length+1;
		if(count > cursorLocation){
			return i;
		}
	}
}

function scrollFromType(text, line){

	if(typeof $('#'+line).position() != 'undefined')
	$("#outbox").animate({ scrollTop: $("#outbox").scrollTop() + $('#'+line).position().top- $("#outbox").height()/2 + $('#'+line).height()/2}, 100);
}

function countBlankLines(text, upTo){
	var count = 0;
	for(var i = 0; i < upTo; i++){
		if(text[i].length == 0)
			count++;
	}
	//console.log("Blanks: " + count);
	return count;
}

function heighlightText(start, end) {
	var textarea = document.getElementById('document');
	//console.log(textarea.value.substring(start,end));
    if(typeof(textarea.selectionStart) != "undefined") {
        textarea.focus();
        textarea.selectionStart = start;
        textarea.selectionEnd = end;
        return;
    }

    if (document.selection && document.selection.createRange) {
        textarea.focus();
        textarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", end);
        range.moveStart("character", start);
        range.select();
        return;
    }
}
			