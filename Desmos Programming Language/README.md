# Usage
Go to the link, and run the script (potentially multiple times).
# Programming
It's a programming language, so it has a way to program it. Input your program as a comma seperated list of numbers.
## Specification
All lists use one-based indexing  
Command is a list of numbers (starting out empty) that are parsed as ASCII values when evaluated as LaTeX by Desmos  
Data is an infinite list of values, starting at all 0s  
Instructions are each a value  
The data pointer and instruction counter are single values that point respectively to which data value is used and which instruction is next run, and each start at 1  
For each instruction, when run, if instruction is  
= 1: empty/E (Set Command blank)  
= 2: push data/D (append to Command the current value of Data at the data pointer as ASCII values of its digits)  
= 3: pop data/S (set the value of Data at the data pointer to the output of the evaluated Command)  
= 4: push counter/C (append to Command the current value of the instruction counter as ASCII values of its digits)  
= 5: pop counter/J (set the value of the instruction counter to the output of the evaluated Command)  
= 6: push pointer/P (append to Command the current value of the data pointer as ASCII values of its digits)  
= 7: pop pointer/M (set the value of the data pointer to the output of the evaluated Command)  
= 8: output/O (add the output of the evaluated Command output to the displayed output list)  
= 9: input/I (pause until an input is given, and append to Command it's digit's ASCII values)  
= 10: to/T (set the _to_ value to the current instruction pointer plus one)  
= 11: go/G (set the instruction pointer to the _to_ value)  
= 12: at/A (set the _to_ value to the output of the evaluated Command)  
\> 30: Append instruction to Command  
## More info about Command
Command is translated into ascii characters and interpreted as a LaTeX math expression. (it is recomended, however to use ( instead of \right(, and same for ), [, ], {, and }.)
Any unmatched parenthisis will have their opposites added to the other side of the expression. Currently the same is not true for braces.
