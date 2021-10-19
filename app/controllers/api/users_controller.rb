class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_page

  def index
    render json: User.all
  end

  def show
    render json: current_user
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: {errors: current_user.errors}, status: 422
    end
  end

  def follow
    if current_user.update(user_follow)
      render json: current_user
    else
      render json: {errors: current_user.errors}, status: 422
    end
  end
  def destroy
    current_user.destroy
    render json: current_user
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

  def update_image
    file = params[:image]
  
    if file
      begin
        # ext = File.extname(file.tempfile)
          
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        current_user.image = cloud_image['secure_url']
        current_user.save
        render json: current_user
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
  end
    
  def user_profile
    id = params[:id]
    user = User.find(params[:id])
    render json: {user: user, views: User.question_views(id)}
  end



  private


  def set_page
    @page = params[:page] || 1
  end

  def user_params
    params.require(:user).permit(:name, :email, :cohort, :about_me, :image,)
  end 
  def user_follow
    params.require(:user).permit(:follow => [])
  end 

end
