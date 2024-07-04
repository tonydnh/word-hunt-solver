from flask import Flask, jsonify, request
from flask_cors import CORS
import json, time

app = Flask(__name__)
CORS(app, origins='*')

@app.route('/api/ping', methods=['GET'])
def ping():
    return {"message": "pinged"}

@app.route('/api/board', methods=['POST'])
def process_board():
    json_data = request.data.decode("utf-8")
    print(f"REQUEST: {request}")
    print(f"REQUEST.DATA: {request.data}")
    print(f"JSON_DATA: {json_data}")
    print(f"What I got from frontend: {json_data}")
    board_letters = json.loads(json_data).get("board")

    start = time.time()
    words = run_solver(board_letters)
    end = time.time()
    print(f"*****THE SOLVER TOOK {end - start} SECONDS TO RUN*****")
    words_json = {key: list(value) for key, value in words.items()}

    return jsonify(words_json)

def run_solver(board_letters):
    board = construct_board(board_letters)

    # Key: length of word, Value: set of words with that length
    words_found = {key: set() for key in range(3, 11)}

    # Find all word combinations starting at each letter on the board
    for row in range(len(board)):
        for col in range(len(board[0])):
            find_all_words(board, words_found, set(), "", row, col)

    # Sort the words
    for key in words_found:
        words_found[key] = sorted(words_found[key])

    return words_found

# Use recursive backtracking to find all possible word combinations
def find_all_words(board, words_found, visited_coords, current_word, row, col):
    # Right, down-right, down, down-left, left, up-left, up, up-right
    directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

    current_word += board[row][col]
    visited_coords.add((row, col))

    for direction in directions:
        next_row = row + direction[0]
        next_col = col + direction[1]

        # Only continue searching if next cell is in bounds and not a letter already visited
        # Max length word counted is 10
        if (next_row, next_col) not in visited_coords and in_bounds(board, next_row, next_col) and len(current_word) < 10:
            # Keep searching if there are more possible words from current_word
            if trie.future_path_exists(current_word):
                find_all_words(board, words_found, visited_coords, current_word, next_row, next_col)
    
    # If found a word in the dictionary, save it, but keep going
    if len(current_word) >= 3 and current_word in words:
        words_found[len(current_word)].add(current_word)
    
    visited_coords.remove((row, col))

def in_bounds(board, row, col):
    return row >= 0 and row < len(board) and col >= 0 and col < len(board[0])

def construct_board(board_letters):
    board = []
    lettersIndex = 0

    for row in range(4):
        board_row = []
        for col in range(4):
            board_row.append(board_letters[lettersIndex])
            lettersIndex += 1
        board.append(board_row)

    return board

class Trie:
    def __init__(self):
        self.root = TNode('', False, {})

    def add_word(self, word):
        curr_node = self.root

        for char in word:
            if char not in curr_node.children.keys():
                # Add node if not present
                curr_node.children[char] = TNode(char, False, {})

            # Move pointer to node representing char
            curr_node = curr_node.children[char]

        # Mark the last TNode as a word
        curr_node.is_word = True
        
    def future_path_exists(self, word):
        return self.__future_path_exists_helper(self.root, word, 0)
    
    def __future_path_exists_helper(self, n, word, index):
        curr = n.children.get(word[index])
        if curr is not None:
            if index == len(word) - 1:
                # Are there any furthur nodes beyond this path?
                return len(curr.children) != 0
                
            return self.__future_path_exists_helper(curr, word, index + 1)
        else:
            return False

class TNode:
    def __init__(self, letter, is_word, children):
        self.letter = letter
        self.is_word = is_word
        self.children = children

# Parse the dictionary
with open("dictionary.txt") as word_file:
    words = set(word_file.read().split())

# Construct the trie
trie = Trie()
for word in words:
    trie.add_word(word)

if __name__ == "__main__":
    app.run(port=8080)