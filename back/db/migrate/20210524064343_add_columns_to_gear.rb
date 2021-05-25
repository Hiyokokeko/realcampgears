class AddColumnsToGear < ActiveRecord::Migration[6.0]
  def change
    add_column :gears, :size, :string
    add_column :gears, :weight, :string
    add_column :gears, :price, :integer
  end
end
