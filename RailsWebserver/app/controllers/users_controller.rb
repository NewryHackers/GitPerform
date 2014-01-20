class UsersController < ApplicationController
  
  def index
    @repos = Repo.all
  end
  
  
  def show
    @user = Repo.all;
  end
  
  def create
    
  end
  
  def addU
    
  end
  
  def addR
    @repo = Repo.new();
    @repo.user = params["user"].to_str;
    @repo.repo = params["repo"].to_str;
    @repo.url = params["url"].to_str;
    @repo.save;
  end
  
  private
    def post_params
      params.require(:repo).permit(:user, :repo, :url)
    end
end
