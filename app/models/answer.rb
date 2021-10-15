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

end
