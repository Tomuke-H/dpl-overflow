class AddIndexToAvote < ActiveRecord::Migration[6.1]
  def change
    add_index :avotes, :vote_code, unique: true
  end
end
