class TasksController < ApplicationController
  before_action :set_task, :set_team
  skip_before_action :set_task, only: %i[index new create destroy_all finished]

  def index
    @tasks = @team.tasks.where status: :ongoing

    @tasks = @tasks.map do |task|
      task.attributes.merge author_name: task.author_name, comments: task.comments
    end

    respond_to do |format|
      format.html
      format.json { render json: @tasks, status: :ok }
    end
  end

  def finished
    destroy_finished = params[:finished]

    @team.tasks.where(status: :finished).delete_all if destroy_finished

    @tasks = @team.tasks.where status: :finished

    @tasks = @tasks.map do |task|
      task.attributes.merge author_name: task.author_name, comments: task.comments
    end

    respond_to do |format|
      format.html
      format.json { render json: @tasks, status: :ok }
    end
  end

  def show
    @comment = @task.comments.build
  end

  def new
    @task = @team.tasks.build
  end

  def create
    @task = @team.tasks.new task_params

    if @team.save
      redirect_to team_tasks_path
    else
      pp @task.errors
      render :new, status: :unprocessable_entity
    end
  end

  def update
    status = params[:task][:status]
    if status.present?
      @task.status = status
      @task.save!
    elsif @task.update(task_params)
      redirect_to team_task_path @task
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    redirect_to root_path, status: :see_other
  end

  def destroy_all
    @team.tasks.each do |task|
      task.comments.delete_all
    end

    @team.tasks.where(status: :ongoing).delete_all
    redirect_to root_path, status: :see_other
  end

  private

  def current_user
    session[:user_id]
  end

  def set_task
    @task = Task.find_by id: params[:id]
  end

  def set_team
    @team = Team.find params[:team_id]
    session[:current_team_id] = @team.id
  end

  def task_params
    params.require(:task).permit(:title, :body, :comment, :status,
                                 :user_id).with_defaults(user_id: session[:user_id])
  end
end
