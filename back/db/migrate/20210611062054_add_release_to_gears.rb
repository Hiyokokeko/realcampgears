class AddReleaseToGears < ActiveRecord::Migration[6.0]
  def change
    add_column :gears, :release, :date
  end
end
