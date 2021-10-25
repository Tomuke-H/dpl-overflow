class Api::AvotesController < ApplicationController
  before_action :set_answer, except: [:my_vote]
  before_action :set_avote, only: [:show, :update, :destroy]

  def index
    render json: @answer.avotes.all
  end

  def show
    render json: @avote
  end

  def create
    @avote = Avote.new(avote_params)
    if(@avote.save)
      render json: @avote
    else
      render json: {errors: @avote.errors.full_messages}, status: 422
    end
  end

  def update
    if @avote.update(avote_params)
      render json: @avote
    else
      render json: {errors: @avote.errors.full_messages}, status: 422
    end
  end

  def destroy
    @avote.destroy
    render json: @avote
  end

  def my_vote
    render json: Avote.get_my_vote(params[:vote_code])
  end

  private

  def set_answer
    @answer = Answer.find(params[:answer_id])
  end

  def set_avote
    @avote = @answer.avotes.find(params[:id])
  end

  def avote_params
    params.require(:avote).permit(:id, :user_id, :answer_id, :up, :down, :vote_code)
  end

end
