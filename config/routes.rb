Rails.application.routes.draw do
  root to: redirect('/teams')

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#create'

  get '/logout', to: 'sessions#destroy'
  post '/logout', to: 'sessions#destroy'

  resources :users, only: %i[show new create update] do
    resources :tasks
  end

  resources :teams do
    resources :tasks do
      resources :comments
      collection do
        get 'finished'
        delete 'finished'
      end
    end
    delete '/tasks', to: 'tasks#destroy_all'

    get 'invite'
    post 'invite', to: 'teams#send_invite'

    collection do
      get 'invitations', to: 'invitation_teams#index'
      patch 'invitations/:invitation_id/accept', to: 'invitation_teams#accept'
      delete 'invitations/:invitation_id/decline', to: 'invitation_teams#decline'
    end
  end

  get '/settings', to: 'users#show'
end
