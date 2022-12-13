class Task < ApplicationRecord
  has_many :comments, dependent: :destroy
  enum status: %i[ongoing finished]

  validates :title, presence: { message: "Can't be empty" }
end
