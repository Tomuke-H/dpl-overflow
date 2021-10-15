class Api::QuestionsController < ApplicationController
  before_action :set_page
  before_action :set_question, only: [:show, :update, :destroy, :answer_count, :add_view]

  def index
    render json: {questions: Question.popular.page(@page).per(5), total_pages: Question.popular.page(@page).per(5).total_pages}
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

  def add_view
    if(@question.update(views: @question.views+1))
      render json: @question.views
    else
      render json: @question.errors, status: 422
    end
  end


  def find_questions_by_tag
    puts '---------------------------------------------'
    puts params[:tag_name]
    puts '---------------------------------------------'
    render json: {questions: Question.find_questions_by_tag(params[:tag_name]).page(@page).per(5), total_pages: Question.find_questions_by_tag(params[:tag_name]).page(@page).per(5).total_pages}
  end

  def unanswered_questions
    render json: {questions: Question.unanswered_questions.page(@page).per(5), total_pages: Question.unanswered_questions.page(@page).per(5).total_pages}
  end

  def search
    render json: {questions: Question.search(params[:body]).page(@page).per(5), total_pages: Question.search(params[:body]).page(@page).per(5).total_pages}
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

  def answer_count
    render json: Question.answer_count(params[:id])
  end

  def author
    render json: Question.author(params[:id])
  end

  private

  def question_params
    params.require(:question).permit(:user_id, :title, :body, :likes)
  end

  def set_question
    @question = Question.find(params[:id])
  end

  def set_page
    @page = params[:page] || 1
  end


end
