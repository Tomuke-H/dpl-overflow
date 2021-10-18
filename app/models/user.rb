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


  # def self.user_profile(id)
  #   select('u.name, u.id, u.cohort, u.about_me, u.image, COUNT(q.likes + a.likes + c.likes) AS votes, COUNT(q.views) AS views, COUNT(a.id) AS answer_count, COUNT(q.id) AS question_count')
  #   .from('users AS u')
  #   .joins('INNER JOIN answers AS a ON u.id = a.user_id
  #   INNER JOIN questions AS q ON u.id = q.user_id
  #   INNER JOIN comments AS c ON u.id = c.user_id')
  #   .where('u.id = ?', id)
  #   .group('u.id')
  # end

#   SELECT  q.user_id, SUM(q.views) as question_views
# from questions q
# GROUP BY q.user_id;

# SELECT  a.user_id, SUM(a.likes) as answer_likes 
# from answers a
# GROUP BY a.user_id;

def self.question_views(id)
  select('q.user_id, SUM(q.views) as question_views')
  .from('questions as q')
  .where('q.user_id = ?', id)
  .group('q.user_id')
  
end

def self.answer_likes(id)
  select('a.user_id, SUM(a.likes) as answer_likes')
  .from('answers a')
  .group('a.user_id;')
  .where('a.user_id = ?', id)
end



  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
