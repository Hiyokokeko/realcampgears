class Review < ApplicationRecord
  belongs_to :user
  belongs_to :gear

  validates :user_id, presence: true
  validates :gear_id, presence: true

  mount_uploader :image, ImageUploader
end
