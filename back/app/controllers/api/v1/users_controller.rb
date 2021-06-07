module Api
  module V1
    class UsersController < ApplicationController
      def index
        @user = User.all
        render json: @user, status: :ok
      end

      def show
        @user = User.includes({gearlike: :like_users}, {reviews: [:gear, :user, :review_likes]}, {like_reviews: [:review_likes, :gear, :user]}, :followings, :followers).find(params[:id])
        render json: @user.as_json(include: [{gearlike: {include: {like_users: {only: [:id]}}}},
                                            {reviews: {include: [:review_likes, {gear: {only: [:id, :name, :image]}}, {user: {only: [:id, :name, :image]}}]}},
                                            {like_reviews: {include: [:review_likes, {gear: {only: [:id, :name, :image]}}, {user: {only: [:id, :name, :image]}}]}},
                                            :followings, :followers])
      end

      private

    end
  end
end
