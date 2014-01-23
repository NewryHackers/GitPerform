/**
 * @author robmadeyou
 */

//Add repo exists error

var io = require("socket.io").listen(1337);
var mkdirp = require('mkdirp');
var request = require('request-json');
var fs = require('fs');
var github = request.newClient("https://api.github.com/");
var faces = require('cool-ascii-faces');

var users = new Array();

console.log(faces());

io.sockets.on('connection', function (socket) {
  
  socket.on('init', function(data){
  	collectData(data, socket);
  });
  
  socket.on('addUser', function (data) {
    console.log(data.name);
    var isNewU = true;
	for(var i = 0; i < users.length; i++){
		var isNewR = true;
		console.log(users.length);
		if(users[i].getName() == data.name){
			isNewU = false;
			console.log("User exits");
			for(var j = 0; j < users[i].getRepos().length; j++){
				if(users[i].getRepos()[j].getName() == data.repo){
					isNewR = false;
					break;
				}
			}
			if(isNewR){
				console.log("Add new repo");
				users[i].getRepos().push(new repo(data.repo));
			}else{
				console.log("repo exists");
			}
			break;
		}
	}
	if(isNewU){
		var u = new user(data.name);
		u.push(new repo(data.repo));
		//users.push(new user(data.name).getRepos().push(new repo(data.repo)));
		users.push(u);
		console.log("Added new user and repo");
	}
	console.log(users[0].getName());
  });
});

function collectData(data, socket){
	var userInfo;
		var username = data;
		try{
			userInfo = {"name" : data,"json" : require('./'+data.replace(/\s/g, "") + '.json')};
			socket.emit("init", userInfo);
		}catch(err){
			mkdirp(data, function(err){});
			github.get("users/" + data, function(err, res, body){
				if(typeof body.message === 'undefined'){
					if(err){
						collectData(data,socket);
					}else{
						fs.writeFile(username+".json", JSON.stringify(body), function(err){
							console.log(body);
							socket.emit("init", {"name" : data,"json" :body});
						});
					}
				}else{
					socket.emit("error", {"message" : faces() + " too many requests made, now we can't do anything."});
				}
			});
	}
}



function user(name){
	this.repos = new Array();
	this.name = name;
	this.url = "";
	
	this.getRepos = function(){
		return this.repos;
	};
	
	this.push = function(data){
		this.repos.push(data);
	};
	
	this.getName = function(){
		return this.name;
	};
	this.getUrl = function(){
		return this.url;
	};
	return this;
}

function repo(name){
	this.name = name;
	
	this.getName = function(){
		return this.name;
	};
	return this;
}
