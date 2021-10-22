class CreateAvotes < ActiveRecord::Migration[6.1]
  def change
    create_table :avotes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :answer, null: false, foreign_key: true
      t.boolean :up
      t.boolean :down
      t.string :vote_code

      t.timestamps
    end
  end
end
