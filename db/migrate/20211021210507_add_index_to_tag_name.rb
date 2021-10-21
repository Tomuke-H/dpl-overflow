class AddIndexToTagName < ActiveRecord::Migration[6.1]
  def change
    add_index :tags, :name, unique: true
  end
end
