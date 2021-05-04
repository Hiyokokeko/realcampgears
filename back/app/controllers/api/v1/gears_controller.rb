class Api::V1::GearsController < ApplicationController
  def index
    @gear = Gear.all
    render json: @gear, status: :ok
  end

  def show
    # @gear = Food.find(params[:food_id])
    # render json: @food, status: :ok
  end

  def create
    @gear = Gear.new(gear_params)

    if @gear.save
      render json: @gear,status: :created
    else
      render json: @gear.errors, status: :unprocessable_entity
    end
  end

  def destroy

  end

  private

  def gear_params
    params.permit(:name, :details, :size, :weight, :price, :category, :maker, :image)
  end
end
