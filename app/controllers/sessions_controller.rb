class SessionsController < ApplicationController
  skip_before_action :authenticate
  before_action :logged_in
  skip_before_action :logged_in, only: %i[destroy]

  def create
    flash[:email_error_field] = "Can't be empty" if params[:email].empty?
    flash[:password_error_field] = "Can't be empty" if params[:password].empty?

    return render :login if params[:email].empty? || params[:password].empty?

    @user = User.find_by(email: params[:email])&.authenticate(params[:password])

    unless @user
      flash[:notice] = 'Invalid email or password'
      return render :login
    end

    session[:user_id] = @user.id

    redirect_to root_url
  end

  def destroy
    session.delete :user_id
    @current_user = nil

    redirect_to login_path
  end

  private

  def logged_in
    redirect_to root_path if session[:user_id]
  end
end
