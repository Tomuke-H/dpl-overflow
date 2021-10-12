class Tag < ApplicationRecord
  has_many :question_tags, dependent: :destroy
  has_many :questions, through: :question_tags

  # SELECT name
  # FROM tags
  # WHERE name LIKE '%Test%';

  def self.search(key)
    select('*')
    .from('tags')
    .where('name LIKE ?', "%#{key}%")
    .order('id DESC')
  end
end