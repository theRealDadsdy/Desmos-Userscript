# Usage
Go to the link, and run the script (potentially multiple times).
# Programming
It's a programming language, so it has a way to program it. Input your program as a comma seperated list of numbers.
## Specification
For each instruction, when run, if instruction is  
= 1: Clear commands  
= 2: Push data (append to Command the current value of the data/memory list at the data pointer as ASCII values of its digits)  
= 3: Pop data (set the current value of the data list at the data pointer to the output of the evaluated Command)  
= 4: Push counter (append to Command the current value of the instruction counter as ASCII values of its digits)  
= 5: Pop counter (set the current value of the instruction counter to the output of the evaluated Command)  
= 6: Push pointer (append to Command the current value of the data pointer as ASCII values of its digits)  
= 7: Pop pointer (set the current value of the data pointer to the output of the evaluated Command)  
= 8: Output (add the current command output to the displayed output list)  
= 9: Input (pause until an input is given, and append to Command it's digit's ASCII values)  
\> 30: Append instruction to Command  
