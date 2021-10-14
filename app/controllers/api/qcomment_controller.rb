class Api::CommentsController < ApplicationController
  before_action :set_question
  before_action :set_qcomment, only: [:show, :update, :destroy]


  def index
    qcomments = @question.qcomments.all
    # comments = @answer.comments.simplify
    render json: qcomments
  end

  def show
    render json: @qcomment
  end

  def create
    @qcomment = Qcomment.new(qcomment_params)
    if(@qcomment.save)
      render json: @qcomment
    else
      render json: {errors: @qcomment.errors.full_messages}, status: 422
    end
  end

  def update
    if @qcomment.update(qcomment_params)
      render json: @qcomment
    else
      render json: {errors: @qcomment.errors.full_messages}, status: 422
    end
  end

  def destroy
    @qcomment.destroy
    render json: @qcomment
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end

  def set_qcomment
    @qcomment = @question.qcomments.find(params[:id])
  end

  def comment_params
    params.require(:qcomment).permit(:id, :user_id, :question_id, :body)
  end

end
