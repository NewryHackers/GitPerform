/**
 * @author Apex
 */

var users = new Array();


$(document).ready(function(){
	$("#content").animate({opacity : 1}, 1000);
	$(".user").each(function(){
			users.push($(this).text().toString().replace(/\s/g, ""));
	});
	alert(users.length);
	var socket = io.connect("http://localhost:1337");
	socket.emit("init", users);
	socket.on("init", function(data){
		alert(JSON.stringify(data));
	});
	
	socket.on("error", function(data){
		alert(data);
	});
	
	$("#add button").click(function(){
		getData($("#add input").val(), socket);
	});
	
});

function interactivelyAdd(user, repo){
	var added = false;
	var add = "<div class=\"user\"> "+user+" </div>";
	$(add).hide().appendTo("#userGroup").fadeIn(1000);
}

function addUserRepo(input, socket){
	var split = input.split("/");
	var raw = "https://github.com/" + split[0] + "/" + split[1];
	$.ajax({
		type: "POST",
		url: "/addUser",
		dataType: "json",
		data: {"user" : split[0], "repo" : split[1], "url" : raw}
	});
	socket.emit("addUser", {"name" : split[0], "repo" : split[1]});
	interactivelyAdd(split[0], split[1]);
}

function makeSenseOfURL(input){
	return input.replace("https", "").replace("http", "").replace("://", "").replace("www.", "").replace("github.com/", "");
}

function getData(input, socket){
	var raw = makeSenseOfURL(input);
	var repo = raw.split("/")[0] + "/" + raw.split("/")[1];
	if(!($("#" + raw.split("/")[0]).length)){
		addUserRepo(repo, socket);
		$.getJSON("https://api.github.com/repos/" + repo + "/commits?per_page=100",{
			}).done(function(data){
			
		});
	}
}

function user(name){
	this.name = name;
	this.repos = new Array();
	this.getName = function(){
		return this.name;
	};
	
	this.getRepos = function(){
		return this.repos;
	};
}

function repo(name){
	this.name = name;
	this.repoJSON = new Array();
	
	this.getName = function(){
		return this.name;
	};
	
	this.getJSON = function(){
		return this.repoJSON;
	};
}
