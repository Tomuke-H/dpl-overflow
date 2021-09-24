class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
      
        before_action :configure_permitted_parameters, if: :devise_controller?

        protected

        def configure_permitted_parameters
                update_attrs = [:name, :password]
                added_attrs = [:name, :email, :password]
                devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
                devise_parameter_sanitizer.permit :account_update, keys: update_attrs
        end
end
