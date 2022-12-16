class UsersController < ApplicationController
  before_action :logged_in, :set_current_user
  before_action :logged_in, only: %i[new create]
  skip_before_action :authenticate, :set_current_user, only: %i[new create]

  def index
    @user = @user.attributes.merge({
                                     teams: @user.teams
                                   }).except 'password_digest'
  end

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

    @team = Team.new name: "#{params[:user][:name]}'s Team"
    @user.teams << @team

    pp @user.teams

    if @user.save
      redirect_to login_path
    else
      render :new
    end
  end

  def update
    user_exist = User.find_by_email params[:user][:email] if params[:user][:email]

    if user_exist
      flash[:notice] = 'Email already usage'
      return redirect_to settings_path
    end

    @user.update(user_params)

    redirect_to settings_path
  end

  private

  def set_current_user
    @user = User.find session[:user_id]
  end

  def user_params
    params.require(:user).permit(:name, :last_name, :email, :password)
  end

  def logged_in
    redirect_to root_path if session[:user_id]
  end
end
