# puts "Are you male? (true|false)"
# ismale = gets.chomp
# puts "Are you tall? (true|false)"
# istall = gets.chomp

ismale = false
istall = false

if ismale and istall
    puts "You are a tall male."
elsif ismale and !istall
    puts "You are a male and not tall."
elsif !ismale and istall
    puts "You are a tall not-male."
else
    puts "You are neither male nor tall."
end
