Rails.application.routes.draw do
  root 'tasks#index'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'
  
  post '/logout', to: 'sessions#destroy'

  resources :users, only: %i[show new create update]

  resources :comments

  resources :tasks do
    resources :comments
    collection do
      get 'finished'
      delete 'finished'
    end
  end

  delete '/tasks', to: 'tasks#destroy_all'

  get '/settings', to: 'users#show'
end
