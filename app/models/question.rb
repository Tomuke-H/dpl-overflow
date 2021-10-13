class Question < ApplicationRecord
  belongs_to :user
  has_many :qcomments, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :question_tags, dependent: :destroy
  has_many :tags, through: :question_tags

  def self.find_questions_by_tag(tag_name)
    select('DISTINCT q.id, q.views, q.likes, t.id AS tag_id, q.title, t.name, q.body, q.created_at AS question_created')
    .from('questions AS q')
    .joins('INNER JOIN question_tags AS qt ON q.id=qt.question_id
    INNER JOIN tags AS t ON qt.tag_id=t.id')
    .where('t.name= ?', tag_name)
    .order('q.views DESC')
  end

  def self.unanswered_questions
    select('DISTINCT q.id, q.views, q.likes, q.title, q.body, a.id AS answer')
    .from('questions AS q') 
    .joins('LEFT JOIN answers AS a ON a.question_id = q.id')
    .where('a.id IS NULL')
    .order('q.views DESC')
  end

  def self.search(body)
    select('DISTINCT q.id, q.views, q.likes, q.title, q.body, a.id AS answer')
    .from('questions AS q')
    .joins('INNER JOIN answers AS a ON a.question_id = q.id')
    .where('q.body ILIKE ANY (array[?])', body.split(' ').map { |val| "%#{val}%"})
    .order('q.views DESC')
  end

  def self.answer_count(id)
    select('count(a.id)')
    .from('questions AS q')
    .joins('LEFT JOIN answers AS a ON q.id = a.question_id')
    .where('q.id = ?', id)
  end

end
