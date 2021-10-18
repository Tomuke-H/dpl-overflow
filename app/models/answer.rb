class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question
  has_many :comments, dependent: :destroy

  def self.author(id)
    select('u.name')
    .from('users AS u')
    .joins('INNER JOIN answers AS a ON u.id = a.user_id')
    .where('a.id = ?', id)
  end

  def self.by_datetime(question_id)
    select('a.body, a.likes, a.verified, a.user_id, a.question_id, a.created_at, a.updated_at')
    .from('answers AS a')
    .joins('INNER JOIN questions AS q ON a.question_id = q.id')
    .where('a.question_id = ?', question_id)
    .order('a.created_at')
  end

  def self.by_likes(question_id)
    select('a.body, a.likes, a.verified, a.user_id, a.question_id, a.created_at, a.updated_at')
    .from('answers AS a')
    .joins('INNER JOIN questions AS q ON a.question_id = q.id')
    .where('a.question_id = ?', question_id)
    .order('a.likes DESC')
  end


end
