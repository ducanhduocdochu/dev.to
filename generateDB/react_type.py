import itertools
import random

# Given sets
setPost = range(1, 28)
setUser = [
    "66a1d9e2-259d-11ef-9d6d-0242ac1103eb", 
    "66c0ea40-259d-11ef-9d6d-0242ac1103eb", 
    "66e032b5-259d-11ef-9d6d-0242ac1103eb", 
    "66ff45fa-259d-11ef-9d6d-0242ac1103eb", 
    "671f8223-259d-11ef-9d6d-0242ac1103eb", 
]
setReaction = [1, 2, 3, 4, 5]

reaction = []

for a in setPost:
    for b in setUser:
        c = random.randint(1,5)
        reaction.append([a, b, c])


sql_statements = []
for combo in reaction:
    postId, userId, reactTypeId = combo[0], combo[1], combo[2]
    sql = f'INSERT INTO reaction (postId, userId, reactTypeId) VALUES ({postId}, "{userId}", {reactTypeId});'
    sql_statements.append(sql)

for statement in sql_statements:
    print(statement)
