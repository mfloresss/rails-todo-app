class UsersController < ApplicationController
  skip_before_action :authenticate!, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    user_exist = User.find_by_email params[:user][:email]

    if user_exist
      flash[:notice] = 'Email already usage'
      return render :new
    end

    if @user.save
      redirect_to login_path
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :last_name, :email, :password)
  end
end
