class TeamsController < ApplicationController
  before_action :set_current_user, :set_current_team
  skip_before_action :set_current_team, only: %i[index]
  skip_before_action :set_current_user, only: %i[invite send_invite]

  def index
    @teams = @user.teams
    @invitation_teams = @user.invitation_teams
  end

  def send_invite
    confirm_invite = params[:button] == 'invite'

    if confirm_invite
      invitation = InvitationTeam.new user_id: session[:user_to_invite]['id'], team_id: @team.id
      invitation.save!

      session[:user_to_invite] = nil
    else
      return error "Can't be empty", :email_error_field if params[:email].empty?

      @user_find = User.find_by email: params[:email]

      return error 'User not found' unless @user_find

      is_member = @user_find.teams.select { |team| team == @team }.present?

      return error 'User already exist in the team' if is_member

      is_invited = @user_find.invitation_teams.find_by(team: @team).present?

      return error 'User already invited to team' if is_invited

      session[:user_to_invite] = @user_find
    end
    render :invite
  end

  def error(custom_message, field = :notice)
    flash[field] = custom_message
    @user_find = nil
    render :invite
  end

  private

  def set_current_user
    @user = User.find session[:user_id]
  end

  def set_current_team
    @team = Team.find params[:team_id]
  end
end
