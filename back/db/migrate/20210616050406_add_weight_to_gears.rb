class AddWeightToGears < ActiveRecord::Migration[6.0]
  def change
    add_column :gears, :weight, :float
  end
end
