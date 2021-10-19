# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :qcomments, dependent: :destroy


  def self.leaderboard
    select('name, points, id, cohort, image')
    .from('users')
    .order('points DESC')
  end

  def self.cohort_leaderboard(cohort)
    select('name, points, id, cohort, image')
    .from('users')
    .where('cohort = ?', cohort)
    .order('points DESC')
    .group('id')
  end

  def self.cohort_yearbook(cohort)
    select('name, image, cohort')
    .from('users')
    .where('cohort = ?', cohort)
  end


def self.user_profile(id)
  ActiveRecord::Base.connection.exec_query("SELECT u.name, u.id, u.cohort, u.about_me, u.image,  count(*) as answer_count,
    (SELECT SUM(q.views) as question_views from questions q WHERE q.user_id = #{id}),
    (SELECT COUNT(*) as question_count from questions q WHERE q.user_id = #{id}),
    (SELECT SUM(q.likes) as question_likes from questions q WHERE q.user_id = #{id}),
    (SELECT SUM(a.likes) as answer_likes from answers a WHERE a.user_id = #{id}),
    (SELECT SUM(c.likes) as comment_likes from comments c WHERE c.user_id = #{id})
from answers a
INNER JOIN users u on a.user_id = u.id AND a.user_id = #{id}
GROUP BY u.id")
end


def self.user_questions(id)
  select('u.id, q.id AS question_id, q.title, q.body AS question_body, q.views, q.created_at AS question_created')
  .from('questions as q ')
  .joins('FULL JOIN users as u ON q.user_id = u.id')
  .where('u.id = ?', id)
  .order('q.created_at DESC')
end


def self.user_answers(id)
  select('u.id, q.id AS question_id, a.id AS answer_id, q.title, q.body AS question_body, q.views, a.body AS answer_body, a.created_at AS answer_created, q.created_at AS question_created, a.verified')
  .from('questions AS q')
  .joins('FULL JOIN users as u ON q.user_id = u.id
          FULL JOIN answers AS a ON a.question_id = q.id')
  .where('u.id = ?', id)
  .order('a.created_at DESC')
end


  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
