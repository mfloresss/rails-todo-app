class UsersController < ApplicationController
  before_action :logged_in, :set_current_user
  before_action :logged_in, only: %i[new create]
  after_action :set_team, only: [:create]

  skip_before_action :authenticate, :set_current_user, only: %i[new create]

  def index
    @user = @user.attributes.merge({
                                     teams: @user.teams
                                   }).except 'password_digest'
  end

  def new
    @user = User.new
  end

  def show
    @team = Team.find session[:current_team_id]
  end

  def create
    @user = User.new(user_params)

    return render :new if user_exist

    if @user.save
      redirect_to login_path
    else
      render :new
    end
  end

  def update
    data = user_params[:email] == @user.email ? user_params.except(:email) : user_params

    return redirect_to settings_path if data[:email] && user_exist

    @user.update(user_params.permit!)

    redirect_to settings_path
  end

  private

  def set_team
    @team = Team.new user_id: @user.id, name: "#{params[:user][:name]}'s Team"
    @user.teams << @team
  end

  def user_exist
    return unless User.find_by_email params[:user][:email]

    flash[:notice] = 'Email already in use'
  end

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
