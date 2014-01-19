/**
 * @author Apex
 */

$(document).ready(function(){
	
	$("#add button").click(function(){
		getData($("#add input").val());
	});
	
});

function addUserRepo(input){
	var split = input.toString.split("/");
	$.ajax({
		type: "POST",
		url: "/users/new",
		dataType: "json",
		data: {"user" : split[0], "repo" : split[1]}
	});
}

function makeSenseOfURL(input){
	return input.replace("https", "").replace("http", "").replace("://", "").replace("www.", "").replace("github.com/", "");
}

function getData(input){
	var repo = makeSenseOfURL(input);
	$.getJSON("https://api.github.com/repos/" + repo + "/commits?per_page=100",{
		}).done(function(data){
			
	});
}
