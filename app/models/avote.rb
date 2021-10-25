class Avote < ApplicationRecord
  belongs_to :user
  belongs_to :answer

  def self.get_my_vote(vote_code)
    select('av.id, av.up, av.down, av.answer_id, av.user_id, av.vote_code')
    .from('avotes AS av')
    .where('av.vote_code = ?', vote_code)
  end

end
  



# SELECT COUNT(*)
# FROM avotes AS av
# INNER JOIN users AS u ON av.user_id = u.id
# WHERE av.up = true;