
var openedFolder = "";
var activeFolder = -1
var activeNote = -1;

function makeDrawer(){
	var height = $(document).height();
	var width = $(document).width();
	var newDiv = "<div id=\"drawer\" style=\"width:" + "0" + "px;height:" + height + "px;"+ "\">"  +  "</div>";
	$('#side').prepend(newDiv);

}

function makeColorPicker(){
	$('#drawer').empty();
	
	var height = $('#drawer').height();
	var width = $('#drawer').width();
	var newDiv = "<div id=\"colorpicker\" style=\"width:width: 90%;" + "px;"+ "\">"  +   "</div>";
	$('#drawer').append(newDiv);

	var colors = ["#E53935", "#D81B60", "#5E35B1", "#3949AB", "#1E88E5", "#00897B", "#43A047", "#37474F"];
	
	for(var c = 0; c < colors.length; c++){
		var circle = "<div id=\"colorcircle" + c + "\" class=\"colorcircle\" style=\"background-color:" + colors[c] + ";\">"  +   "</div>";
		
		$('#colorpicker').append(circle);
	}

	//console.log($('.colorcircle').width());
	$('.colorcircle').width(55);
	$('.colorcircle').height(55);

	if(width < 1920){
		$('#colorpicker').height(600);
	}else
		$('#colorpicker').height(300);


	$('.colorcircle').click(function(){
		var id = $(this).attr('id');
		$('#header').css("background-color", $('#' + id).css("background-color"));
		save('color', $('#' + id).css("background-color"));
		reBuildDoc();
		//makeDoc(document.getElementById("document").value.split('\n'), 0);
	});
}

function toggleDrawerDualScreen(screen){
	if($('#drawer').width() <= 0){//Closed and need to be opened
		
      //createFolderCards(["folder1", "folder2", "folder3"]);
      
	    var folderTitles = [];
		for(var f = 0; f < fs_folders.length; f++){
			folderTitles.push(fs_folders[f].node.Title.replace(/ /g, "_"));
		}

		if(screen == 'note'){
      		createFolderCards(folderTitles);
      	}else{
      		makeColorPicker();
      	}
		draweropen = true;
		var width = $(window).width();
		$('#cf2 .top').css("z-index", "0");
		$('#cf2 .bottom').css("z-index", "9");
		$('#cf2 .bottom').css("opacity", 1);
		$('#cf2 .top').css("opacity", 0);
		$('#drawer').width(width/8);
		$('#closeArea').css('display', 'block');
		openedFolder = "";
      	$('#toolbar1').css('padding-left', width/8);
      	$('#left').css('margin-left', width/8);
      //$('.folderCard').width(width/8);
      //$('#folderTitle').width(width/8);
      //$('#folderTitle').width(width/8);
      //$('#folderTitle').width(width/8);
	}else{
		closeDrawer();
      	$('#toolbar1').css('padding-left', 40);
      	$('#left').css('margin-left', '5%');

	}
}

//---array of strings with '_' taking the place of ' '.---
//creates all folders with their heights and text object but no width
function createFolderCards(folders){
   var width = $(window).width()/8;
   $('#drawer').empty();
   if(typeof folders != 'undefined' && folders.length > 0){
      console.log(folders);
      for(var i = 0; i < folders.length; i++){
			var folderTitle = folders[i];
			var newDiv = "<div class=\"folderCard " + i + "\" id=\"f" +folderTitle+ "\" onclick=\"onCardClicked(this)\" ondblclick=\"doubleClickFolder(this)\" style=\"height:" + 0.4*(width*.9) + "px;"+ " line-height:" + 0.4*(width*.9) + "px;\">" + "</div>";
			var loc = i.toString();
			
			var max = 19*($(window).width()/1920);
			var displayedTitle = (folderTitle.includes('_')) ? folderTitle.replace(/_/g, " ") : folderTitle;
			title = "<div id=\"folderTitle\">" + displayedTitle.substring(0, max) + "</div>";
			$('#drawer').append(newDiv);
			$('#f'+folderTitle).append(title);
			
		}
   }

   newDiv = "<div class=\"folderCard\" id=\"faddFolder"+ "\" onclick=\"onCardClicked(this)\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
   title = "<div id=\"folderTitle\">" + "new folder" + "</div>";
   $('#drawer').append(newDiv);
   $('#faddFolder').append(title);
   
}

