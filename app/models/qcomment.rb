class Qcomment < ApplicationRecord
  belongs_to :user
  belongs_to :question

  def self.author(id)
    select('u.name')
    .from('users AS u')
    .joins('INNER JOIN qcomments AS qc ON u.id = qc.user_id')
    .where('qc.id = ?', id)
  end

end
