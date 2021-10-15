class CreateQcomments < ActiveRecord::Migration[6.1]
  def change
    create_table :qcomments do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
