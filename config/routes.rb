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
    get 'follow', to:'questions#follow'
    put 'add_view/:id', to:'questions#add_view'
    get 'leaderboard', to: 'users#leaderboard'
    get 'cohort_leaderboard', to: 'users#cohort_leaderboard'
    get 'cohort_yearbook', to: 'users#cohort_yearbook'
    put 'users/image/update', to: 'users#update_image'
    put 'follow', to: 'users#follow'
    put 'likeanswer', to: 'users#like_answer'
    put 'likequestion', to: 'users#like_question'
    put 'downvoteanswer', to: 'users#downvote_answer'
    put 'downvotequestion', to: 'users#downvote_question'
    get 'users_profile/:id', to: 'users#user_profile'
    get 'user_questions/:id', to: 'users#user_questions'
    get 'user_answers/:id', to: 'users#user_answers'
    get 'answer_count/:id', to: 'questions#answer_count'
    get 'tag/:key', to: 'tags#tag_search'
    get 'question_author/:id', to: 'questions#author'
    get 'answer_author/:id', to: 'answers#author'
    get 'comment_author/:id', to: 'comments#author'
    get 'qcomment_author/:id', to: 'qcomments#author'
    get 'user_has_questions/:id', to: 'users#user_has_questions'
    get 'questions/:id/users', to: 'questions#users'
    get 'questions/:id/upvotes', to: 'questions#upvotes'
    get 'questions/:id/downvotes', to: 'questions#downvotes'
    get 'answers/:id/users', to: 'answers#users'
    get 'answers/:id/upvotes', to: 'answers#upvotes'
    get 'answers/:id/downvotes', to: 'answers#downvotes'
    get 'qvotes/:vote_code', to: 'qvotes#my_vote'
    get 'avotes/:vote_code', to: 'avotes#my_vote'
    post 'qvotes/', to: 'qvotes#create'
    put 'qvotes/:id', to: 'qvotes#update'
    delete 'qvotes/:id', to: 'qvotes#destroy'
    post 'avotes/', to: 'avotes#create'
    put 'avotes/:id', to: 'avotes#update'
    delete 'avotes/:id', to: 'avotes#destroy'
    resources :tags
  end

  get '*other', to: 'static#index'
end