class User < ApplicationRecord
  has_secure_password
  
  has_many :tasks

  validates :name, :last_name, :email, presence: { message: "Can't be empty" }
end
