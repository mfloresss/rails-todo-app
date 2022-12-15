Rails.application.routes.draw do
  root 'tasks#index'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'

  get '/logout', to: 'sessions#destroy'
  post '/logout', to: 'sessions#destroy'

  resources :users, only: %i[new create]

  resources :comments

  resources :tasks do
    resources :comments
    collection do
      get 'finished'
      delete 'finished'
    end
  end

  delete '/tasks', to: 'tasks#destroy_all'
end
