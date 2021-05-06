class CreateGears < ActiveRecord::Migration[6.0]
  def change
    create_table :gears do |t|
      t.string :name
      t.text :details
      t.float :size
      t.float :weight
      t.float :price
      t.string :category
      t.string :maker

      t.timestamps
    end
  end
end
