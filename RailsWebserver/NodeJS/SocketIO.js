/**
 * @author robmadeyou
 */

//Add repo exists error

var io = require("socket.io").listen(1337);

var users = new Array();

var json = require('./a.json');

console.log(json);

io.sockets.on('connection', function (socket) {
  
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
