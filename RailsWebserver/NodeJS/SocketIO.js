/**
 * @author robmadeyou
 */

//Add repo exists error

var io = require("socket.io").listen(1337);

var users = new Array();

var Usr = new user("rob");
    Usr.getName = "blob";
    users.push(Usr);

console.log(Usr.getName);
io.sockets.on('connection', function (socket) {
  socket.on('addUser', function (data) {
    console.log(data.name);
    var isNewU = true;
	for(var i = 0; i < users.lenght; i++){
		var isNewR = true;
		if(users[i].getName == data.name){
			isNewU = false;
			for(var j = 0; j < users[i].getRepos; j++){
				if(users[i].getRepos[j].getName == data.repo){
					isNewR = false;
					break;
				}
			}
			if(!isNewR){
				users[i].getRepos.push(new repo(data.repo));
			}
			break;
		}
	}
  });
});

function user(name){
	this.repos = new Array();
	this.name = name;
	this.url = "";
	
	this.getRepos = function(){
		return this.repos;
	};
	this.getName = function(){
		return this.name;
	};
	this.getUrl = function(){
		return this.url;
	};
}

function repo(name){
	this.name = name;
	
	this.getName = function(){
		return this.name;
	};
}
