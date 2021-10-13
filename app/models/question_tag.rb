class QuestionTag < ApplicationRecord
  belongs_to :tag
  belongs_to :question

  def self.find_tags_for_question (question_id)
    select('*')
    .from('question_tags')
    .where('question_id = ?', question_id)
    .order('tag_id')
  end

  # select qt.id as id, t.id as tag_id, qt.question_id as question_id, t.name as tag_name
  # from question_tags as qt
  # left join tags as t on qt.tag_id = t.id
  def self.find_tagname_for_question (question_id)
    select('qt.id as id, t.id as tag_id, qt.question_id as question_id, t.name as tag_name')
    .from('question_tags as qt')
    .joins('left join tags as t on qt.tag_id = t.id')
    .where('question_id = ?', question_id)
    .order('tag_id')
  end


end
