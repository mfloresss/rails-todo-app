class AddAuthorToComment < ActiveRecord::Migration[6.1]
  def up
    add_reference :comments, :user, null: false, foreign_key: true
    remove_column :comments, :commenter
  end
  
  def down
    add_column :comments, :commenter, :string, null: false
  end
end
