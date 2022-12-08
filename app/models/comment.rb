class Comment < ApplicationRecord
  belongs_to :task

  validates :commenter, :body, presence: { message: "Can't be empty" }
end
