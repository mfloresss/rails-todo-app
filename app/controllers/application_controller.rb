class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format =~ %r{application/json} }

  before_action :authenticate

  private

  def authenticate
    @current_user = User.find_by id: session[:user_id]

    redirect_to login_path unless @current_user
  end
end
