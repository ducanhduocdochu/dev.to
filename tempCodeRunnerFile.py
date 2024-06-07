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

# Generate all possible combinations
all_combinations = list(itertools.product(setPost, setUser, setReaction))

# Shuffle the combinations to get a random order
random.shuffle(all_combinations)

# Select a subset of the combinations
# Here, for example, let's select 20 combinations
subset_combinations = all_combinations[:20]

# Print the selected combinations
for combo in subset_combinations:
    print(combo)
