class User < ApplicationRecord
  has_secure_password

  has_many :tasks
  has_many :invitation_teams
  has_and_belongs_to_many :teams

  validates :name, :last_name, :email, presence: { message: "Can't be empty" }

  def full_name
    name + ' ' + last_name
  end
end
