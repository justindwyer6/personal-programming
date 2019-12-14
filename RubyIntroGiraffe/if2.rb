def max(num1, num2, num3)
    list = [num1, num2, num3]
    if list[-1] > list[0] and list[-1] > list[1]
        puts "#{num3} is the biggest number."
    else
        puts "#{num3} is not the biggest number."
    end
end

max(5, 9, 8)


def maxy(num1, num2, num3)
    if num1 >= num2 and num1 >= num3
        return num1
    elsif num2 >= num1 and num2 >=num3
        return num2
    else
        return num3
    end
end

puts maxy(554, 84, 446)
