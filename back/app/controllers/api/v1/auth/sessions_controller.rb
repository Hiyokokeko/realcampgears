class Api::V1::Auth::SessionsController < ApplicationController
  def whoami
    render json:crrent_user, status: :ok
  end
end
