/**
 * @author Apex
 */

var users = new Array();
$(document).ready(function(){
	
	var socket = io.connect("http://localhost:1337");

	socket.emit("addUser", {"name" : "robiiiii", "repo" : "abereth"});

	
	$(".user").each(function(){
		
	});
	
	$("#add button").click(function(){
		getData($("#add input").val());
	});
	
});

function addUserRepo(input, raw){
	var split = input.split("/");
	var raw = "https://github.com/" + split[0] + "/" + split[1];
	$.ajax({
		type: "POST",
		url: "/addUser",
		dataType: "json",
		data: {"user" : split[0], "repo" : split[1], "url" : raw}
	}).done(function(){
		alert("h");
	});
}

function makeSenseOfURL(input){
	return input.replace("https", "").replace("http", "").replace("://", "").replace("www.", "").replace("github.com/", "");
}

function getData(input){
	var raw = makeSenseOfURL(input);
	var repo = raw.split("/")[0] + "/" + raw.split("/")[1];
	addUserRepo(repo);
	$.getJSON("https://api.github.com/repos/" + repo + "/commits?per_page=100",{
		}).done(function(data){
			
	});
}
