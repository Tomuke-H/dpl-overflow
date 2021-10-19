Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users
    resources :questions do
      resources :qcomments
      resources :answers
    end
    resources :answers do
      resources :comments
    end
    get 'questionTags', to:'question_tags#index'
    post 'questionTags', to:'question_tags#create'
    get 'questionTags/:question_id', to:'question_tags#find_tags_for_question'
    get 'tagwithname/:question_id', to:'question_tags#find_tagname_for_question'
    delete 'questionTags/:id', to:'question_tags#destroy'
    get 'find_questions_by_tag/:tag_ids', to:'questions#find_questions_by_tag'
    get 'unanswered_questions', to:'questions#unanswered_questions'
    get 'question_search', to:'questions#search'
    put 'add_view/:id', to:'questions#add_view'
    get 'leaderboard', to: 'users#leaderboard'
    get 'cohort_leaderboard', to: 'users#cohort_leaderboard'
    get 'cohort_yearbook', to: 'users#cohort_yearbook'
    put 'users/image/update', to: 'users#update_image'
    get 'users_profile/:id', to: 'users#user_profile'
    get 'answer_count/:id', to: 'questions#answer_count'
    get 'tag/:key', to: 'tags#tag_search'
    get 'question_author/:id', to: 'questions#author'
    get 'answer_author/:id', to: 'answers#author'
    get 'comment_author/:id', to: 'comments#author'
    get 'qcomment_author/:id', to: 'qcomments#author'
    get 'user_has_questions/:id', to: 'users#user_has_questions'
    resources :tags
  end
end