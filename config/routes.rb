Rails.application.routes.draw do
  root 'tasks#index'

  resources :tasks do
    resources :comments
    collection do
      get 'finished'
      delete 'finished'
    end
  end

  resources :comments

  delete '/tasks', to: 'tasks#destroy_all'
end
