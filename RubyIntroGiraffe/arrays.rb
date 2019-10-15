friends = Array["Steve", "Bill", "Phyllis", nil, nil, nil, "Arizona"]
friends[1] = "Joe"
friends[4] = "Oprah"

puts friends.compact.sort
