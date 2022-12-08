class Task < ApplicationRecord
    has_many :comments, dependent: :destroy
    
    validates :title, presence: { message: "Can't be empty" }
end