//---Takes an array of strings representing the titles of all the notes in a folder with '_' taking the place of ' '.---
//creates the cards for these notes but keeps them hidden behind the folder
function createNoteCards(parentFolderID, notes){
	var width = $('#drawer').width();
	var newDiv, title;
   $('.subcard').remove();
   $('.subnotes').remove();
   
	for(var i = 0; i < notes.length; i++){
		if(notes[i] == "" || notes[i].length == 0)
			continue;
		newDiv = "<div class=\"subcard\" id=\"" + i + "\" onclick=\"onSubCardClicked(this, "+parentFolderID+")\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
		
		var max = 19*($(window).width()/1920)
		if(typeof notes[i].node.Title == 'undefined')
			notes[i].node.Title = "new title because you messed up";
		title = "<div class=\"subnotes\">" + notes[i].node.Title.substring(0, max) + "</div>";

		$(newDiv).insertAfter('#'+parentFolderID);
		$('#'+i).append(title);
		
	}


	newDiv = "<div class=\"subcard\" id=\"addNote"+ "\" onclick=\"onSubCardClicked(this, "+parentFolderID+")\" style=\"height:" + 0.4*(width*.6) + "px;"+ " line-height:" + 0.4*(width*.6) + "px;\">" + "</div>";
   title = "<div class=\"subnotes\">" + "new note" + "</div>";

   if(notes.length == 0 || notes[0] == "")
      $(newDiv).insertAfter('#'+parentFolderID);
   else
      $(newDiv).insertAfter('#'+0);

   $('#addNote').append(title);

	$('.subcard').css("margin-top", -0.4*(width*.7));


	$( '.subcard' ).animate({
	  opacity: 1,
	  marginTop: 0
	}, 125, function() {});

	$('.subnotes').css("opacity", 0);
	$( '.subnotes' ).animate({
	  opacity: 1,
	}, 295, function() {});
}

function makeFolders(){
	$('#drawer').empty();
	
	var height = $('#drawer').height();
	var width = $('#drawer').width();
	folders = get(locationKey+"folders").split(",,");
	//console.log(folders);
	var newDiv, title;
	
	/*if(typeof data != 'undefined' && data != null){
		for(var i = 1 ; i <= (typeof data['length'] == 'undefined' ? 0: data['length'].value); i++){
			newDiv = "<div class=\"notecard\" id=\"note" +i+ "\" onclick=\"onCardClicked(this)\" ondblclick=\"doubleClickFolder()\" style=\"height:" + 0.4*(width*.9) + "px;"+ " line-height:" + 0.4*(width*.9) + "px;\">" + "</div>";
			var loc = i.toString();
			if(typeof data[loc] != 'undefined'){
				title = "<div id=\"notes\">" + data[loc].title + "</div>";
				$('#drawer').append(newDiv);
				$('#note'+i).append(title);
			}
		}

		newDiv = "<div class=\"notecard\" id=\"addNote"+ "\" onclick=\"onCardClicked(this)\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
			title = "<div id=\"notes\">" + "new note" + "</div>";
			$('#drawer').append(newDiv);
			$('#addNote').append(title);
	}else{*/
		var listlength = folders.length;
		for(var i = 0; i < listlength; i++){
			var folderTitle = folders[i];
			//console.log(folders[i] + " : " + folderTitle);
			newDiv = "<div class=\"notecard\" id=\"" +folderTitle+ "\" onclick=\"onCardClicked(this)\" ondblclick=\"doubleClickFolder(this)\" style=\"height:" + 0.4*(width*.9) + "px;"+ " line-height:" + 0.4*(width*.9) + "px;\">" + "</div>";
			var loc = i.toString();
			
			var max = 19*($(window).width()/1920);
			var displayedTitle = (folderTitle.includes('_')) ? folderTitle.replace("_", " ") : folderTitle;
			title = "<div id=\"notes\">" + displayedTitle.substring(0, max) + "</div>";
			$('#drawer').append(newDiv);
			$('#'+folderTitle).append(title);
			
		}

		newDiv = "<div class=\"notecard\" id=\"addFolder"+ "\" onclick=\"onCardClicked(this)\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
			title = "<div id=\"notes\">" + "new folder" + "</div>";
			$('#drawer').append(newDiv);
			$('#addFolder').append(title);
	//}
	//$('.notecard').css("background-color", get(locationKey+"color"));
	
}

function doubleClickFolder(e){
	var newtitle = prompt("What would you like to change the naem of this folder to?", $(e).text());
}

