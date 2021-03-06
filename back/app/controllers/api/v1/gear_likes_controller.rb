module Api
  module V1
    class GearLikesController < ApplicationController
      before_action :set_user, only: [:destroy]

      def create
        likegear = GearLike.new(like_params)
        if likegear.save
          render json: @user
        else
          render json: { status: 400 }
        end
      end

      def destroy
        likegear = @user.unlike(@gear)
        if likegear.destroy
          render json: @user
        else
          render json: { status: 400 }
        end
      end

      # フードをlikeしているか真偽値を返す
      def isLike
        isLike = @user.liking?(@gear)
        render json: isLike
      end

      private

      def set_user
        @user = User.find(params[:user_id])
        @gear = Gear.find(params[:gear_id])
      end

      def like_params
        params.permit(:user_id, :gear_id)
      end
    end
  end
end
