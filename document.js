function makeDocFromKey(){
		//TODO
		//Add current text to queue

		save("status", 0);
		var currentTime = new Date();
		save("lastkey", currentTime.getTime());

		var cursorLocation = $('#document').prop("selectionStart");
		var content = document.getElementById("document").value;
		var doctext = content.split('\n');
		//console.log(content);
		//console.log(doctext);
		/*<script>console.log("hello");</script>*/
		var curline = getLineFromLocation(doctext, cursorLocation);
		makeDoc(doctext, curline);
		scrollFromType(doctext, curline);
		$('.'+curline).effect( "highlight", {color:"#90caf9"}, 500 );


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

function countBlankLines(text, upTo){
	var count = 0;
	for(var i = 0; i < upTo; i++){
		if(text[i].length == 0)
			count++;
	}
	console.log("Blanks: " + count);
	return count;
}

function scrollFromType(text, line){

	if(typeof $('.'+line).position() != 'undefined')
	$("#outbox").animate({ scrollTop: $("#outbox").scrollTop() + $('.'+line).position().top- $("#outbox").height()/2 + $('.'+line).height()/2}, 100);
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
		console.log($(e)[0].textContent);
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

function onTextClicked(e){
	var text = document.getElementById("document").value.split('\n');
	if(smartClickMode && (typeof $(e)[0].firstChild != 'undefined' && $(e)[0].firstChild.tagName == "B")){
		var word = $(e)[0].firstChild.textContent.split(" ");
		if(!$('#webview').is(":visible")){
			$('#outbox').css('height', '50%');
			$('#outbox').css('max-height', '50%');
			$('#outbox').css('resize', 'vertical');
		}
		$('#webview').show();

		/*var url = "http://www.dictionary.com/browse/";
		for(var i = 0; i < word.length; i++){
			url += word[i] + "-";
		}

		if(!$('#webview').is(":visible")){
			$('#outbox').css('height', '50%');
			$('#outbox').css('max-height', '50%');
			$('#outbox').css('resize', 'vertical');
		}
		$('#webview').show();*/

		/*url = "http://services.aonaware.com/DictService/Default.aspx?action=define&dict=*&query="+word;
		console.log(url);

		var getDef = new XMLHttpRequest();
		getDef.open("GET", url);
		getDef.send();
		var timer = setInterval(function(){
			if(getDef.responseText != null && getDef.responseText.length > 0){
				clearInterval(timer);
				console.log(getDef.responseText);
			}*/
		/*var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://lateral-scion-146706.appspot.com/hello", true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send('name='+word);
		var timer = setInterval(function(){
			if(xhr.responseText != null && xhr.responseText.length > 0){
				clearInterval(timer);
				console.log(xhr.responseText);
			}*/
				//var xml = $.parseXML(xhr.responseText);
				
				/*console.log($.parseXML(xhr.responseText));
				var xml = xhr.responseText,
					xmlDoc = $.parseXML(xml),
					$xml = $(xmlDoc),
					title = $xml.find("def");
					console.log(title);*/
				
				//var content = "<html><body><p>textas</p></body></html>";
				/*var iframe = document.createElement("iframe");
				var webview = document.createElement('webview');
    			webview.appendChild(iframe);
				var doc = iframe.document;
			    if(iframe.contentDocument)
			        doc = iframe.contentDocument; // For NS6
			    else if(iframe.contentWindow)
			        doc = iframe.contentWindow.document; // For IE5.5 and IE6
			    // Put the content in the iframe
			    doc.open();
			    doc.writeln(content);
			    doc.close();*/

			    //var html2 = $.parseHTML(content)
			    //$('#webview').append(xhr.responseText);

				/*var iframe = document.createElement('iframe');
				var webview = document.createElement('webview');
				var html = '<body>Foo</body>';
				iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
				webview.appendChild(iframe);
				console.log('iframe.contentWindow =', iframe.contentWindow);*/
				//$('#webview').append(xhr.responseText);
				//$('#webview').append("<p>test</p><h1>title</h1>");
				//$('iframe').innerHTML("<p>test</p>");
				
			
		//}, 100);
		
		//$('#webview').append(xhr.responseText);

		/*if(url[url.length-1] == "-")
			$('iframe').attr('src', url.substring(0, url.length-1));
		else
			$('iframe').attr('src', url);*/



		//http://www.dictionary.com/browse/word
	}else{
		console.log($(e)[0].textContent);
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

  	//$("#document").scrollTop($('#document').prop('scrollHeight')*$(e).attr("class")/text.length); 
	/*var characterCount = 0;
	var topMatch = 0;
	var topScore = 0;
	var topCount = 0;
	var done = false;
	for(var i = 0; i < text.length; i++){
		var tempScore = compareText(text[i], $(e)[0].textContent);
		if(tempScore >= 1){
		//if(text[i].includes($(e)[0].textContent)){
			console.log("Perfect Match: " + i + " --- (" + tempScore + ")");
			heighlightText(characterCount, characterCount+text[i].length);
			$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')*i/text.length}, 100);
			done = true;
			break;
		}
		if(tempScore > topScore){
			topScore = tempScore;
			topMatch = i;
			topCount = characterCount;
		}
		characterCount += text[i].length+1;
	}
	if(!done){
		console.log("Best Guess: " + topMatch + " --- (" + topScore + ")");
		heighlightText(topCount, topCount+text[topMatch].length);
		$("#document").animate({ scrollTop: $('#document').prop('scrollHeight')*topMatch/text.length}, 100);
	}*/
}

function compareText(a, b){
	if(a.length/b.length > 2 || a.length/b.length < 0.5)
		return 0;
	if(a.includes(b))
		return 1;
	var score = (a.length > b.length) ? (compare(a.toLowerCase().trim(), b.toLowerCase().trim(), 0, 0, 0)) : (compare(b.toLowerCase().trim(), a.toLowerCase().trim(), 0, 0, 0));
	var goal = (a.length > b.length) ? b.length*.7 : a.length*.7;
	return score/goal;
}
function compare(a, b, i, j, s){
	count++;
	if(i == a.length || j == b.length)
		return 0;
	if(s > 2)
		return 0;
	if(a[i] == b[j]){
		return 1 + compare(a, b, i+1, j+1, 0);
	}else{
		var tempa = compare(a, b, i+1, j, s+1);
		var tempb = compare(a, b, i, j+1, s+1);
		return (tempa > tempb) ? tempa : tempb;
	}
}

function heighlightText(start, end) {
	var textarea = document.getElementById('document');
	console.log(textarea.value.substring(start,end));
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

function makeDoc(text, currentLine){
	var outbox = document.getElementById("outbox");

	while (outbox.hasChildNodes()) {
    	outbox.removeChild(outbox.lastChild);
	}

	var indentOut = 0, row = 0;
	var list = [];

	for(var i = 0; i < text.length; i++){
		var data = { content:text[i].replace(/</g, "&lt;").replace(/>/g, "&gt;"), url:false, bulletPoint:false, opacity:1, vocab:false, italic:false, header:false, title:false, close:false, color:"", tag:false, indent:indentOut, pageStart:(row==0)};
		if(text[i].length <= 0){
			//Check for empty lines
    	}else{
    		data = scrapeContent(data);
    		if(data.bulletPoint){
    			data = toString(data, i);
    			
    			list.push(data.content);
    		}else if(typeof list != 'undefined' && list.length > 0){
    			text[i] = "<ul>";
    			for(var l = 0; l < list.length; l++){
    				text[i] += list[l];
    			}
    			text[i] += "</ul>";
    			data = toString(data, i);
    			text[i] += data.content;
    			list = [];
    			$('#outbox').append(text[i]);
    		}else{
    			data = findTitle(data);
    			data = toString(data, i);
    			text[i] = data.content;
    			$('#outbox').append(text[i]);
    		}
    		if(data.header)
    			indentOut++;
    		if(data.close)
    			indentOut--;
    		row++;
    	}
	}
	if(typeof list != 'undefined' && list.length > 0){
		var temptext = "<ul id=\"outlist\" margin-left:" + (indentOut*50) + "px;>";
		for(var l = 0; l < list.length; l++){
			temptext += list[l];
		}
		temptext += "</ul>";
		list = [];
		$('#outbox').append(temptext);
	}
	var date = new Date();
	save(locationKey+currentFolder + ",," + currentNote, document.getElementById("document").value);
}

function scrapeContent(data){
	data = isURL(data);
	if(!data.url){
		data = isClose(data);
		data = isItalic(data);
		data = isBulletPoint(data);
		data = findUglyChars(data);
		data = isHeader(data);
		data = findVocab(data);
	}
	return data;
}

function isClose(data){
	var content = data.content;
	var mark = content.indexOf("-");
	if(mark == 0 && content.length < 4){
		content = "";
		data.close = true;
		data.content = content;
		return data;
	}
	data.content = content;
	return data;
}

function isItalic(data){
	var content = data.content;
	var mark1 = content.indexOf("--");
	var mark2 = content.indexOf("--", mark1+2);
	if(!data.close && mark1 >= 0 && mark2 > mark1){
		content = "<em>" + content.substring(mark1+2, mark2) + "</em>";
		data.italic = true;
		data.content = content;
		return data;
	}
	data.content = content;
	return data;
}

function isBulletPoint(data){
	var content = data.content;
	var mark = content.indexOf("-");
	if(mark == 0 && !data.close && !data.italic){
		data.content = content.substring(1);
		data.bulletPoint = true;
		data.tag = 7;
		return data;
	}
	data.tag = 0;
	return data;
}

function isHeader(data){
	var content = data.content;
	var mark = content.lastIndexOf("-");
	if(!data.close && !data.vocab && mark == content.length-1 && content.charAt(mark-1) != '-'){
		content = content.substring(0, content.length - 1);
		data.header = true;
		if(!data.bulletPoint){
			//setTag(4);
			data.tag = 4;
			//data.color = "5388dc";
			data.opacity = 0.7;
			data.color = rgb2hex($('#header').css('backgroundColor'));
		}
		data.content = content;
		return data;
	}
	data.content = content;
	return data;
}

function findUglyChars(data){
	var content = data.content;
	var mark;
	if((mark = content.indexOf("<->")) >= 0){
		content = content.substring(0, mark) + String.fromCharCode(8596) + content.substring(mark+3);
	}else if ((mark = content.indexOf("<-")) >= 0){
		content = content.substring(0, mark) + String.fromCharCode(8592) + content.substring(mark+2);
	}else if ((mark = content.indexOf("->")) >= 0){
		content = content.substring(0, mark) + String.fromCharCode(8594) + content.substring(mark+2);
	}
	data.content = content;
	return data;
}

function findVocab(data){
	var content = data.content;
	var mark = content.indexOf("-");
	if(mark > 1 && mark+2 < content.length){
		content = "<b>" + content.substring(0, (content.charAt(mark-1) == ' ') ? mark-1 : mark) + "</b>"  + " - " + content.substring((content.charAt(mark+1) == ' ') ? mark+2 : mark+1);

		data.vocab = true;
		if(data.header){			
			data.color = rgb2hex($('#header').css('backgroundColor'));
		}
	}
	data.content = content;
	return data;
}

function findTitle(data){
	var content = data.content;
	data = isTitle(data);
	if(data.title && !data.italic && !data.bulletPoint && !data.close && !data.vocab && !data.header){
		data.tag = 5;
		//data.color = "5566bb";
		//console.log(rgb2hex($('#header').css('backgroundColor')));
		data.color = rgb2hex($('#header').css('backgroundColor'));
		if(!data.pageStart)
			content = "<hr><br>" + content;
	}
	data.content = content;
	return data;
}

function isTitle(data){
	var content = data.content;
	var words = content.split(" ");
	var score = 0;
	for(var i = 0; i < words.length; i++){
		if(words[i].length > 0)
			score = (isWordUperCase(words[i])||containsIntegers(words[i]) ? score+1 : score);
	}
	if(score/words.length >= 0.6){
		data.title = true;
		return data;
	}
	data.title = false;
	return data;
}

function isURL(data) {
	if(data.content.indexOf(" ") >= 0){
		data.url = false;
		return data;
	}
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  data.url = pattern.test(data.content);
  return data;
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

function rgb2hex(rgb) {
     if (  rgb.search("rgb") == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
}

function toString(data, row){
	var tagTypes2 = [ "p", "h6", "h5", "h4", "h3", "h2", "h1", "li" ];
	var content = data.content;
	if(data.url){
		data.content = "<p class=\"" + row + "\"onclick=\"urlclick(this)\"  >" + content + "</p>";
		return data;
	}
	if($('.night').text() == 'day mode'){
			data.color = "ffffff";
		}
	if((data.color.length>0 || data.indent > 0) && !data.bulletPoint){
		
		data.content = "<" + tagTypes2[data.tag] + " style=\"color:#" + data.color + ";text-indent:" + (data.indent*50) + "px;opacity:" + (data.opacity) + ";\" class=\""+ row + "\" onclick=\"onTextClicked(this)\">" + content + "</" + tagTypes2[data.tag] + ">";
		
		return data;
	}else{
		data.content = "<" + tagTypes2[data.tag] + " style=\"color:#" + data.color + ";\"" + " class=\""+ row + "\" onclick=\"onTextClicked(this)\"  >" + content + "</" + tagTypes2[data.tag] + ">";

		return data;
	}
				
}

