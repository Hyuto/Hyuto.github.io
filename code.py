from random import randint
while True:
    x = randint(100000, 999999)
    if x % 1737 == 0 : break
print('Random value is',x)
