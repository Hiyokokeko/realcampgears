class CreateGearLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :gear_likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :gear, null: false, foreign_key: true

      t.timestamps

      t.index [:user_id, :gear_id], unique: true
    end
  end
end
