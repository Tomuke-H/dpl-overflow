class Qvote < ApplicationRecord
  belongs_to :user
  belongs_to :question

  def self.check_vote(user_id)
  select('qv.id, qv.up, qv.down, qv.question_id, qv.user_id, qv.vote_code')
  .from('qvotes AS qv')
  .where('qv.user_id = ?', user_id)
  end

end