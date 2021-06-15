class Gear < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :details, presence: true
  validates :size, presence: true
  validates :weight, presence: true
  validates :price, presence: true
  validates :category, presence: true
  validates :maker, presence: true
  validates :release, presence: true

  mount_uploader :image, ImageUploader

  has_many :gear_likes, dependent: :destroy
  has_many :like_users, through: :gear_likes, source: :user
  has_many :reviews, dependent: :destroy
  has_many :choise_gears, dependent: :destroy
end
