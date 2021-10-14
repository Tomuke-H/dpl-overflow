class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :answer

  def self.author(id)
    select('u.name')
    .from('users AS u')
    .joins('INNER JOIN comments AS c ON u.id = c.user_id')
    .where('c.id = ?', id)
  end
  
end
