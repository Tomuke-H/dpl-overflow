class Question < ApplicationRecord
  belongs_to :user
  has_many :qcomments, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :question_tags, dependent: :destroy
  has_many :tags, through: :question_tags

  def self.find_questions_by_tag(tag_name)
    select('DISTINCT q.id, q.views, q.likes, count(t.id) AS tags, count(a.id) AS total_answers, q.title, q.body, q.created_at')
    .from('questions AS q')
    .joins('LEFT JOIN question_tags AS qt ON q.id=qt.question_id
    INNER JOIN tags AS t ON qt.tag_id=t.id
    LEFT JOIN answers AS a ON a.question_id = q.id')
    .where('t.name= ?', tag_name)
    .order('q.views DESC')
    .group('q.id')
  end

def self.unanswered_questions
    select('DISTINCT q.id, q.views, q.likes, q.title, q.body, count(a.id) AS total_answers, q.created_at')
    .from('questions AS q') 
    .joins('LEFT JOIN answers AS a ON a.question_id = q.id')
    .where('a.id IS NULL')
    .order('q.views DESC')
    .group('q.id')
  end

  def self.search(body)
    arr = body.split(' ').map { |val| "%#{val}%"}
    select('DISTINCT q.id, q.views, q.likes, q.title, q.body, count(a.id) AS total_answers, q.created_at')
    .from('questions AS q')
    .joins('LEFT JOIN answers AS a ON a.question_id = q.id')
    .where('q.body ILIKE ANY (array[:body]) OR q.title ILIKE ANY (array[:title])', body: arr, title: arr)
    .order('q.views DESC')
    .group('q.id')
  end

  def self.popular
    select('DISTINCT q.id, q.views, q.likes, q.title, q.body, count(a.id) AS total_answers, q.created_at')
    .from('questions AS q')
    .joins('LEFT JOIN answers AS a ON a.question_id = q.id')
    .order('q.views DESC')
    .group('q.id')
  end

  def self.answer_count(id)
    select('count(a.id)')
    .from('questions AS q')
    .joins('LEFT JOIN answers AS a ON q.id = a.question_id')
    .where('q.id = ?', id)
  end

end
