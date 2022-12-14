class Task < ApplicationRecord
  has_many :comments, dependent: :destroy
  
  belongs_to :user
  belongs_to :team

  enum status: %i[ongoing finished]

  validates :title, presence: { message: "Can't be empty" }

  def author_name
    user.name + ' ' + user.last_name
  end
end
