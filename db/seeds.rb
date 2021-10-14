# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require 'faker'
# QuestionTag.destroy_all
# Tag.destroy_all
# Comment.destroy_all
# Answer.destroy_all
# Question.destroy_all
# User.destroy_all


# test = User.create(email:'test@test.com', points: 2, password:123456, name:'Tester', cohort: 'Fall 2021', about_me: 'I am a fake user.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')

# test2 = User.create(email:'test2@test.com', points: 1, password:123456, name:'Tester2', cohort: 'Fall 2021', about_me: 'I am a fake user too.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')
# test3 = User.create(email:'test3@test.com', points: 4, password:123456, name:'Tester3', cohort: 'Winter 2021', about_me: 'I am a fake user also.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')
# test4 = User.create(email:'test4@test.com', points: 8, password:123456, name:'Tester4', cohort: 'Winter 2021', about_me: 'I am a fake user as well.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')
# test5 = User.create(email:'test5@test.com', points: 7, password:123456, name:'Tester5', cohort: 'Spring 2022', about_me: 'I am a fake user in addition to.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')
# test6 = User.create(email:'test6@test.com', points: 3, password:123456, name:'Tester6', cohort: 'Spring 2022', about_me: 'I am a fake user unfortunately.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')

# # Thing.create(name: Faker::Company.name)
# # Thing.create(name: Faker::Company.name)

# tag1 = Tag.create(name: "existential")
# tag2 = Tag.create(name: "preparation")

# 10.times do 
#   quest = test.questions.create(title: 'Am I even alive?', body: 'I am a test user, but am I even alive?')
#   quest.question_tags.create(tag_id: tag1.id)
#   5.times do
#     ans = quest.answers.create(body: "not really", likes: 0, verified: false, user_id: test2.id)
#     ans.comments.create(body: "This is a dumb answer", user_id: test.id)
#   end
# end

# 10.times do
#   quest2 = test2.questions.create(title: 'Is this course hard?', body: 'I will be in the next cohort and I want to know if it will be difficult?')
#   quest2.question_tags.create(tag_id: tag2.id)
#   5.times do
#     ans2 = quest2.answers.create(body: "depends on who you are m8", likes: 0, verified: false, user_id: test.id)
#     ans2.comments.create(body: "not particularly helpful are you?", user_id: test2.id)
#   end
# end

# test.questions.create(title:'Unanswered', body: 'Will somebody PLEASE answer me??')
# test2.questions.create(title:'Completely los', body: 'Will anybody PLEASE answer me??')

# puts "Users: #{User.all.size}"
# puts "Questions: #{Question.all.size}"
# puts "QuestionTags: #{QuestionTag.all.size}"
# puts "Tags: #{Tag.all.size}"

@tags = [
  'existential',
  'preparation',
  'JavaScript', 
  'Ruby',
  'Rails',
  'React',
  'Assignment',
  'Hackathon',
  'Functions',
  'Data Types',
  'Arrays',
  'Strings',
  'Algorithms'
]

@cohorts = [
  'Spring 2021',
  'Summer 2021',
  'Fall 2021',
  'Winter 2021',
  'Spring 2022',
  'Summer 2022'
]

require 'faker'
QuestionTag.destroy_all
Tag.destroy_all
Comment.destroy_all
Answer.destroy_all
Question.destroy_all
User.destroy_all

@tags.each { |t| Tag.create(name:t)}

user1 = User.create(email:'test@test.com', points: 2, password:123456, name:'Tester', cohort: 'Fall 2021', about_me: 'I am a fake user.', image: 'https://images.theconversation.com/files/17962/original/jt558trs-1353642967.jpg?ixlib=rb-1.1.0&rect=23%2C5%2C3831%2C2573&q=45&auto=format&w=926&fit=clip')

25.times do
  u_name = Faker::Name.first_name
  email = Faker::Internet.email(name: u_name)
  u = User.create(email:Faker::Internet.email, points: rand(830), password:123456, name: u_name, cohort: @cohorts[rand(6)], about_me: Faker::Lorem.sentence(word_count: 15), image: 'https://source.unsplash.com/user/erondu/200x200')
  (rand(6)+1).times do
    quest = u.questions.create(title: Faker::Lorem.question(word_count: 6), views: rand(30), body: @tags[rand(13)] + Faker::Lorem.sentence(word_count: 30))
    (rand(3)+1).times do
      quest.question_tags.create(tag_id:Tag.order('Random()').first.id)
    end
    (rand(5)+1).times do
      quest.qcomments.create(user_id: User.order('Random()').first.id, body: Faker::Lorem.sentence)
    end
    if(rand(8)>0)
      (rand(8)+1).times do
        ans = quest.answers.create(user_id: User.order('Random()').first.id, body: Faker::Lorem.sentence, likes: rand(40), verified: rand(20)>18)
        (rand(5)+1).times do
          ans.comments.create(user_id: User.order('Random()').first.id, body: Faker::Lorem.sentence)
        end
      end
    end
  end
end


puts "Users: #{User.all.size}"
puts "Questions: #{Question.all.size}"
puts "QuestionTags: #{QuestionTag.all.size}"
puts "QComments #{Qcomment.all.size}"
puts "Answers: #{Answer.all.size}"
puts "Comments: #{Comment.all.size}"
puts "Tags: #{Tag.all.size}"