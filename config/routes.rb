Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    get 'things', to: 'things#index'
    resources :users 
    resources :tags
    resources :answers
    resources :questions
    get 'questions/find_question_by_tag/:tag_name', to:'questions#find_question_by_tag'
    get 'questionTags', to:'question_tags#index'
    post 'questionTags', to:'question_tags#create'
    delete 'questionTags/:id', to:'question_tags#destroy'
    resources :comments
  end
  
end
