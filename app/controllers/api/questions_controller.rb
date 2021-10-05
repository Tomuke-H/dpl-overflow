class Api::QuestionsController < ApplicationController

  before_action :set_question, only: [:show, :update, :destroy]

  def index
    render json: Question.all
  end

  def show
    render json: @question
  end

  def create
    @question = Question.new(question_params)
    @question.likes = 0
    if(@question.save)
      render json: 'it worked!!'
    else
      render json: @question.errors, status: 422
    end
  end

  def update
    if(@question.update(question_params))
      render json: @question
    else
      render json: @question.errors, status: 422
    end
  end

  def destroy
    render json: @question.destroy
  end


  private

  def question_params
    params.require(:question).permit(:user_id, :title, :body)
  end

  def set_question
    @question = Question.find(params[:id])
  end


end
