class ChoiseGear < ApplicationRecord
  belongs_to :gear
  belongs_to :menu

  validates :gear_id, presence: true
  validates :menu_id, presence: true
end
