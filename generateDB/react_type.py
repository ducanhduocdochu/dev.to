import itertools
import random

# Given sets
setPost = range(3, 30)
setUser = [
    "clx2lff6m0000iwdmtb1039mt", 
    "fe3da95a-23a5-11ef-a717-005056c00001", 
    "fe3e31a4-23a5-11ef-a717-005056c00001",
    "fe3ed162-23a5-11ef-a717-005056c00001",
    "fe3f39e0-23a5-11ef-a717-005056c00001",
    "fe3fc615-23a5-11ef-a717-005056c00001"
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
