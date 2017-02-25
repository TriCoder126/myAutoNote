
		var textColor = "#444444";
		//localStorage.clear();
		var painting = false;
			var startX = 0;
			var startY = 0;
		var locationKey = "L_";
		var loggedin = false;
		var dualScreenEditMode = true;
		var smartClickMode = false;
		var draweropen = false;
		var drawershift = 0;
		var drawerscreen = 'color';
		var lastTimeOfKey = new Date();
		var tagTypes = [ "p", "h6", "h5", "h4", "h3", "h2", "h1", "li" ];

		var status = 0,
			color,
			folders,
			currentFolder = "Documents",
			currentNote = "Welcome_to_AutoNote",
			editorText = "should never appear",
			editorTitle = "randmom title",
			folderView = -1;

		var fs_folders;
		var userDBID;
		var lastNote;
		var backedUpLastNote;
		var schedule;
		var day, hour;

			function showUserCard(){
				$('#userCard').css('opacity', '0.99');
				$('#userCard').css('height', '90px');
				$('#userCard').css('width', '12.5%');
				$('#userIcon').css('right', '19%');
				$('#userIcon').css('margin-top', '22.5px');
				$('#userIcon').css('width', '60px');
				$('#userIcon').css('opacity', '0.97');
				$('#userIcon').css('border-radius', '30px');
				$('#userIcon').css('background', '#039bdf');
				$('#logout').css('display', 'block');
			}

			function hideUserCard(){
				$('#userCard').css('opacity', '0');
				$('#userCard').css('height', '0px');
				$('#userCard').css('width', '0px');
				$('#userIcon').css('right', '5%');
				$('#userIcon').css('margin-top', '5px');
				$('#userIcon').css('width', '37.5px');
				$('#userIcon').css('border-radius', '18.75px');
				$('#userIcon').css('background', '0');
				$('#logout').css('display', 'none');

			}



		

		$(document).ready(function() {

			/*$(window).unload( function () { alert("Bye now!"); } );*/
			$('.largeImage').css('opacity', 1);
			//$('#backgroundVideo').height(1000);
			//$('.smallImage').css('opacity', 0);
			//$('.smallImage').attr('src', "background3.png");
			

			if(true){//logged out
				$('#googleSignIn').click(function(){
					startLoad(0);
					
					signIn();

						
				});
			}

			//dualScreenEditMode = false;
			//$('#left').hide();
			//$('#left').css('width', 0);
			//$('#left').css('opacity', 0);
			$('#document').css('color', textColor);
			var timer = setInterval(function(){
				//$('#left').hide();
				clearInterval(timer);
			}, 200);
			$(".fullscreen").attr("src","ic_fullscreen_exit_black_48dp_2x.png");


			//var i = queue.shift();
			//localStorage.clear();
			var status = get(locationKey+"status");
			

			if(status == null || typeof status == 'undefined'){
				console.log("***creating new Instance***");
				save(locationKey+"status", 0);
				save(locationKey+"color", $('#header').css("background-color"));
				save(locationKey+"last", "Documents,,Welcome to AutoNote");
				save(locationKey+"folders", "Documents");
				//save(locationKey+"Documents,,Welcome to AutoNote", "Welcome To myAutoNote!!!\nDon't waste anymore time in class with formatting and designing you notes. Let use make them look the best. You can quickly make sure that your notes look great without ever needing to push a button if you just follow these simple guidlines. Enjoy :)\nCapital Letters Indicate Titles\nA dash at the end of a line will make a header-\nContent under headers will shift over\n--make italics with two dashes before and after a line--\n--shift content back over by putting a dash on an empty line--\nIf you dont use any dashes then just a plain line will appear\n-A dash at the beginning of a line makes bullet points\n-Make as many as you want\n-\nClick links with smart click turned on to open a mini webview-\nhttps://chara.cs.illinois.edu/cs225/\n-");
				save(locationKey+"Documents,,Welcome to AutoNote","How to prepare a peanut butter and jelly sandwich?`\nPreparation\n`Pull two slices of bread out of the package\n`Lay the slices down adjacent to each other \n`Get the peanut butter and jelly out of the fridge\n`Open both jars\n`Take a knife out of your utensil drawer\nAssembly\n`Jelly``\n``Scoop up a small mound of jelly from the jelly jar\n``Scrape the mound onto the left-most slice of bread and spread it around evenly\n`Peanut Putter``\n``Scoop up a small mound of peanut putter from the peanut butter jar\n``Scrape the mound onto the right-most slice of bread and spread it around evenly\n`Bread``\n``Carefully pick up one slice of bread only holding the sides\n``Flip it over and place it onto the other slice\nClean Up\n`Clean up your work surface by screwing the lids back onto the jars and washing the knife\nNow you can eat your sandwich!!!`\nVocabulary\nUtensil- an implement, container, or other article, especially for household use.\nSlice-a small cross-section of bread");
				//save(locationKey+"Documents,,Welcome to AutoNote", "Capital Letters Indicate Headers`\nTo make more headers put ` at the end of a line. The more you use the larger it will be``\nWhen you write vocabulary put any character you would like in between the word and the definition\nWord- definition\nWord2=definition2\nWord3 : definition 3\n`Put a ` in the beginning of the line to create a bullet point\n``Make as many as you need\n``Add another tilda to\n``use as many as you want\n"/*``\nhello line``\n`line2\n`line3\n`\ngoodbye``\n`line3\n`line4\n`"*/+"https://chara.cs.illinois.edu/cs225/");
				save(locationKey+"Documents,,First Note", "First stuff");
				save(locationKey+"Documents", "First Note,,Welcome to AutoNote");
			}
			//printStorage();
			pullFromLocal();
			

			$('#header').css("background-color", get(locationKey+"color"));
			$('.arangement .bottom').css('opacity', 0);
			$('#webview').toggle();

			$('#document').text("How to prepare a peanut butter and jelly sandwich?`\nPreparation\n`Pull two slices of bread out of the package\n`Lay the slices down adjacent to each other \n`Get the peanut butter and jelly out of the fridge\n`Open both jars\n`Take a knife out of your utensil drawer\nAssembly\n`Jelly``\n``Scoop up a small mound of jelly from the jelly jar\n``Scrape the mound onto the left-most slice of bread and spread it around evenly\n`Peanut Putter``\n``Scoop up a small mound of peanut putter from the peanut butter jar\n``Scrape the mound onto the right-most slice of bread and spread it around evenly\n`Bread``\n``Carefully pick up one slice of bread only holding the sides\n``Flip it over and place it onto the other slice\nClean Up\n`Clean up your work surface by screwing the lids back onto the jars and washing the knife\nNow you can eat your sandwich!!!`\nVocabulary\nUtensil- an implement, container, or other article, especially for household use.\nSlice-a small cross-section of bread");
			$('#toolbar1 p').text("Welcome to myAutoNote");
			
			//makeDoc(document.getElementById("document").value.split('\n'), 0);
			parse(document.getElementById("document").value);
			resizeScreen();
			
			$('#usrnm').css('opacity', 0);
			$('#pswd').css('opacity', 0);
			$('.abottom').hide();
			$('#processor').hide();
			makeDrawer();

			//canvas_arrow(document.getElementById('myCanvas').getContext("2d"), 0, 0, 100, 100);
			

			editor = document.getElementById("document");
			editor.addEventListener("keyup", makeDocFromKey);
			var formattedTextDisplay = document.getElementById("outbox");
			//formattedTextDisplay.addEventListener("keyup", makeDocFromKey);
			/*$('#document').keydown(function(evt){
				console.log(evt);
			    if (evt.keyCode==83 && (evt.ctrlKey)){
			        evt.preventDefault();
			        //alert('worked');
			    }
			});*/
			editor.addEventListener('keydown', function (e) {
				//console.log(e);
			  if(e.keyCode==9) {
			  	e.preventDefault();
			  	insertAtCursor(document.getElementById("document"), "   ");
			  	/*var cursorLocation = $('#document').prop("selectionStart");
				var doctext = document.getElementById("document").value.split('\n');
				var curline = getLineFromLocation(doctext, cursorLocation);
				activeLine = curline;*/
				//tabRightClicked();
			  }
			});





			window.addEventListener("beforeunload", function (e) {
			  var confirmationMessage = "hello";
			  console.log("ahhhh");
			  
			  if(queue.length > 0){
			  	 dumpQueue(1);
			 	 (e || window.event).returnValue = confirmationMessage; //Gecko + IE
			 	 return confirmationMessage;                            //Webkit, Safari, Chrome

			 }
			});

			//var editTimerRefresh = setInterval(function{}, 5000);



			var getSelectedNode = function() {
			    var node,selection;
			    if (window.getSelection) {
			      selection = getSelection();
			      node = selection.anchorNode;
			    }
			    if (!node && document.selection) {
			        selection = document.selection
			        var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
			        node = range.commonAncestorContainer ? range.commonAncestorContainer :
			               range.parentElement ? range.parentElement() : range.item(0);
			    }
			    if (node) {
			    	while(node.parentNode.id == "")
				  			node = node.parentNode;
			    	return node.parentNode.id;
			    	//console.log(node.parentNode.id);
			      //return (node.nodeName == "#outbox" ? node.parentNode : node);
			    }
			};

			$(function() {

			  $("#outbox").bind('select keyup mouseup', function(e) {
			  	return;
			  	console.log(e);
			  	var selectedline = getSelectedNode();
		    	var box = document.getElementById('outbox');
		    	var cursorStartLocation = getSelection().anchorOffset;
		    	var newCursorLocation = cursorStartLocation;
			  	if(typeof e.keyCode != 'undefined' && (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)){
			  		
		  		
		  			//console.log("typed");
		  			/*if(!isNaN(selectedline)){

				    	parseText($('#'+selectedline).text(), parseInt(selectedline));

				    	$( "#"+selectedline ).remove();

				    	data = page[parseInt(selectedline)];
				    	var html = print();
				    	if(parseInt(selectedline) == 0){
				    		$('#outbox').prepend(html);
				    	}else
							$(html).insertAfter("#" + (parseInt(selectedline)-1));
					
					    }
				    if(cursorStartLocation >= page[parseInt(selectedline)].content.length)
						cursorStartLocation = page[parseInt(selectedline)].content.length;*/
			  		
			  	}else{
			  		if(smartClickMode){
			  			console.log("smart");
			  			if(!$('#webview').is(":visible")){
							$('#outbox').css('height', '50%');
							$('#outbox').css('max-height', '50%');
							$('#outbox').css('resize', 'vertical');
						}
						$('#webview').show();
						if(page[parseInt(selectedline)].url.length > 0){
							var url = page[parseInt(selectedline)].content.substring(page[parseInt(selectedline)].url[0], page[parseInt(selectedline)].url[1]);
							console.log(url);
							$('iframe').attr('src', url);
						}
						
			  		}else{
				  		//console.log("clicked");
				  		reBuildDoc();
				  		if(!isNaN(selectedline)){
				  			
					    	//parseText($('#'+selectedline).text(), parseInt(selectedline));

					    	$( "#"+selectedline ).remove();

					    	data = page[parseInt(selectedline)];
					    	newCursorLocation = cursorStartLocation +  page[parseInt(selectedline)].bulletPointLevel;
					    	
					    	var html = "<p class=\"selected_text\" id=\"" + selectedline + "\" style=\"font-size:20px;padding:5px;\">" + page[parseInt(selectedline)].raw + "</p>";
					    	$('#'+selectedline).css('border-bottom-color"', '#039bdf');
					    	//console.log('#'+selectedline);

					    	if(parseInt(selectedline) == 0){
					    		$('#outbox').prepend(html);
					    	}else
								$(html).insertAfter("#" + (parseInt(selectedline)-1));
						
						    }
						    //$('#'+selectedline).text(page[parseInt(selectedline)].raw);
					    if(newCursorLocation >= page[parseInt(selectedline)].content.length)
							newCursorLocation = page[parseInt(selectedline)].content.length;
					}
			  	}

			  	if(!smartClickMode){
					var range = document.createRange();
					var sel = window.getSelection();
					range.setStart(box.childNodes[selectedline].firstChild, newCursorLocation);
					range.setEnd(box.childNodes[selectedline].firstChild, newCursorLocation);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			  });
			});



			function fireKey(el)
			{
			    //Set key to corresponding code. This one is set to the left arrow key.
			    var key = 37;
			    if(document.createEventObject)
			    {
			        var eventObj = document.createEventObject();
			        eventObj.keyCode = key;
			        el.fireEvent("onkeydown", eventObj);   
			    }else if(document.createEvent)
			    {
			        var eventObj = document.createEvent("Events");
			        eventObj.initEvent("keydown", true, true);
			        eventObj.which = key;
			        el.dispatchEvent(eventObj);
			    }
			} 

			function getCaretPosition(editableDiv) {
			  var caretPos = 0,
			    sel, range;
			  if (window.getSelection) {
			    sel = window.getSelection();
			    if (sel.rangeCount) {
			      range = sel.getRangeAt(0);
			      if (range.commonAncestorContainer.parentNode == editableDiv) {
			        caretPos = range.endOffset;
			      }
			    }
			  } else if (document.selection && document.selection.createRange) {
			    range = document.selection.createRange();
			    if (range.parentElement() == editableDiv) {
			      var tempEl = document.createElement("span");
			      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
			      var tempRange = range.duplicate();
			      tempRange.moveToElementText(tempEl);
			      tempRange.setEndPoint("EndToEnd", range);
			      caretPos = tempRange.text.length;
			    }
			  }
			  return caretPos;
			}

			function insertAtCursor(myField, myValue) {
			    //IE support
			    if (document.selection) {
			        myField.focus();
			        sel = document.selection.createRange();
			        sel.text = myValue;
			    }
			    //MOZILLA and others
			    else if (myField.selectionStart || myField.selectionStart == '0') {
			        var startPos = myField.selectionStart;
			        var endPos = myField.selectionEnd;
			        myField.value = myField.value.substring(0, startPos)
			            + myValue
			            + myField.value.substring(endPos, myField.value.length);
		            myField.selectionStart = endPos + myValue.length;
		            myField.selectionEnd = endPos + myValue.length;
			    } else {
			        myField.value += myValue;
			    }
			}

			var refresh = setInterval(function(){ 
				var checkTime = new Date();
				//console.log(checkTime.getTime() - get(locationKey+"lastkey"));
				if(loggedin && get(locationKey+"status") == 0 && checkTime.getTime() - get(locationKey+"lastkey") > 500)
					updateNote(); 
			}, 2000);

			$(window).resize(function(){
				resizeScreen();
				if($('#drawer').width() > 0){
					$('#drawer').height($(window).height());
					$('#drawer').width($(window).width()/8);
				}
			});

			

			

			/*var ctx = document.getElementById("myCanvas").getContext("2d");
			
			ctx.beginPath();
			canvas_arrow(ctx,0,0,100,100);
			ctx.stroke();
			function canvas_arrow(context, fromx, fromy, tox, toy){
			    var headlen = 10;   // length of head in pixels
			    var angle = Math.atan2(toy-fromy,tox-fromx);
			    context.moveTo(fromx, fromy);
			    context.lineTo(tox, toy);
			    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
			    context.moveTo(tox, toy);
			    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
			}
			$('#myCanvas').mousedown(function(e){
				var mouseX = e.pageX - this.offsetLeft;
				var mouseY = e.pageY - this.offsetTop;
				painting = true;	
				localStorage.setItem("painting", true);
				localStorage.setItem("startX", startX);
				localStorage.setItem("startY", startY);
			});
			$('#myCanvas').mousemove(function(e){
				var p = localStorage.getItem("painting");
			  if(p){
			  	var mouseX = e.pageX - this.offsetLeft;
				var mouseY = e.pageY - this.offsetTop;
				var ctx = document.getElementById("myCanvas").getContext("2d");
			    ctx.beginPath();
				canvas_arrow(ctx,localStorage.getItem("startX"),localStorage.getItem("startY"),mouseX,mouseY);
				ctx.stroke();
			  }
			});*/

			

			$('#document').click(function(){
				
				var cursorLocation = $('#document').prop("selectionStart");
				var doctext = document.getElementById("document").value.split('\n');
				var curline = getLineFromLocation(doctext, cursorLocation);
				//makeDoc(doctext, curline);
				scrollFromType(doctext, curline);
				$('#'+curline).effect( "highlight", {color:"#90caf9"}, 500 );
			});

			var form = document.getElementById('file-form');
			var fileSelect = document.getElementById('file-select');
			var uploadButton = document.getElementById('upload-button');
		
			/*form.onsubmit = function(event) {
				event.preventDefault();

				// Update button text.
				uploadButton.innerHTML = 'Uploading...';

				var files = fileSelect.files;
				var formData = new FormData();
				formData.append("myFile", files[0]);
				var xhr = new XMLHttpRequest();
				//xhr.open("POST", "http://localhost:8080/hello", true);//_ah/api/myApi/v1/postTest //https://lateral-scion-146706.appspot.com/hello
				xhr.open("POST", "http://localhost:8080/hello", true);//_ah/api/myApi/v1/postTest //
				//xhr.open("POST", "https://my-autonote-15012.appspot.com/hello", true);//_ah/api/myApi/v1/postTest //
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				//xhr.send(formData);
				//var url = "https://docs.google.com/document/d/1FibphNIU4jIwnAKAJYqfNm9GsGwt5c1Y27xyY-V6uX8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1-DW-KzbEIUCvLccbdVvrq0gEGnuIsdKuzuU7S08Soe8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1uD22-T2McVkeLqvZsl2cxakpZ9iZ10V4ZIFn9RchK7k/edit?usp=sharing";
				
				var url = "https://docs.google.com/presentation/d/1-DW-KzbEIUCvLccbdVvrq0gEGnuIsdKuzuU7S08Soe8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1ausvdUcft4XtamLR9kF56LHEe1cijtlSgFbgrtH9yzU/edit?usp=sharing";
				xhr.send('function=parsedoc&url='+url);
				var timer = setInterval(function(){
					if(xhr.responseText != null && xhr.responseText.length > 0){
						clearInterval(timer);
						console.log(xhr.responseText);
					}
					
				}, 100);
			}*/

			$('.atop').click(function(){

				if(dualScreenEditMode){
					dualScreenEditMode = false;
					$('#left').hide();
					$('.abottom').show();
					$('.atop').hide();
					resizeScreen();
				}
			});

			$('.abottom').click(function(){

				if(!dualScreenEditMode){
					dualScreenEditMode = true;
					$('#left').show();
					$('.abottom').hide();
					$('.atop').show();
					resizeScreen();
				}
			});

			$('#cf2').click(function(){//opens drawer with all notes
		        closeAll();

				noteDrawerClick();
			});

			$('.color').click(function(){//opens drawer with color options
				colorClick();
			});

			$('.night').click(function(){
				if($('.night').text() == 'night mode'){
					$('.night').text("day mode");
					textColor = "ffffff";
					$('body').css('background', '#192a39');
					$('#document').css('background', '#1f3447');
					$('#document').css('color', '#eeeee');
					$('#outbox').css('background', '#1f3447');
					$('#toolbar1').css('background', '#142634');
					$('#toolbar2').css('background', '#142634');
					$('#header').css('background', '#142634');
					$('h3').css('color', '#eeeee');
					$('li').css('color', '#eeeee');
					$('#outbox p').css('color', '#eeeee');
					$('#toolbar1 p').css('color', '#eeeee');
					$('#outlist').css('color', '#eeeee');

					$('#drawer').css('background', '#1f3447');
					$('.folderCard').css('background', '#1f3447');
					$('.noteCard').css('background', '#142634');
					$('#notes').css('color', '#ffffff');
					$('#folderTitle').css('color', '#ffffff');
					$('.subcard').css('background', '#142634');
					$('.subnotes').css('color', '#ffffff');

				}else{
					$('.night').text("night mode");
					textColor = "444444";
					$('body').css('background', '#f0f0f2');
					$('#document').css('background', '#f9f9f9');
					$('#document').css('color', '#444444');
					$('#outbox').css('background', '#f9f9f9');
					$('#toolbar1').css('background', '#fdfdfd');
					$('#toolbar2').css('background', '#fdfdfd');
					$('#header').css('background', '#3949AB');

					$('h3').css('color', '#444444');
					$('li').css('color', '#444444');
					$('#outbox p').css('color', '#444444');
					$('#toolbar1 p').css('color', '#444444');
					$('#outlist').css('color', '#444444');
					$('#drawer').css('background', '#f6f6f6');
					$('.notecard').css('background', '#fdfdff');
					$('#notes').css('color', '#444444');
					$('.subcard').css('background', '#f8f8f8');
					$('.subnotes').css('color', '#444444');
				}
			});


			$( "#notes" ).dblclick(function() {
				alert( "Handler for .dblclick() called." );
			});


			$('.web').click(function(){
				$('#webview').toggle();
				if($('#webview').is(":visible")){
					$('#outbox').css('height', '50%');
					$('#outbox').css('max-height', '50%');
					$('#outbox').css('resize', 'vertical');
				}else{
					$('#outbox').css('height', '100%');
					$('#outbox').css('max-height', '100%');
					$('#outbox').css('resize', 'none');
				}
			});

			

			function getUsersFolders(){
				console.log(activeUser);
				var email = activeUser.email;
				var uid = activeUser.uid;
				var data = {"query": `mutation LoginUserQuery ($input: LoginUserInput!) {
					    loginUser(input: $input) {
					      user {
					        id
					      }
					    }
					}`,
					"variables": `{
				    "input": {
				      "username": "${email}",
				      "password": "${uid}"
				    }}`	
			 	 }	

				$.ajax({
				  type: "POST",
				  url: "https://us-west-2.api.scaphold.io/graphql/myautonotedev"+"?query="+data.query.replace(/\t/g,'').replace(/\n/g,'')+"&variables="+data.variables.replace(/\t/g,'').replace(/\n/g,''),
				  json: true,
				  /*data: data,*/
				  success: function(data, status) {
				        console.log(status);
				        console.log(data);
				        console.log(data.data.loginUser.user.id);
				        return data.data.loginUser.user.id;
				    },
				});
			}

			$('.classnet').click(function(){
				/*var xhr = new XMLHttpRequest();
				//xhr.open("POST", "http://localhost:8080/hello", true);//_ah/api/myApi/v1/postTest //https://lateral-scion-146706.appspot.com/hello
				xhr.open("POST", "http://localhost:8080/hello", true);//_ah/api/myApi/v1/postTest //
				//xhr.open("POST", "https://my-autonote-15012.appspot.com/hello", true);//_ah/api/myApi/v1/postTest //
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				//xhr.send(formData);
				//var url = "https://docs.google.com/document/d/1FibphNIU4jIwnAKAJYqfNm9GsGwt5c1Y27xyY-V6uX8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1-DW-KzbEIUCvLccbdVvrq0gEGnuIsdKuzuU7S08Soe8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1uD22-T2McVkeLqvZsl2cxakpZ9iZ10V4ZIFn9RchK7k/edit?usp=sharing";
				var url = "https://docs.google.com/presentation/d/1gTrPdGGZyXGDDBAaBBgJENoRWIh5WSwrX2d1quzspyA/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1-DW-KzbEIUCvLccbdVvrq0gEGnuIsdKuzuU7S08Soe8/edit?usp=sharing";
				//var url = "https://docs.google.com/presentation/d/1ausvdUcft4XtamLR9kF56LHEe1cijtlSgFbgrtH9yzU/edit?usp=sharing";
				xhr.send('function=parsedoc&url='+url);
				var timer = setInterval(function(){
					if(xhr.responseText != null && xhr.responseText.length > 0){
						clearInterval(timer);
						console.log(xhr.responseText);
					}
					
				}, 100);*/

				loginUserAndGetFolders();


				/*var data = {"query": `query{
				  getUser(id:"VXNlcjo1"){
				    username
				    
				  }
				}	
				`,"variables": {}}	*/

				



				/*var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://localhost:8080/hello", true);
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				
				var content = document.getElementById("document").value;
				//var slides = "Lecture 3\nLanguage shapes our perception and experience of our world\nSapir-Whorf Hypothesis (does language shape our actions) (controversial/ politically dangerous)";
				var slides = "~~**??\nAnnouncements\nCalibri\nRAQ #1 on Phonetics will be given on Wednesday, and will cover material in Ch. 2 (through 2.4? see syllabus)\nLook for a posting on Compass about your team (there will be an email)\nDiscussion this Friday will introduce the final research paper topic.\nYou need to remember to bring (paperly / electronically) the discussion handouts to discussion.\nYour first homework will be due NEXT week (look for information next week).\nLabor Day is a holiday next week.\n~~**??\nToday: Language Usage\nLanguage \u0026 thought\nLanguage \u0026 power\nLanguage \u0026 politeness\n? and looking ahead to Friday discussion section: \nSlang language (Final paper topic)\n~~**??\nLanguage \u0026 thought\nDoes language shape our perception and experience of the world? \n~~**??\nLinguistic Relativism\nAlso known as the Sapir-Whorf Hypothesis\nEdward Sapir (anthropologist \u0026 linguist)\nWorf, son of Mogh \n(not a linguist)\nBenjamin Lee Whorf, student of Sapir\n~~**??\nLinguistic Relativism\u000bi-clicker\nWhat is the strongest version of the Sapir-Whorf Hypothesis?\nSpeech sounds are arbitrary\nSpeech sounds have inherent meaning\nLanguage dictates how we think\nLanguage influences how we think\n~~**??\nLanguage \u0026 thought\n(Sapir-)Whorf Hypothesis: Linguistic Relativism \nWhat was Whorf?s argument for Linguistic Relativism from Hopi?\nWhat was the later criticism of Whorf?s claims about Hopi?\nWhorf imposed his understanding of Hopi grammar on his interpretation of their culture: Circular\nThe lack of verb tense does not necessarily mean that speakers of the language can?t locate events in time. Other grammatical devices may be used\nWhorf?s data were not accurate: Hopi does in fact have nouns like ?day, night? that express time\n~~**??\nThe (extreme) Sapir-Worf Hypothesis\nLinguistic determinism (language dictates thought) is a common myth\nLinguistic relativity (language influences thought) has some empirical support\n~~**??\nEvidence for Sapir-Whorf\nThe psychologist Lera Boroditsky studies linguistic relativism. Her research shows:\nEnglish speakers tend to say ?He broke the vase (accidentally/on purpose)? while Spanish speakers would say ?Se rompi� el florero? (the vase broke itself) in the case of an accident\nIn controlled experiments, Spanish speakers were less accurate at remembering which character in a video clip broke a vase (or caused other accidents) \n~~**??\nPirah�\nPirah� is a language spoken in the Humait� rain forest of Brazil. Linguist Dan Everett claims that Pirah� follows the Immediacy of Experience Principle. He claims that the Pirah� only speak about what they have experienced personally . \n~~**??\nThe Pirah� Controversy\nOther claims made by Everett:\nPirah� speakers can\u0027t do simple math or count above 3 because they have no words for numbers\nPirah� culture prioritizes the ?here-and-now?, so the language does not manifest displacement (remember ? a design feature unique to human language)\nEverett claims this as evidence for Linguistic Determinism\nMany linguists are skeptical of Everett?s work and there is an ongoing controversy over the empirical validity of his claims.\n~~**??\nLanguage ?? Thought, Culture\nTo test influence in either direction, we need a task that is neutral to both\nColor labeling and categorization\n~~**??\nColor Words\npurple\t    blue\t\t       green\t        yellow  orange red\nColor names for the spectrum of light in English\n~~**??\nColor Words\npurple\t    blue\t\t       green\t        yellow  orange red\nHungarian distinguishes between piro? ?light red?  and voro? ?dark red?\nRussian distinguishes between sin?i ?dark blue? and goluboi ?light blue?\n~~**??\nColor Words\ncipswuka          citema\t\t            cicena\t   cipswuka\nColor names for the spectrum of light in Shona\n(spoken in Zimbabwe)\nNote: cipswuka  applies to ?orange?, ?red? and ?purple?\n~~**??\nColor Words\n\thui\t\t\t\t\t\tziza\nColor names for the spectrum of light in Bassa\n(spoken in Liberia and Sierra Leone)\n~~**??\nColor Words study\nBrent Berlin and Paul Kay (1969) catalogued the color terms of 20 different languages.\nThey presented speakers of a language with an array of 329 color chips, and gave them two tasks:\nfor each color word in that language, circle all the chips that it describes, i.e., all shades corresponding to a particular word\ncircle the chip that is the best example of that color, i.e., the prototypical color for that word\n~~**??\nRESULTS\nEvery language has at least two basic color terms: a category of white plus ?warm? colors versus one of black plus ?cool? colors. [Bassa is a two-color language]\nLanguages with three color terms also have red\nLanguages with four color terms add green (grue) or yellow\nFifth color term: both green (grue) and yellow\nSixth color term: blue\nSeventh color term: brown\nThis is strong evidence that colors are universal distinctions? contrary to linguistic determinism.\n. They instead use a cover term spanning both. When the issue is discussed in linguistics, this cover term is sometimes called�grue�in English. [Source: Wikipedia]\n~~**??\nBerlin \u0026 Kay: follow-up study (1997)\ndata from 110 languages collected in situ. \n25 (mostly) monolingual speakers for each language (some exceptions) \nchip-naming judgments were obtained on individual chip presentations, rather than the full array of stimuli. \nJudgments of best example (focal judgments) were obtained by requesting selection one or more chips that best represent each basic color word from an array of 330 color patches\nChips chosen to represent forty equally spaced Munsell hues at eight levels of lightness (at maximum saturation) plus ten levels of lightness of neutral (black, grey, white) shade\n~~**??\nIf linguistic relativity is true?\nTranslation between languages will never be perfect.\nLearning a new language well would require learning a new way of thinking about the world.\nChanges in language could lead to changes in social norms, culture.\n~~**??\nWhat counts as ?slang??\nWhich of these words would you consider to be slang?\nfreshman\t\tbimbo\t\t\tcop\non fleek\t\ttank\t\t\tcool\nkid\t\t\thalf-rats\t\tlol\ntl;dr\t\t\tgross\t\t\tbasic\u000blit\t\t\tveggie\t\t\tbrb\nsalty\t\t\tcrestfallen\t\tbus\n?bimbo? has changed meaning over time\n~~**??\nWhy do people use slang?\nIt ?lowers the tone? of discourse\nIt?s vibrant, expressive and creative\nIt can signal one?s membership in a particular group\nIt can make the speaker seem ?cool,? ?edgy,? ?in the know??\n~~**??\nAttitudes towards slang\n~~**??\nLanguage \u0026 Power\u000bi-clicker\nWhat are the features of ?powerful? language in conversations among English speakers?\nMore direct speech\nLess use of polite speech\nSlow, deliberate speech\nMore use of technical words\nAll of the above\n~~**??\nOfficial Languages\nDeclared by a government, enforced in government functions, public education, and elsewhere.\nAdvantages? Disadvantages?\nDiscuss in the team activity\n~~**??\nLanguage \u0026 Politeness\nPolite use of language is culturally defined, and can be conveyed through (among other things):\nIndirectness\nHonorifics\nSecond-person pronouns (?T? vs. ?V? forms)\nPoliteness can be used to avoid threatening someone?s ?face? (self-image). Face can be positive (sense of belonging, solidarity) or negative (sense of independence)\nDiscuss in the team activity";
				//xhr.setRequestHeader("Content-Length", slides.length);
				xhr.send('query='+content+'&content='+encodeURIComponent(slides));
				var timer = setInterval(function(){
					if(xhr.responseText != null && xhr.responseText.length > 0){
						clearInterval(timer);
						console.log(xhr.responseText);
					}
					
				}, 100);*/


				/*var body = "string=" + encodeURIComponent(string);
				xhr.open("POST", "read.php", true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhr.setRequestHeader("Content-Length", body.length);
				xhr.setRequestHeader("Connection", "close");
				xhr.send(body);*/
			});

			$('.user').click(function(){
				closeAll();
				if($('#userCard').css('opacity') == '0'){
					showUserCard();
					$('#closeArea').css('display', 'block');
				}else{
					hideUserCard();
				}
			});

			$('#settingsIcon').click(function(){
				closeAll();
				if($('#userCard').css('opacity') != '0'){
					hideUserCard();
				}
				if($('#settingsCard').css('opacity') == '0'){
					$('#settingsCard').css('opacity', '0.99');
					$('#settingsCard').css('height', '125px');
					$('#settingsCard').css('width', '135px');
					$('#colorIcon').css('right', '20%');
					$('#colorIcon').css('margin-top', '22.5px');
					$('#colorIcon').css('opacity', '0.97');
					$('#colorIcon').css('background', '#039bdf');
					$('#closeArea').css('display', 'block');

					
					var timer = setInterval(function(){
						$('.color').css('opacity', '1');
						$('.night').css('opacity', '1');
						$('.help').css('opacity', '1');
						$('.color').css('display', 'block');
						$('.night').css('display', 'block');
						$('.help').css('display', 'block');
						/*$('.color').text("change theme");
						$('.night').text("night mode");*/
						clearInterval(timer);
					},100);
				}
			});

			$('#closeArea').click(function(e){

		        closeAll();
				resizeScreen();
				var posX = $(this).offset().left,
		            posY = $(this).offset().top;
		            document.elementFromPoint((e.pageX - posX), (e.pageY - posY)).click();
			});

			function closeAll(){
				$('#closeArea').css('display', 'none');
				if($('#settingsCard').css('opacity') != '0'){
					$('#settingsCard').css('opacity', '0');
					$('#settingsCard').css('height', '0px');
					$('#settingsCard').css('width', '0px');
					$('#colorIcon').css('right', '5%');
					$('#colorIcon').css('margin-top', '5px');
					$('#colorIcon').css('background', '0');
					$('.color').css('opacity', '0');
					$('.night').css('opacity', '0');
					$('.help').css('opacity', '0');
					$('.color').css('display', 'none');
					$('.night').css('display', 'none');
					$('.help').css('display', 'none');
				}

				if($('#userCard').css('opacity') != '0'){
					hideUserCard();
				}

				if($('#drawer').width() > 0){
					closeDrawer();
				}
			}

			var firstY = -1;
			var dif = 0;
			$(document).mouseup(function() {
			  	//console.log($('#outbox').css('height'));
			  	firstY = -1;
			});

			$( "#outbox" ).mousedown(function(event) {
				onDragButton(event);
			});

			$( "#right" ).hover(function(event) {
				$('#tabs').css('opacity', 0);
			});

			/*$('#tabDrag').on('dragstart', function(event) { 
				event.preventDefault(); 
				console.log(event);
			});

			$('#tabDrag').on('dragend', function(event) { 
				event.preventDefault(); 
				console.log(event);
			});*/

			$("#tabDrag").draggable({
		       axis: "y", // vertical drag only
		       drag: function(event, ui) { // THIS NEXT BLOCK JUST MAKES SURE IT WON'T DRAG OFF THE BOTTOM OF SCREEN
		            if($(this).offset().top + $(this).outerHeight() > $(window).height()) {
		                $(this).offset({"top": $(window).height() - $(this).outerHeight()});

		                event.preventDefault();
		            }
		            if($(this).offset().top == 200){
		            	$(this).clone().prependTo( this);
		            }
		            console.log($(this).offset().top);
		       }
		    });

			/*document.addEventListener("dragstart", function(event) {
				console.log(event);
				if(event.target.id.includes("tab")){
					console.log($('#tabs').position());
				}*/
			    /*// The dataTransfer.setData() method sets the data type and the value of the dragged data
			    event.dataTransfer.setData("Text", event.target.id);

			    // Output some text when starting to drag the p element
			    document.getElementById("demo").innerHTML = "Started to drag the p element.";

			    // Change the opacity of the draggable element
			    event.target.style.opacity = "0.4";*/
			//});
			

			function onDragButton(event){
				//console.log(event);
				var div = $('#outbox');
				var offset = div.offset();
				var top = offset.top;
				var left = offset.left;
				var bottom = top + div.outerHeight();
				var right = left + div.outerWidth();
				//console.log(bottom + " : " + right);

				if(Math.abs(bottom-event.pageY) < 10 && Math.abs(right-event.pageX) < 10){
					//console.log("Right spot: " + $('#outbox').css('height'));
			  		firstY = -2;
				}else
					firstY = -1;
			}
	
			$( "#outbox" ).mousemove(function( event ) {
				onDragButton(event);
				if(firstY == -2)
						firstY = event.pageY;
				if(firstY >= 0 && $('#webview').is(":visible")){

					dif = event.pageY-firstY;
					//console.log(dif + " : " + ($('#webview').height()-dif));
					$('#webview').css('height', $('#webview').height()-dif);
					firstY = event.pageY;
				}
			});

			$('.fullscreen').click(function(){

				if(dualScreenEditMode){
					dualScreenEditMode = false;
					//$('#left').hide();
					$('#left').css('width', 0);
					$('#left').css('opacity', 0);
					$('#document').css('color', textColor);
					var timer = setInterval(function(){
						$('#left').hide();
						clearInterval(timer);
					}, 200);
					$(".fullscreen").attr("src","ic_fullscreen_exit_black_48dp_2x.png");
				}else{
					dualScreenEditMode = true;
					$('#left').css('opacity', 1);
					$('#left').show();
					$('#document').css('color', textColor);

					//resizeScreen();
					$(".fullscreen").attr("src","ic_fullscreen_black_48dp_2x.png");
				}
				resizeScreen();
			});

			$('.smartclick').click(function(){
				if(smartClickMode){
					smartClickMode = false;
					$(".smartclick").attr("src","ic_flash_off_black_48dp_1x.png");
				}else{
					smartClickMode = true;
					$(".smartclick").attr("src","ic_flash_on_black_48dp_1x.png");
				}
			});

			
		});

	function pullFromLocal(){
		printStorage();
		status = get(locationKey+"status");
		color = get(locationKey+"color");
		//folders = get(locationKey+"folders").split(",,");
		//var curr = get(locationKey+"last").split(",,");
		//currentFolder = curr[0];
		//currentNote = curr[1];
		//editorText = get(locationKey+currentFolder + ",," + currentNote);
		editorTitle = currentNote;//get(locationKey+currentFolder + ",," + currentNote + "_T");
	}

	function resizeScreen(){
		var height = $(window).height();
		var width = $(window).width();

		var offset = $('#header').offset();
		if(offset.top > 0)
			$('#header').offset({ top: 0, left: offset.left });

		$('#menuinput').css("margin-left", (width*0.5)+'px');
		if(!dualScreenEditMode){
			//$('#right').css("margin-left", (width*.05)+'px');
			$('#right').width(((width-drawershift)*0.8)+'px');
			$('#right').height(((height-95)*0.9)+'px');
			//$('#right').height("100%");
			$('#right').css("margin-bottom", '45px');
			$('#right').css("margin-left", ((width)*.10));
			$('.fullscreen').css('margin-left', ((width)*0.9)/2-117);
		}else{
			$('#left').height(((height-95)*0.9)+'px');
			$('#right').height(((height-95)*0.9)+'px');
			$('#left').css('width', (width)*0.4375);
			$('#right').width((width)*0.4375+'px');
			//$('#left').css("margin-left", (width*.05)+'px');
			$('#right').css("margin-left", (width*.5125)+'px');
			$('#left').css("margin-left", ((width)*.05));

			$('.fullscreen').css('margin-left', ((width)*0.4375)/2-117);
			/*var canvas = document.getElementById("myCanvas");  
  			canvas.width = $('#outbox').width();
  			canvas.height = $('#outbox').height();*/

		}
		$('#drawer').height(height);
		$('#webview').css('height', '85%');

		if(width < 1920){
		$('#colorpicker').height(600);
	}else
		$('#colorpicker').height(300);
		//$('.colorcircle').height($('.colorcircle').width());

		/*var wHeight = $(window).height();
			$('#infoScreen').css('margin-top', (wHeight-200)+'px');
			$('#infoScreen').height(wHeight+'px');
			if($(window).width() > $(window).height()){
				$('#openBackground').height(($(window).height()+50)+'px');
				$('#openBackground').width(($('#openBackground').height()/0.5625+150)+'px');
				console.log("landcape");

			}else{
				$('#openBackground').width(($(window).width()+150)+'px');
				$('#openBackground').height(($('#openBackground').width()/0.5625+50)+'px');
				console.log("portfolio");
			}
			$('#openBackground').css('margin-left', -50+'px');*/

	}

	function noteDrawerClick(){
		drawerscreen = "note";
		toggleDrawerDualScreen(drawerscreen);
		/*if(dualScreenEditMode){
			toggleDrawerDualScreen(drawerscreen);
			//toggleDrawer_horzontal(drawerscreen);
		}else{
			toggleDrawer_vertical(drawerscreen);
		}*/
	}

	function colorClick(){
		if($('.arangement .top').css('opacity') == 1){
				if(drawerscreen == "note" && draweropen){
					draweropen = false;
				}
				drawerscreen = "color";
				toggleDrawerDualScreen(drawerscreen);

				//toggleDrawer_horzontal(drawerscreen);
				$('#colorpicker').css("padding", '15px');
			}else{
				if(drawerscreen == "note" && draweropen){
					draweropen = false;
				}
				drawerscreen = "color";
				toggleDrawerDualScreen(drawerscreen);

				//toggleDrawer_vertical(drawerscreen);
				$('#colorpicker').css("padding", '15px');
			}
	}

	
			

	function download(text, name, type) {

	  var a = document.getElementById("a");
	  var file = new Blob([text], {type: type});
	  a.href = URL.createObjectURL(file);
	  a.download = name;
	}

	function downloadNote(){
		/*console.log("downloading");
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8080/hello", true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		var content = document.getElementById("document").value;
		xhr.send('name='+content);
		var timer = setInterval(function(){
			if(xhr.responseText != null && xhr.responseText.length > 0){
				clearInterval(timer);
				console.log(xhr);
				console.log(xhr.responseText);
			}
			
		}, 100);*/


		//var url = "http://localhost:8080/hello";
		var url = "https://myautonote-145fd.appspot.com/hello";
		var content = document.getElementById("document").value;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.responseType = 'arraybuffer';
		xhr.onload = function () {
		    if (this.status === 200) {
		        var filename = fs_folders[parseInt(activeFolder)].node.notes.edges[parseInt(activeNote)].node.Title + ".html";
		        var disposition = xhr.getResponseHeader('Content-Disposition');
		        if (disposition && disposition.indexOf('attachment') !== -1) {
		            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		            var matches = filenameRegex.exec(disposition);
		            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
		        }
		        var type = xhr.getResponseHeader('Content-Type');

		        var blob = new Blob([this.response], { type: type });
		        if (typeof window.navigator.msSaveBlob !== 'undefined') {
		            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
		            window.navigator.msSaveBlob(blob, filename);
		        } else {
		            var URL = window.URL || window.webkitURL;
		            var downloadUrl = URL.createObjectURL(blob);

		            if (filename) {
		                // use HTML5 a[download] attribute to specify filename
		                var a = document.createElement("a");
		                // safari doesn't support this yet
		                if (typeof a.download === 'undefined') {
		                    window.location = downloadUrl;
		                } else {
		                    a.href = downloadUrl;
		                    a.download = filename;
		                    document.body.appendChild(a);
		                    a.click();
		                }
		            } else {
		                window.location = downloadUrl;
		            }

		            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
		        }
		    }
		};
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send('name='+content);
	}

	function changeTitle(curr){
		console.log($(curr).text());
		var newtitle = prompt("What would you like to change the title of this note to?", fs_folders[activeFolder].node.notes.edges[parseInt(activeNote)].node.Title).replace(/</g, "&lt;").replace(/>/g, "&gt;");
		if(newtitle != null){


			updateNoteTitle(fs_folders[activeFolder].node.notes.edges[parseInt(activeNote)].node.id, newtitle);

			$(curr).text(newtitle);
			$('#toolbar1 p').text(fs_folders[activeFolder].node.Title + ":    " + newtitle);

			fs_folders[activeFolder].node.notes.edges[parseInt(activeNote)].node.Title = newtitle;

			var children = $('#drawer').children();
			if(children.length > 1){
				$('#'+currentFolder + "_" + currentNote+' div').text(newtitle);
			}

			saveSecure("usersfolders", JSON.stringify(fs_folders));
			
			status = 0;
		}
		//pushTitle(tracker, newtitle, localStorage.getItem('note'+tracker));
		//save("notename"+tracker, newtitle);
		//push(tracker, newtitle);
	}

	var iframeloaded = false;
	function iframeIsLoaded(e){
		//console.log(e.src);
		var url = e.src;
		if(!iframeloaded && url.includes("youtube")){
			iframeloaded = true;
			e.src = url.replace("watch?v=", "embed/");
			//console.log(e.src);

		}
		//console.log("Loaded");
		/*https://www.youtube.com/watch?v=FHBLfgn3M1U
		https://www.youtube.com/embed/FHBLfgn3M1U
<iframe width="560" height="315" src="https://www.youtube.com/embed/FHBLfgn3M1U" frameborder="0" allowfullscreen></iframe>*/
	}

	function iframeFailed(e){
		console.log(e);
		console.log("failed");
	}





	
			
			
		
		