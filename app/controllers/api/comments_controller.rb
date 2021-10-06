class Api::CommentsController < ApplicationController
  # before_action :set_user
  # before_action :set_answer
  before_action :set_comment, only: [:show, :update, :destroy]


  def index
    comments = Comment.simplify
    render json: comments
  end

  def show
    render json: @comment
  end

  def create
    @comment = Comment.new(comment_params)
    if(@comment.save)
      render json: @comment
    else
      render json: {errors: @comment.errors.full_messages}, status: 422
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: {errors: @comment.errors.full_messages}, status: 422
    end
  end

  def destroy
    render json: @comment.destroy
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_answer
    @answer = Answer.find(params[:answer_id])
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:id, :user_id, :answer_id, :body)
  end

end