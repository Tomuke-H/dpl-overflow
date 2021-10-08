Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users
    resources :questions do
      resources :answers
    end
    resources :answers do
      resources :comments
    end
    get 'questionTags', to:'question_tags#index'
    post 'questionTags', to:'question_tags#create'
    delete 'questionTags/:id', to:'question_tags#destroy'
    get 'find_questions_by_tag/:tag_name', to:'questions#find_questions_by_tag'
    resources :tags
  end
end