class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :body, null: true
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end
