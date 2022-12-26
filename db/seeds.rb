users = [
  { name: 'Michael', last_name: 'Flores', email: 'micha@gmail.com', password: 'micha1?' },
  { name: 'Pedro', last_name: 'Perez', email: 'pedro@gmail.com', password: 'pedro1?' },
  { name: 'Gonzalo', last_name: 'Rodriguez', email: 'gonza@gmail.com', password: 'gonza1?' }
]

tasks = [
  { title: 'Go to the toilet' },
  { title: 'Take wather' }
]

counts = {
  users_created: 0,
  teams_created: 0,
  tasks_created: 0
}

users.each do |user|
  new_user = User.new(user)

  new_user.save!

  new_team = Team.new(user_id: new_user[:id], name: "#{new_user[:name]}'s Team")

  new_user.teams << new_team

  tasks.each do |task|
    new_team.tasks.new(user: new_user, **task).save!
    counts[:tasks_created] += 1
  end

  counts[:users_created] += 1
  counts[:teams_created] += 1
end

puts 'Counts'
25.times { print '-' }
puts "\n> Users created: #{counts[:users_created]}"
puts "> Teams created: #{counts[:teams_created]}"
puts "> Tasks created: #{counts[:tasks_created]}"
