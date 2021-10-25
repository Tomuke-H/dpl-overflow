class Api::QvotesController < ApplicationController
  before_action :set_question, except: [:check_vote]
  before_action :set_qvote, only: [:show, :update, :destroy]

  def index
    render json: @question.qvotes.all
  end

  def show
    render json: @qvote
  end

  def create
    @qvote = Qvote.new(qvote_params)
    if(@qvote.save)
      render json: @qvote
    else
      render json: {errors: @qvote.errors.full_messages}, status: 422
    end
  end

  def update
    if @qvote.update(qvote_params)
      render json: @qvote
    else
      render json: {errors: @qvote.errors.full_messages}, status: 422
    end
  end

  def destroy
    @qvote.destroy
    render json: @qvote
  end

  def check_vote
    render json: @question.qvotes.check_vote(params[:user_id])
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end

  def set_qvote
  @qvote = @question.qvotes.find(params[:id])
  end


  def qvote_params
    params.require(:qvote).permit(:id, :user_id, :question_id, :up, :down, :vote_code)
  end

end