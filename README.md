# Word Hunt Solver

A web-based solver for GamePigeon's popular iMessage game Word Hunt.

# What is Word Hunt?

Word Hunt is a word game similar to Boggle where two players must drag their fingers across a 4x4 letter board and score the most points in 80 seconds by finding words. The longer the word, the more points the player will receive. The player with the most points at the end of the game wins.

# How the Solver Works

The solver implements a recursive backtracking algorithm with a Trie data structure and a depth-first search algorithm (DFS) to find all possible words for a given board. Combinations are checked against a large dictionary to verify a word.

# How to Use

Enter the board from your game [here](https://word-hunt-solver.onrender.com/).

![solver demo](https://github.com/tonydnh/word-hunt-solver/assets/88163609/80ca569a-50e8-4a1c-b430-6c543b7e22a7)

# Tech Stack

Frontend:
- React
- Vite

Backend:
- Flask

The frontend and backend are deployed on [Render](https://render.com/).

# Challenges

## General

As this is my first fullstack project, I faced numerous challenges that helped me learn a lot. When starting this project, I had only spent about two months learning frontend development using vanilla HTML, CSS and JavaScript. Jumping into React for the first time with a project was challenging, but it helped me learn in ways that no tutorial could. Setting up the API endpoint for the frontend and backend to communicate was another challenge as my knowledge of how the internet works was limited. Lastly, deploying the project was definitely the toughest challenge as I realized I did not know as much as I thought I did. I spent hours learning about static sites vs dynamic sites and setting up my API for deployment along with how to use PaaS's.

## The Solver

I wrote the solver back in March 2024 using Python as a small side project after learning about recursive backtracking in my data structures class. The first iteration of the algorithm was slow as it checked every single (valid) possible combination in a 4x4 board, leading to ***1,626,160 recursive calls*** for each solve. The solver took around 2-3 seconds to run on my local machine but took around ***23 seconds*** to run on the deployed site, which is too slow for users.

# How I Solved the Problem With the Solver

The problem with the solver was that it kept searching for combinations when there were no words in the dictionary that started with the current combination. This meant the solver continued searching when it had already hit a dead end. After doing research and using my knowledge of what I learned later in my data structures class, I decided that using a Trie data structure was the best approach to solve this problem. 

A trie is a tree data structure that stores nodes containing characters and lists of its children. When you walk a trie, you can spell out a word and each node has a property that tells you if a word ends at that node. Using a trie would solve my problem as I could check if the current combination was a dead end before making further recursive calls. I wrote a Node and Trie class from scratch that allowed me to build the trie from the dictionary and check for dead ends using DFS.

Using a trie ended up solving my problem as it reduced the number of recursive calls from ***1,626,160*** to around ***500-6000***, depending on the board. The speed for the solver on the deployed site improved from ***23 seconds*** to ***0.01 seconds***. That's a ***99.5%+*** improvement on both ends.

# What I Learned

After creating this project, I learned how to:
- Create and use an API to communicate across the frontend and backend
- Write React code
- Apply my knowledge of data structures and algorithms to solve a problem
- Deploy a static page and a web service