from itertools import combinations
import random

# Bộ số thứ nhất
set1 = range(5, 32)
# Bộ số thứ hai
set2 = range(19, 34)

# Tạo danh sách lưu trữ cặp
pairs = []

for num1 in set1:
    random_number = random.randint(1, 4)
    for r in range(1, random_number + 1):
        random_number = random.randint(19, 34)
        pairs.append((num1, random_number))
print(pairs)

sql_commands = []
for pair in pairs:
    print(pair)
    num1 = pair[0]
    num2 = pair[1]
    sql_commands.append("({}, {})".format(num1, num2))

for command in sql_commands:
    print("INSERT INTO posttags (postId, tagId) VALUES {};".format(command))


