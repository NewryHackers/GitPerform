$(document).ready(function(){
	
	var commits = new Array();

	var oC = new Array();
	
	$("#submit").click(function(){
		var usr = $("#user").val();
		var rep = $("#repo").val();
		$.getJSON("https://api.github.com/repos/" + usr + "/" + rep + "/commits", {
			//until : "2013-09-01T17:50:30Z"
		}

	).done(function(data){
			$.getJSON(data[0].url).done(function(data2){
				$("table").append("<tr id=\""+data2.author.login+"\"><td class=\"name\"></td> <td class=\"add\"> </td> <td class=\"remove\"> </td> </tr>");
				$("#return").append(data2.sha + "<br>");
				commits.push({name : data2.author.login, stats : data2.stats});
				getStat(data2.parents[0].url);
			});
			//for(var i = 0; i < data.length; i++){
			//	commits.push(data[i]);
			//	$("#return").append(data[i].sha + "<br>");
			//}
			//if(data.length >= 99){
			//	var d = data[data.length - 1].commit.author.date;
			//	getStat(d,usr,rep );
				//alert(data[data.length - 1].sha);
			//}
		});
	});


	function getStat(url){
		$.getJSON(url)

		.done(function(data){
			if(data.parents === undefined){
				alert("aaa");
				$("#return").append(data.sha + "<br>");
				push(data);
			}else{
				$("#return").append(data.sha + "<br>");
				push(data);
				getStat(data.parents[0].url);
			}
		});
		//var date = sha;
		//alert(date);
		//$.getJSON("https://api.github.com/repos/"+ user + "/" + repo + "/commits?per_page=100", {
		//	until : date
		//}).done(function(data){
		//	for(var i = 1; i < data.length; i++){
		//		commits.push(data[i]);
		//		$("#return").append(data[i].sha + "<br>");
		//	}
		//	if(data.length >= 99){
		//		var d = data[data.length - 1].commit.author.date;
		//		getStat(d, user, repo);
		//	}else{
		//		sortOC();
		//	}
		//});
	}
	
	function push(data){
		for(var i = 0; i < commits.length; i++){
			if(data.author.login == commits[i].name){
				alert(data.author.login);
				var add = commits[i].stats.additions;
				var del = commits[i].stats.deletions;
				add + data.stats.additions;
				del + data.stats.deletions;
				commits[i].stats.total + data.stats.total;
				commits[i].stats.additions + data.stats.additions;
				commits[i].stats.deletions + data.stats.deletions;
				$("#"+data.author.login+" .name").html(commits[i].name);
				$("#"+data.author.login+" .add").html(add);
				$("#"+data.author.login+" .remove").html(del);
			}else{
				commits.push({name : data.author.login, stats : data.stats});
				$("table").append("<tr id=\""+data.author.login+"\"><td class=\"name\"></td> <td class=\"add\"> </td> <td class=\"remove\"> </td> </tr>");
				$("#"+data.author.login+" .name").html(data.author.login);
				$("#"+data.author.login+" .add").html(data.stats.additions);
				$("#"+data.author.login+" .remove").html(data.stats.deletions);
			}
		}
		//$("table").append("<tr id=\""+data.sha +"\"></tr>");
		//$("#"+data.sha+"").append("<td>"+data.author.login+"</td>");
		//$("#"+data.sha+"").append("<td>"+data.stats.total+"</td>");
		//$("#"+data.sha+"").append("<td class=\"add\">"+data.stats.additions+"</td>");
		//$("#"+data.sha+"").append("<td class=\"remove\">"+data.stats.deletions+"</td>");
	}

	function sortOC(){
		oC.push({name : commits[0].commit.author.name});
		for(var i = 0; i < commits.length; i++){
			for(var j = 0; j < oC.length; j++){
				if(oC[j].name == commits[i].commit.author.name){
					alert("wadfadw");
				}else{
					alert("yay :)");
				}
			}
		}
	}

});
