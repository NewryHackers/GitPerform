class UsersController < ApplicationController
  
  def index
    @repos = Repo.all
  end
  
  
  def show
    @user = Repo.find(params["id"]);
  end
  
  def create
    
  end
  
  def addU
    @repo = Repo.new(:user => params["user"], :repo => params["repo"], :url => params["url"]);
    @repo.save;
  end
  
  def addR
    
  end
  
end
