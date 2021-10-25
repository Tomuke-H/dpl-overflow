class Api::QvotesController < ApplicationController
  # before_action :set_question, except: [:my_vote]
  before_action :set_qvote, only: [:update, :destroy]

  # def index
  #   render json: @question.qvotes.all
  # end

  # def show
  #   render json: @qvote
  # end

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

  def my_vote
    render json: Qvote.get_my_vote(params[:vote_code])
  end

  private

  # def set_question
  #   @question = Question.find(params[:question_id])
  # end

  def set_qvote
  @qvote = Qvote.find(params[:id])
  end


  def qvote_params
    params.require(:qvote).permit(:id, :user_id, :question_id, :up, :down, :vote_code)
  end

end