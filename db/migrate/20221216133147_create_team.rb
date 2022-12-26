class CreateTeam < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    create_join_table :teams, :users do |t|
      t.index :team_id
      t.index :user_id
    end
  end
end
