class Task < ApplicationRecord
    has_many :comments, dependent: :destroy

    validates :title, :body, presence: { message: "Can't be empty"}
end
