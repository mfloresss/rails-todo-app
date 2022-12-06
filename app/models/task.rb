class Task < ApplicationRecord
    validates :title, :body, presence: { message: "Can't be empty"}
end
