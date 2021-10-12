class AddDescToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :desc, :string
  end
end
