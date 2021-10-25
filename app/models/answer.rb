class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :question
  has_many :comments, dependent: :destroy
  has_many :avotes, dependent: :destroy

  def self.author(id)
    select('u.name')
    .from('users AS u')
    .joins('INNER JOIN answers AS a ON u.id = a.user_id')
    .where('a.id = ?', id)
  end

  def self.get_users(id)
    select('av.user_id')
    .from('answers as a')
    .joins('INNER JOIN avotes AS av ON av.answer_id = a.id')
    .where('a.id = ?', id)
    end

end
