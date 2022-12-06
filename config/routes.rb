Rails.application.routes.draw do
  root "tasks#index"

  resources :tasks do
    resources :comments 
  end

  delete "/tasks", to: "tasks#destroy_all"
end
