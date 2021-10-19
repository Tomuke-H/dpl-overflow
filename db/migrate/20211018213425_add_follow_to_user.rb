class AddFollowToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :follow, :text
  end
end
