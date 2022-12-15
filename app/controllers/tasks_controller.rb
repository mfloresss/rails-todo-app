class TasksController < ApplicationController
  before_action :set_task
  skip_before_action :set_task, only: %i[index new create destroy_all finished]

  def index
    @tasks = Task.where user: current_user, status: :ongoing

    respond_to do |format|
      format.html
      format.json { render json: @tasks, status: :ok }
    end
  end

  def finished
    destroy_finished = params[:finished]

    Task.where(user: current_user, status: :finished).delete_all if destroy_finished

    @tasks = Task.where user: current_user, status: :finished
    respond_to do |format|
      format.html
      format.json { render json: @tasks, status: :ok }
    end
  end

  def show
    @comment = @task.comments.build
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to @task
    else
      pp @task.errors
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    status = params[:task][:status]
    if status.present?
      @task.status = status
      @task.save!
    elsif @task.update(task_params)
      redirect_to @task
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    redirect_to root_path, status: :see_other
  end

  def destroy_all
    Task.where(status: :ongoing).delete_all
    redirect_to root_path, status: :see_other
  end

  private

  def current_user
    session[:user_id]
  end

  def set_task
    @task = Task.find_by id: params[:id], user: current_user
  end

  def task_params
    params.require(:task).permit(:title, :body, :comment, :status,
                                 :user_id).with_defaults(user_id: session[:user_id])
  end
end
