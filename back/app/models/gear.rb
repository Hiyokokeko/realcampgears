class Gear < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :details, presence: true
  validates :size, presence: true
  validates :weight, presence: true
  validates :price, presence: true
  validates :category, presence: true
  validates :maker, presence: true

  mount_uploader :image, ImageUploader
end
