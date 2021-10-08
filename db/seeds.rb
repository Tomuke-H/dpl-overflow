# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
QuestionTag.destroy_all
Tag.destroy_all
Comment.destroy_all
Answer.destroy_all
Question.destroy_all
User.destroy_all


test = User.create(email:'test@test.com', password:123456, name:'Tester', cohort: 'Fall 2021', about_me: 'I am a fake user.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')

test2 = User.create(email:'test2@test.com', password:123456, name:'Tester2', cohort: 'Fall 2021', about_me: 'I am a fake user too.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')

# Thing.create(name: Faker::Company.name)
# Thing.create(name: Faker::Company.name)

tag1 = Tag.create(name: "existential")

tag2 = Tag.create(name: "preparation")

10.times do 
  quest = test.questions.create(title: 'Am I even alive?', body: 'I am a test user, but am I even alive?')
  quest.question_tags.create(tag_id: tag1.id)
  5.times do
    ans = quest.answers.create(body: "not really", likes: 0, verified: false, user_id: test2.id)
    ans.comments.create(body: "This is a dumb answer", user_id: test.id)
  end
end

10.times do
  quest2 = test2.questions.create(title: 'Is this course hard?', body: 'I will be in the next cohort and I want to know if it will be difficult?')
  quest2.question_tags.create(tag_id: tag2.id)
  5.times do
    ans2 = quest2.answers.create(body: "depends on who you are m8", likes: 0, verified: false, user_id: test.id)
    ans2.comments.create(body: "not particularly helpful are you?", user_id: test2.id)
  end
end

puts "Users: #{User.all.size}"
puts "Questions: #{Question.all.size}"
puts "QuestionTags: #{QuestionTag.all.size}"
puts "Tags: #{Tag.all.size}"





