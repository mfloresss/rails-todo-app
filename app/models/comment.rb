class Comment < ApplicationRecord
    belongs_to :task, dependent: :delete

    validates :commenter, :body, presence: { message: "Can't be empty" }
end