/*function makeSubCard(id){
	
	var height = $('#drawer').height();
	var width = $('#drawer').width();
	var newDiv, title;
	var cf = id.replace("_", " ");
	console.log(cf + " : " + id );
	//var cf = folders[id];
	var folderNotes = get(locationKey+id).split(",,");
	//var listlength = get(locationKey+"length");
	for(var i = 0; i < folderNotes.length; i++){
		if(folderNotes[i] == "" || folderNotes[i].length == 0)
			continue;
		newDiv = "<div class=\"subcard\" id=\"" + i + "\" onclick=\"onSubCardClicked(this, "+id+")\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
		//var loc = i.toString();
		
		var max = 19*($(window).width()/1920)
		title = "<div class=\"subnotes\">" + folderNotes[i].substring(0, max) + "</div>";

		$(newDiv).insertAfter('#'+id);
		$('#'+i).append(title);
		
	}


	newDiv = "<div class=\"subcard\" id=\"addNote"+ "\" onclick=\"onSubCardClicked(this, "+id+")\" style=\"height:" + 0.4*(width*.6) + "px;"+ " line-height:" + 0.4*(width*.6) + "px;\">" + "</div>";
			title = "<div class=\"subnotes\">" + "new note" + "</div>";
			//$(newDiv).insertAfter('#'+id);
			if(folderNotes.length == 0 || folderNotes[0] == "")
				$(newDiv).insertAfter('#'+id);
			else
				$(newDiv).insertAfter('#'+0);
			//$('#sub'+get(locationKey+"F"+cf)).append(newDiv);
			$('#addNote').append(title);

	$('.subcard').css("margin-top", -0.4*(width*.7));

	$( '.subcard' ).animate({
	opacity: 1,
	marginTop: 0
	}, 125, function() {});

	$('.subnotes').css("opacity", 0);
	$( '.subnotes' ).animate({
	opacity: 1,
	}, 295, function() {});
	
	
}*/

function loadLastNote(){
	$('.'+lastNote[0]).click();
	$('#'+lastNote[1]).click();
	noteDrawerClick();
	$('.startMessage').css('display', 'none');
	//onSubCardClicked($('#'+lastNote[1]), $('.'+lastNote[0]));
}


