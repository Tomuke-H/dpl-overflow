class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :likes, default: 0

      t.timestamps
    end
  end
end
