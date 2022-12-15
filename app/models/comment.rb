class Comment < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :body, presence: { message: "Can't be empty" }

  def author_name
    user.name + ' ' + user.last_name
  end
end
