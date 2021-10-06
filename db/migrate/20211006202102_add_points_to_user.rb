class AddPointsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :points, :integer, default: 0
  end
end
