class Question < ApplicationRecord
  belongs_to :user
  has_many :answers, dependent: :destroy
  has_many :question_tags, dependent: :destroy
  has_many :tags, through: :question_tags

  def self.find_question_by_tag(tag_name)
    select('q.id AS question_id, t.id AS tag_id, q.title AS title, t.name AS Tag, q.body AS body')
    .from('questions AS q')
    .joins('INNER JOIN question_tags AS qt ON q.id=qt.question_id
    INNER JOIN tags AS t ON qt.tag_id=t.id')
    .where('t.name= ?', tag_name)
  end

end
