class CreateTeam < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    create_table :users_team do |t|
      t.references :user, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true
    end

    create_table :users_team do |t|
      t.references :user, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true
    end
  end
end
