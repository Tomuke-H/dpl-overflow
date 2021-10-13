# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :qcomments, dependent: :destroy


  def self.leaderboard
    select('name, points, id, cohort')
    .from('users')
    .order('points DESC')
  end

  def self.cohort_leaderboard(cohort)
    select('name, points, id, cohort')
    .from('users')
    .where('cohort = ?', cohort)
    .order('points DESC')
  end

  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
