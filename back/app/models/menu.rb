class Menu < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true
  validates :date, presence: true
  validates :timezone, presence: true
  validates :timezone_number, presence: true
  validates :user_id,  uniqueness: { scope: [:date, :timezone]  }

  has_many :choise_gears, dependent: :destroy
  has_many :choise_gear, through: :choise_gears, source: :gear
end
