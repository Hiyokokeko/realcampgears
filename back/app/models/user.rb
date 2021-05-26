# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader

  has_many :gear_likes, dependent: :destroy
  has_many :gearlike, through: :gear_likes, source: :gear

  def like(other_gear)
    self.gear_likes.find_or_create_by(gear_id: other_gear.id)
  end

  def unlike(other_gear)
    like = self.gear_likes.find_by(gear_id: other_gear.id)
    like.destroy if like
  end

  def liking?(other_gear)
    self.gearlike.include?(other_gear)
  end
end
