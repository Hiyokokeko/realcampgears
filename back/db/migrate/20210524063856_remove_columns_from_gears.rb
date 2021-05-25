class RemoveColumnsFromGears < ActiveRecord::Migration[6.0]
  def change
    remove_column :gears, :size, :float
    remove_column :gears, :weight, :float
    remove_column :gears, :price, :float
  end
end
