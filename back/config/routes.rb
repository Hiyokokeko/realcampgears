Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1, format: 'json' do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      get 'isLike', to: 'gear_likes#isLike'
      resources :gears
      resources :users
      resource :gear_likes, only: [:create, :destroy]
    end
  end
end
