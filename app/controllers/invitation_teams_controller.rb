class InvitationTeamsController < ApplicationController
  before_action :set_current_user
  before_action :set_invitation, only: %i[accept decline]

  def index
    @invitations = @user.invitation_teams.map do |invitation|
      invitation.attributes.merge({ team: invitation.team })
    end
  end

  def accept
    @user.teams << @invitation.team

    @invitation.destroy!
  end

  def decline
    @invitation.destroy!
  end

  private

  def set_invitation
    @invitation = InvitationTeam.find params[:invitation_id]
  end

  def set_current_user
    @user = User.find session[:user_id]
  end
end
