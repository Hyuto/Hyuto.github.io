import random as rd
while True:
  random = rd.randint(100000, 999999)
  if random % 1113 == 0: break
print('Random value is ', random)
