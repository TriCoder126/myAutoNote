function save(location, value){

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(location, value);
        //console.log("saved (" + get(location) + ") to (" + location + ")");
    } else {
        console.log("storage not supported");
    }
}

function saveSecure(location, value){

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(activeUser.uid+location, value);
        //console.log("saved (" + get(location) + ") to (" + location + ")");
    } else {
        console.log("storage not supported");
    }
}

function getSecure(location){
	var local = localStorage.getItem(activeUser.uid+location);
	if(local == null){
		console.log("not found locally at (" + activeUser.uid + location + ")");
		
	}
	return local;
}

function get(location){

	var local = localStorage.getItem(location);
	if(local == null){
		console.log("not found locally at (" + location + ")");
		
	}
	return local;
}

function printStorage(){
			//console.log("local storage:");
			for (var i = 0; i < localStorage.length; i++)   {
				var preview;
				if(localStorage.getItem(localStorage.key(i)).length > 50)
					preview = localStorage.getItem(localStorage.key(i)).substring(0, 45);
				else 
					preview = localStorage.getItem(localStorage.key(i));

			    //console.log(localStorage.key(i) + "=[" + preview + "]");
			}
		}

function getAllTitles(){
	//console.log(localStorage.getItem("length"));
	//console.log(pull(""));
	/*if(local == null){
		console.log("not found locally");
		console.log(data.uid2);
	}*/
}

function backupToLocal(){

}

function getDocumentData(){
	
	console.log(data);
	if(data["note"+tracker].value == get("note"+tracker)){
		return get("note"+tracker);
	}else{
		console.log("something went wrong while saving");
		return "fail";
	}

}