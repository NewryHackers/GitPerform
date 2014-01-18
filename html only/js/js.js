$(document).ready(function(){
	var commits = new Array();
	var timesLooped = 0;
	
	$("#submit").click(function(){
		var usr = $("#user").val();
		var rep = $("#repo").val();
		reset();
		fetchAllCommits(usr,rep);
	});
	
	function fetchAllCommits(usr, rep, until){
		$.getJSON("https://api.github.com/repos/" + usr + "/" + rep + "/commits?per_page=100",{
			until : until
		}).done(function(data){
			for(var i = 0; i < data.length; i++){
				fetch(data[i].url);
			}
			if(data.length >= 99){
				fetchAllCommits(usr,rep, data[data.length - 1].commit.author.date);
			}
		});
	}
	
	function fetch(url){
		timesLooped++;
		$("#looped").html(timesLooped);
		$.getJSON(url).done(function(data){
			$("#sha").html(data.sha);
			var stats = data.stats;
			var added = false;
			var name = data.commit.author.name.replace(" ", "");
			for(var i = 0; i < commits.length; i++){
				if(commits[i].name == name){
					try{
						added = true;
						commits[i].stats.total += data.stats.total;
						commits[i].stats.additions += data.stats.additions;
						commits[i].stats.deletions += data.stats.deletions;
						$("#"+commits[i].name+" .add").html(commits[i].stats.additions).fadeIn();
						$("#"+commits[i].name+" .remove").html(commits[i].stats.deletions);
					}catch(err){
						console.log("awaw");
					}
				}
			}
			if(!added){
				commits.push({name : name, stats : data.stats});
				$("table").append("<tr style=\"display:none;\" id=\""+name+"\"> <td claa=\"image\"><img src=\""+data.author.avatar_url+"\"></img></td> <td class=\"name\"><td> <td class=\"add\"></td>  <td class=\"remove\"></td></tr>");
				$("#"+name+" .name").html(name);
				$("#"+name+" .add").html(data.stats.additions);
				$("#"+name+" .remove").html(data.stats.deletions);
				$("#"+name+"").fadeIn();
			}
			/*
			Problem with this, only collects the parents, so anything that has been merged isn't going show up here!
			*/
			//fetch(data.parents[0].url);
		});
	}
	
	function reset(){
		$("table").html("");
		commits.pop();
		//$("table").html("");
	}
});
