class CommentsController < ApplicationController
  before_action :set_task

  def index; end

  def create
    @comment = @task.comments.new(comment_params)

    if @comment.save
      redirect_to team_task_path id: @task.id
    else
      render template: 'tasks/show'
    end
  end

  def delete
    @comment = @task.comments.find(params[:id])
    @comment.destroy!
    redirect_to task_path(@task)
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end

  def comment_params
    params.require(:comment).permit(:body, :user_id).with_defaults(user_id: session[:user_id])
  end
end
