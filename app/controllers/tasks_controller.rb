class TasksController < ApplicationController
    before_action :set_task
    skip_before_action :set_task, only: [:index, :new, :create, :destroy_all]

    def index
        @tasks = Task.all
        respond_to do |format|
            format.html
            format.json { render json: @tasks, status: :ok }
        end
    end

    def show
        @comment = @task.comments.build
        # @task = @task.attributes.merge( { comments: @task.comments } )
        # respond_to do |format|
        #     format.html
        #     format.json { render json: @task, include: [:comments], status: :ok } 
        # end
    end

    def new
        @task = Task.new
    end

    def create
        @task = Task.new(task_params)
        if @task.save
            redirect_to @task
        else
            render :new, status: :unprocessable_entity
        end
    end

    def edit 
    end

    def update
        if @task.update(task_params)
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
        @tasks = Task.all
        @tasks.destroy_all
        redirect_to root_path, status: :see_other
    end

    private

    def set_task
        @task = Task.find(params[:id])
    end

    def task_params
        params.require(:task).permit(:title, :body, :commenter, :comment)
    end
end