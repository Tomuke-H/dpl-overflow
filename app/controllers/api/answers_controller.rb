class Api::AnswersController < ApplicationController

before_action :set_question, except: [:author, :users, :downvotes, :upvotes]
before_action :set_answer, only: [:show, :update, :destroy]


def index
  render json: @question.answers.all
end

def show
  render json: @answer
end

def create
  @answer = Answer.new(answer_params)
  if (@answer.save)
    render json: @answer
  else
  end
end

def update
  if (@answer.update(answer_params))
    render json: @answer
  else
  end
end

def destroy
  render json: @answer.destroy
end

def author
  render json: Answer.author(params[:id])
end

def users
  render json: Answer.get_users(params[:id])
end

def upvotes
  render json: Answer.get_upvotes(params[:id])
end


def downvotes
  render json: Answer.get_downvotes(params[:id])
end

private

def set_question
  @question = Question.find(params[:question_id])
end

def set_answer
  @answer = @question.answers.find(params[:id])
end

def answer_params
  params.require(:answer).permit(:body, :likes, :verified, :question_id, :user_id)
end

end