function onSubCardClicked(e, cf){
	var id = $(e).attr('id');
	toggleDrawerDualScreen("note");

	if(id != "addNote"){
		dumpQueue();
		var f = parseInt(cf.classList[1]);
		console.log(f + " : " + id, fs_folders);
		var noteID = fs_folders[f].node.notes.edges[parseInt(id)].node.id;
		//console.log(noteID);
		if(fs_folders[f].node.notes.edges[parseInt(id)].node.content != null){
			console.log("note from cache");
			$('#toolbar1 p').text(fs_folders[f].node.Title + ":  " + fs_folders[f].node.notes.edges[parseInt(id)].node.Title);
	        document.getElementById("document").value = fs_folders[f].node.notes.edges[parseInt(id)].node.content;
	        activeFolder = f;
	        activeNote = id;
	        makeDocFromKey();
	        $('#left').css("display", "block");
	        $('#right').css("display", "block");

		}else{
			startLoad(0);
			var data = {"query": `query{
									  getNote(id:"${noteID}"){
									    content
									  }
									}`,
						"variables": `{}`}	

				$.ajax({
				  type: "POST",
				  url: "https://us-west-2.api.scaphold.io/graphql/myautonotedev"+"?query="+data.query.replace(/\t/g,'').replace(/\n/g,'')+"&variables="+data.variables.replace(/\t/g,'').replace(/\n/g,''),
				  json: true,
				  /*data: data,*/
				  success: function(response, status) {
				  		finishLoad();
				        console.log(status);
				        console.log(response);
				        var content = response.data.getNote.content.replace(/0x0A/g, "\n");
				        console.log(content);
						fs_folders[f].node.notes.edges[parseInt(id)].node.content = content;
						$('#toolbar1 p').text(fs_folders[f].node.notes.edges[parseInt(id)].node.Title);
				        document.getElementById("document").value = content;
				        activeFolder = f;
				        activeNote = id;
				        makeDocFromKey();
				        $('#left').css("display", "block");
	       				$('#right').css("display", "block");

				        //makeDoc(document.getElementById("document").value.split('\n'), 0);
				    },
				});

			}


	}else{
		console.log("adding new note: " + cf.classList[1]);
		var height = $('#drawer').height();
		var width = $('#drawer').width();
		var newDiv, title;

		var folderIndex = parseInt(cf.classList[1]);
		var folderID = fs_folders[folderIndex].node.id;

		var d = new Date();
		var t = "Note " + fs_folders[folderIndex].node.notes.edges.length;

		//var c = d.toString() + "`";
		var c = "write your notes for " + t + " here"
		startLoad(0);
				var data = {"query": `mutation CreatNote($input: CreateNoteInput!) {
										  createNote(input: $input) {
										    changedNote {
										      id
										    }
										  }
										}
										`,
						"variables": `{
					          "input": {
					            "folderId": "${folderID}",
					            "Title": "${t}",
					            "content": "${c}"

					          }}`	}	

				$.ajax({
				  type: "POST",
				  url: "https://us-west-2.api.scaphold.io/graphql/myautonotedev"+"?query="+data.query.replace(/\t/g,'').replace(/\n/g,'')+"&variables="+data.variables.replace(/\t/g,'').replace(/\n/g,''),
				  json: true,
				  /*data: data,*/
				  success: function(response, status) {
				        console.log(status);
				        console.log(response);
				        console.log(response.data.createNote.changedNote);
						console.log("from database");
						finishLoad();
						var node = {node: response.data.createNote.changedNote}
						node.node.Title = t;
						node.node.content = c;

						
						fs_folders[folderIndex].node.notes.edges.push(node);
						var notesIndex = fs_folders[folderIndex].node.notes.edges.length-1;
						//folderTitles.push(title.replace(/ /g, "_"));
						
				        saveSecure("usersfolders", JSON.stringify(fs_folders));
				        document.getElementById("document").value = c;
				        

				        newDiv = "<div class=\"subcard\" id=\"" + (notesIndex)+ "\" onclick=\"onSubCardClicked(this, "+cf.id+")\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
		
						title = "<div class=\"subnotes\">" + t + "</div>";

						$(newDiv).insertAfter('.'+folderIndex);
						$('.'+(folderIndex)).append(title);

						$('#toolbar1 p').text(fs_folders[folderIndex].node.Title.replace(/_/g, " ") + ":  " + t);

						activeFolder = folderIndex;
			        	activeNote = notesIndex;
			        	makeDocFromKey();
			        	//toggleDrawerDualScreen("note");
			        	$('#left').css("display", "block");
	       				$('#right').css("display", "block");
				    },
				});
		
		/*currentFolder = cf.id;
		var oldLength = get(locationKey+currentFolder).split(",,").length+1;
		currentNote = "Note #"+(oldLength);
		console.log(id + " : " + currentFolder + " : " + currentNote);
		get(locationKey+cf.id).split(",,")[id];
		save(locationKey+cf.id, get(locationKey+cf.id) + ",," + currentNote);
		save(locationKey+"last", currentFolder + ",," + currentNote);
		$('#toolbar1 p').text(currentNote);
		document.getElementById("document").value = "sample text for "+currentNote;

		save(locationKey+currentFolder+",," + currentNote, "sample text for "+currentNote)
		makeDoc(document.getElementById("document").value.split('\n'), 0);
		
		newDiv = "<div class=\"subcard\" id=\"" + (oldLength-1)+ "\" onclick=\"onSubCardClicked(this, "+cf.id+")\" style=\"height:" + 0.4*(width*.7) + "px;"+ " line-height:" + 0.4*(width*.7) + "px;\">" + "</div>";
		
		title = "<div class=\"subnotes\">" + currentNote + "</div>";

		$(newDiv).insertAfter('#'+currentFolder);
		$('#'+(oldLength-1)).append(title);*/

	}
	$('.startMessage').css('display', 'none');
	
}

