class Api::QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :update, :destroy]

  def index
    render json: Question.page(1).per(10)
  end

  def show
    render json: @question
  end

  def create
    @question = Question.new(question_params)
    if(@question.save)
      render json: @question
    else
      render json: @question.errors, status: 422
    end
  end

  def find_questions_by_tag
    render json: Question.find_question_by_tag(params[:tag_name])
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

  def set_page
    @page = params[:page] || 1
  end


end
