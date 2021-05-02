class AddImageToGear < ActiveRecord::Migration[6.0]
  def change
    add_column :gears, :image, :string
  end
end
