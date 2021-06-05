class Review < ApplicationRecord
  belongs_to :user
  belongs_to :gear

  validates :user_id, presence: true
  validates :gear_id, presence: true
  validates :content, presence: true

  mount_uploader :image, ImageUploader

  has_many :review_likes, dependent: :destroy
end