function onCardClicked(e){
		var id = $(e).attr('id');
		var className = parseInt($(e).attr('class').split(" ")[1]);
		if(id != "faddFolder"){
			var alreadyLooped = false;
			if(openedFolder != ""){
				$( '.subcard' ).animate({
					marginTop: -0.4*($('#drawer').width()*.7)
				}, 125, function() {
					//var mark = id.substring(4);
					if(!alreadyLooped){
						alreadyLooped = true;
						if(openedFolder != id){
							openedFolder = id;
							
		               		//createNoteCards(id, ["note1", "note2"]);
		               		createNoteCards(id, fs_folders[className].node.notes.edges);
						}else{
							$('.subcard').remove();
							openedFolder = "";
						}
						
					}
				});
			}else{
				//createNoteCards(id, ["note1", "note2"]);
				createNoteCards(id, fs_folders[className].node.notes.edges);
				openedFolder = id;
			}

				//$('.subcard').css('margin-top', -0.4*($('#drawer').width()*.7));
				//$('.subcard').css('opacity', 0);
				/*var timer = setInterval(function(){
					var o = $('.subcard').css('opacity');
					if($('.subcard').css('opacity') == '0'){
						if(id == openedFolder){
							$('.subcard').remove();
						   	$('.subnotes').remove();
						   	openedFolder = "";
						}else{
							createNoteCards(id, ["note1", "note2"]);
							currentFolder = id;
						}
						clearInterval(timer);
					}
				}, 50);*/
				/*$('.subcard').animate({
					marginTop: -0.4*($('#drawer').width()*.7)
				}, 125, function(){
					
					return;
				});*/
			

			/*if(folderView == -1){
				//var mark = id.substring(4);
				currentNote = id;
				//save("last", currentNote);
				$('#note'+currentNote).addClass('clickednotecard');
				//makeFolders();
				//makeSubCard(id);
            createNoteCards(id, ["note1", "note2"]);
				folderView = mark;
			}else{
				$('#note'+currentNote).removeClass('clickednotecard');
				$( '.subcard' ).animate({
					marginTop: -0.4*($('#drawer').width()*.7)
				}, 125, function() {
					//var mark = id.substring(4);
					if(currentNote != id){
						currentNote = id;
						//save("last", currentNote);
						//makeFolders();
						//makeSubCard(id);
	               		createNoteCards(id, ["note1", "note2"]);
						$('#note'+currentNote).addClass('clickednotecard');
					}else{
						$('.subcard').remove();
						foderView = -1;
					}
					
				});
				$('.subnotes').css("opacity", 1);
					$( '#subnotes' ).animate({
					opacity: 0
					}, 100, function() {});
				folderView = id.substring(4);
			}*/
		
		}else{
			console.log("addingsdakjgh");
			var height = $('#drawer').height();
			var width = $('#drawer').width();
			var newDiv, title;
			var newTitle = prompt("What would you like this folder to be called", "folder "+(fs_folders.length+1));
			while(!allChars(newTitle)){
				
				newTitle = prompt("What would you like this folder to be called", newTitle);
			}
			newTitle = newTitle.replace(/ /g, "_");
			console.log("new folder added: " + newTitle);
			addFolder(newTitle);


			//save(locationKey+"folders", get(locationKey+"folders")+",,"+newTitle);
			//folders = get(locationKey+"folders").split(",,");
			//console.log(folders);
			//save(locationKey+"F"+(folders.length), 0);
			//save(locationKey+newTitle, "");
			//push("length", tracker);
			//$('#toolbar1 p').text("Note #"+tracker);
			//document.getElementById("document").value = "sample text for note"+tracker;
			//$('#document').attr("value", "sample text for note"+tracker);
			//save('notename'+tracker, ("Note #"+tracker));
			//save('note'+tracker, "sample text");
			//makeDoc();

			
			//newDiv = "<div class=\"folderCard " + (fs_folders.length) + "\" id=\"f" +newTitle+ "\" onclick=\"onCardClicked(this)\" style=\"height:" + 0.4*(width*.9) + "px;"+ " line-height:" + 0.4*(width*.9) + "px;\">" + "</div>";
			
			//title = "<div id=\"notes\">" + newTitle.replace(/_/g, " ") + "</div>";
			
			//$(newDiv).insertBefore('#faddFolder');
			//$('#f'+newTitle).append(title);

			/*$('#addNote').remove();
			$('#drawer').append(newDiv);
			$('#note'+tracker).append(title);

			newDiv = "<div class=\"notecard\" id=\"addNote"+ "\" onclick=\"onCardClicked(this)\" style=\"height:" + 0.4*(width*.75) + "px;"+ " line-height:" + 0.4*(width*.75) + "px;\">" + "</div>";
			title = "<div id=\"notes\">" + "new folder" + "</div>";
			$('#drawer').append(newDiv);
			$('#addNote').append(title);

			$('#note'+tracker).click(function(){

			});*/

		}
}

function allChars(a){
	for(var i = 0; i < a.length; i++){
		if( (a.charAt(i) >= 'A' && a.charAt(i) <= 'Z') || (a.charAt(i) >= 'a' && a.charAt(i) <= 'z') || a.charAt(i) == ' ' || (a.charAt(i) >= '0' && a.charAt(i) <= '9') ){
			
		}else
		return false;
	}
	return true;
	//var letterNumber = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;  
	//return a.match(letterNumber); 
	
}

