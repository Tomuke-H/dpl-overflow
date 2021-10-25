class Avote < ApplicationRecord
  belongs_to :user
  belongs_to :answer

  def self.check_upvote(vote_code)
    select('av.id, av.up, av.down, av.answer_id, av.user_id, av.vote_code')
    .from('avotes AS av')
    .where('av.user_id = ?', user_id)
  end

end
  



# SELECT COUNT(*)
# FROM avotes AS av
# INNER JOIN users AS u ON av.user_id = u.id
# WHERE av.up = true;