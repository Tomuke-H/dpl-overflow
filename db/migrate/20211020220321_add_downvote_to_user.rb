class AddDownvoteToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :downvote_questions, :text
    add_column :users, :downvote_answers, :text
  end
end
