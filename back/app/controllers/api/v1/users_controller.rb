module Api
  module V1
    class UsersController < ApplicationController
      def index
        @user = User.all
        render json: @user, status: :ok
      end

      def show
        @user = User.find(params[:id])
        render json: @user, status: :ok
      end

      private

      def gear_params
        params.permit(:name, :details, :size, :weight, :price, :category, :maker, :image)
      end
    end
  end
end
