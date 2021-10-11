class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :answer

  # def self.simplify
  #   comments = Comment.all
  #   comments.map do |comment|
  #     {id: comment.id, body: comment.body, likes: comment.likes, user: comment.user_id, answer: comment.answer_id}
  #   end
  # end

  
end
