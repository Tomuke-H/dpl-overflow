class AddFieldsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :cohort, :string
    add_column :users, :about_me, :text
    add_column :users, :liked_comments, :text
    add_column :users, :liked_answers, :text
    add_column :users, :liked_questions, :text
  end
end
