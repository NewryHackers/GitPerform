class Repo < ActiveRecord::Base
  attr_accessible :repo, :url, :user
end
