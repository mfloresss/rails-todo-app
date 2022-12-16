class Task < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_and_belongs_to_many :team

  enum status: %i[ongoing finished]

  validates :title, presence: { message: "Can't be empty" }

  def author_name
    user.name + ' ' + user.last_name
  end
end
