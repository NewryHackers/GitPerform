$(document).ready(function(){
	
	var commits = new Array();
	var timesLooped = 0;

	var oC = new Array();
	
	$("#submit").click(function(){
		var usr = $("#user").val();
		var rep = $("#repo").val();
		$.getJSON("https://api.github.com/repos/" + usr + "/" + rep + "/commits?per_page=1")
			//until : "2013-09-01T17:50:30Z"
		.done(function(data){
			fetch(data[0].url);
		});

	});
	
	function fetch(url){
		timesLooped++;
		$("#looped").html(timesLooped);
		$.getJSON(url).done(function(data){
			$("#current").html(data.sha);
			var stats = data.stats;
			var added = false;
			for(var i = 0; i < commits.length; i++){
				if(commits[i].name == data.commit.author.name){
					try{
					added = true;
					commits[i].stats.total += data.stats.total;
					commits[i].stats.additions += data.stats.additions;
					commits[i].stats.deletions += data.stats.deletions;
					$("#"+commits[i].name+" .add").html(commits[i].stats.additions);
					$("#"+commits[i].name+" .remove").html(commits[i].stats.deletions);
					}catch(err){
						console.log("awaw");
					}
				}
			}
			if(!added){
				commits.push({name : data.commit.author.name, stats : data.stats});
				$("table").append("<tr id=\""+data.commit.author.name+"\"> <td class=\"name\"><td> <td class=\"add\"></td>  <td class=\"remove\"></td></tr>");
				$("#"+data.commit.author.name+" .name").html(data.commit.author.name);
				$("#"+data.commit.author.name+" .add").html(data.stats.additions);
				$("#"+data.commit.author.name+" .remove").html(data.stats.deletions);
			}
			fetch(data.parents[0].url);
		});
	}
});
