class CreateRepos < ActiveRecord::Migration
  def change
    create_table :repos do |t|
      t.string :user
      t.string :repo
      t.string :url

      t.timestamps
    end
  end
end
