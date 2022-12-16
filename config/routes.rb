Rails.application.routes.draw do
  root 'users#index'

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'

  get '/logout', to: 'sessions#destroy'
  post '/logout', to: 'sessions#destroy'

  resources :users, only: %i[show new create update] do
    resources :tasks
  end

  resources :comments

  resources :team do
    resources :tasks do
      resources :comments
      collection do
        get 'finished'
        delete 'finished'
      end
    end
    delete '/tasks', to: 'tasks#destroy_all'
  end

  get '/settings', to: 'users#show'
end
