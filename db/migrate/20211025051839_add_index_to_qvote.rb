class AddIndexToQvote < ActiveRecord::Migration[6.1]
  def change
    add_index :qvotes, :vote_code, unique: true
  end
end
