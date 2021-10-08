class Api::QuestionTagsController < ApplicationController
  before_action :set_question_tag_by_QT_ID, only: [:destroy]

def index
  render json: QuestionTag.all
end

def create
  questionTag = QuestionTag.create(questionTag_params)
  if questionTag.save
    render json: questionTag
  else
    render json: {errors: questionTag.errors}, status: 422
  end
end

def find_tags_for_question
  render json: QuestionTag.find_tags_for_question(params[:question_id])
end

def destroy
  @questionTag.destroy
end

private

def questionTag_params
  params.require(:question_tag).permit(:tag_id, :question_id)
end

def set_question_tag_by_QT_ID
  @questionTag = QuestionTag.find(params[:id])
end


end