function closeDrawer(){
	draweropen = false;
	var width = $(window).width();
	$('#cf2 .top').css("z-index", "9");
	$('#cf2 .bottom').css("z-index", "0");
	$('#cf2 .bottom').css("opacity", 0);
	$('#cf2 .top').css("opacity", 1);
	$('#drawer').width(0);
	$('#closeArea').css('display', 'none');
  	$('.colorcircle').width(0);
	$('.colorcircle').height(0);
    $('#toolbar1').css('padding-left', 40);

}


function toggleDrawer_horzontal(screen){				
	
		
	if(!draweropen){
		folderView = -1;
		draweropen = true;
		//pull("");
		$('#side').empty();
		makeDrawer();
		var width = $(window).width();

		var i = 1;
		$('#cf2 .top').css("z-index", "0");
		$('#cf2 .bottom').css("z-index", "9");
		var openDrawer = setInterval(function(){
			$('#drawer').width(i);
			$('#cf2 .bottom').css("opacity", i/(width/8));
			$('#cf2 .top').css("opacity", 1-i/(width/8));
			
			drawershift = i;
			resizeScreen();
			i *= 1.45;
			if(i >= (width/8)){
				clearInterval(openDrawer);
				$('#drawer').width(width/8);
				drawershift = width/8;
				resizeScreen();
				$('#cf2 .bottom').css("opacity", 1);
				$('#cf2 .top').css("opacity", 0);
				if(screen == "color")
					makeColorPicker();
				else
					makeFolders();
			}
		},10);
	}else{
		draweropen = false;
		var height = $(document).height();
		var width = $(document).width();
		var outboxwidth = $('#right').width();

		
		var i2 = width/8;
		$('#cf2 .top').css("z-index", "9");
		$('#cf2 .bottom').css("z-index", "0");
		var openDrawer = setInterval(function(){
			$('#drawer').width(i2);
			$('#cf2 .bottom').css("opacity", i2/(width/8));
			$('#cf2 .top').css("opacity", 1-i2/(width/8));
			drawershift = i2;
			resizeScreen();
			
			i2 /= 1.45;
			if(i2 <= 1){
				if(screen == "note")
					$('#side').empty();
				clearInterval(openDrawer);
				$('#drawer').width(0);
				drawershift = 0;
				resizeScreen();
				$('#cf2 .bottom').css("opacity", 0);
				$('#cf2 .top').css("opacity", 1);

			}
			if(screen == "color")
					makeColorPicker();
			else
				makeFolders();
		},10);
		if(screen == "color")
					$('#side').empty();
		//$('#colorpicker').remove();
	}
}	

function toggleDrawer_vertical(screen){				
	
		var width = $(window).width();
	if(!draweropen){
		folderView = -1;
		draweropen = true;
		$('#side').empty();
		makeDrawer();
		var i = 1;
		$('#cf2 .top').css("z-index", "0");
		$('#cf2 .bottom').css("z-index", "9");
		var openDrawer = setInterval(function(){
			drawershift = i;
			resizeScreen();
			$('#drawer').width(i);
			$('#cf2 .bottom').css("opacity", i/(width/8));
			$('#cf2 .top').css("opacity", 1-i/(width/8));
			i *= 1.45;
			if(i >= (width/8)){
				clearInterval(openDrawer);
				$('#drawer').width(width/8);
				drawershift = width/8;
				resizeScreen();
				$('#cf2 .bottom').css("opacity", 1);
				$('#cf2 .top').css("opacity", 0);
			}
				if(screen == "color")
					makeColorPicker();
				else
					makeFolders();
		},10);
	}else{
		draweropen = false;

		
		var i2 = width/8;
		$('#cf2 .top').css("z-index", "9");
		$('#cf2 .bottom').css("z-index", "0");
		var openDrawer = setInterval(function(){
			$('#drawer').width(i2);
			$('#cf2 .bottom').css("opacity", i2/(width/8));
			$('#cf2 .top').css("opacity", 1-(i2/(width/8)));
			drawershift = i2;
			resizeScreen(i);
			
			i2 /= 1.45;
			if(i2 <= 1){
				if(screen == "note")
					$('#side').empty();
				clearInterval(openDrawer);
				$('#drawer').width(0);
				drawershift = 0;
				resizeScreen();

				$('#cf2 .bottom').css("opacity", 0);
				$('#cf2 .top').css("opacity", 1);
			}
			if(screen == "color")
					makeColorPicker();
			else
				makeFolders();
		},10);
	}
}	
