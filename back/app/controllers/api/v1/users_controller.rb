module Api
  module V1
    class UsersController < ApplicationController
      def index
        @user = User.all
        render json: @user, status: :ok
      end

      def show
        @user = User.includes({gearlike: :like_users}).find(params[:id])
        render json: @user.as_json(include: {gearlike: {include: {like_users: {only: ['id']}}}})
      end

      private

    end
  end
end