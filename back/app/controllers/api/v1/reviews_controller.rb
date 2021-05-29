module Api
  module V1
    class ReviewsController < ApplicationController

      def create
        review = Review.new(review_params)
        if review.save
          render json: review
        else
          render json: { status: 400 }
        end
      end

      def destroy
        review = Review.find(params[:id])
        if review.destroy
          render json: review
        else
          render json: { status: 400 }
        end
      end

      private

      # def set_user
      #   @user = User.find(params[:user_id])
      #   @gear = Gear.find(params[:gear_id])
      # end

      def review_params
        params.permit(:user_id, :gear_id, :title, :content, :image)
      end
    end
  end
end
