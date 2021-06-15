class CreateChoiseGears < ActiveRecord::Migration[6.0]
  def change
    create_table :choise_gears do |t|
      t.references :gear, null: false, foreign_key: true
      t.references :menu, null: false, foreign_key: true

      t.timestamps

      t.index [:gear_id, :menu_id], unique: true
    end
  end
end
