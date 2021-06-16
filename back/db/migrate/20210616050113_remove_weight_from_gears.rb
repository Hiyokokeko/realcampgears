class RemoveWeightFromGears < ActiveRecord::Migration[6.0]
  def change
    remove_column :gears, :weight, :string
  end
end
