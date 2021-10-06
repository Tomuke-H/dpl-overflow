class Api::AnswersController < ApplicationController

before_action :set_answer, only: [:show, :update, :destroy]

def index
  render json: Answer.all
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

private

def set_answer
  @answer = Answer.find(params[:id])
end

def answer_params
  params.require(:answer).permit(:body, :likes, :verified, :question_id, :user_id)
end

end