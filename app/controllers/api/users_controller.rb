class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_page
  # before_action :authenticate_user!
  before_action :set_user, only: [:show,:update,:destroy]

  def index
    render json: User.all
  end

  def show
    render json: @user
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: {errors: @user.errors}, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: {errors: @user.errors}, status: 422
    end
  end

  def destroy
    @user.destroy
    render json: @user
  end

  def leaderboard
    render json: {users: User.leaderboard.page(@page).per(10), total_pages: User.leaderboard.page(@page).per(10).total_pages}
  end

  def cohort_leaderboard
    render json: {users: User.cohort_leaderboard(params[:cohort]).page(@page).per(10), total_pages: User.cohort_leaderboard(params[:cohort]).page(@page).per(10).total_pages}
  end

  def cohort_yearbook
    render json: {users: User.cohort_yearbook(params[:cohort])}
  end


  private
  
  def set_user
    @user= User.find(params[:id])
  end

  def set_page
    @page = params[:page] || 1
  end

  def user_params
    params.require(:user).permit(:name, :email, :cohort, :about_me, :image)
  end 

end
