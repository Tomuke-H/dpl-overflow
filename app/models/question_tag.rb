class QuestionTag < ApplicationRecord
  belongs_to :tag
  belongs_to :question

  def self.find_tags_for_question (question_id)
    select('*')
    .from('question_tags')
    .where('question_id = ?', question_id)
  end
end
