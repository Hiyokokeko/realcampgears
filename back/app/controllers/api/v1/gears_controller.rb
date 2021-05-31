module Api
  module V1
    class GearsController < ApplicationController
      def index
        @gear = Gear.all.includes(:like_users)
        render json: @gear.as_json(include: :like_users)
        # render json: @gear.as_json(only: [:id, :name,:image],include: {like_users: {only: ['id']}})
      end

      def show
        @gear = Gear.includes(:like_users, {reviews: :user}).find(params[:id])
        render json: @gear.as_json(include: [:like_users, {reviews: {include: {user: {only: ['id', 'image', 'name']}}}}])
      end

      def create
        @gear = Gear.new(gear_params)

        if @gear.save
          render json: @gear, status: :created
        else
          render json: @gear.errors, status: :unprocessable_entity
        end
      end

      def destroy; end

      private

      def gear_params
        params.permit(:name, :details, :size, :weight, :price, :category, :maker, :image)
      end
    end
  end
end
