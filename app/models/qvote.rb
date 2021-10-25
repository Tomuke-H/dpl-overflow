class Qvote < ApplicationRecord
  belongs_to :user
  belongs_to :question

  def self.get_my_vote(vote_code)
  select('qv.id, qv.up, qv.down, qv.question_id, qv.user_id, qv.vote_code')
  .from('qvotes AS qv')
  .where('qv.vote_code = ?', vote_code)
  end

end