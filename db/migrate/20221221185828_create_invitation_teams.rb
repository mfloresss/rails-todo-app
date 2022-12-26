class CreateInvitationTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :invitation_teams do |t|
      t.references :user, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true
      t.boolean :confirm, null: false, default: false

      t.timestamps
    end
  end
end
