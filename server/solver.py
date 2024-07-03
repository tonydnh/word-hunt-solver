from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins='*')

print("TEST I AM HERE")

@app.route('/api/board', methods=['POST'])
def process_board():
    json_data = request.data.decode("utf-8")
    board_letters = json.loads(json_data).get("board")
    print("PROCES_BOARD RAN")
    print(f"What I got from frontend: {json_data}")

    words = run_solver(board_letters)
    words_json = {key: list(value) for key, value in words.items()}

    print(f"Words: {words_json}")

    return jsonify(words_json)

# Parse the dictionary
with open("dictionary.txt") as word_file:
  words = set(word_file.read().split())
  print("PARSING DICTIONARY")

def run_solver(board_letters):
    board = construct_board(board_letters)

    # Key: length of word, Value: set of words with that length
    words_found = {key: set() for key in range(3, 11)}

    # Find all word combinations starting at each letter on the board
    for row in range(len(board)):
        for col in range(len(board[0])):
            find_all_words(board, words_found, words, [], "", row, col)

    # Sort the words
    for key in words_found:
        words_found[key] = sorted(words_found[key])

    return words_found

# Use recursive backtracking to find all possible word combinations
def find_all_words(board, words_found, words, visited_coords, current_word, row, col):
    # Right, down-right, down, down-left, left, up-left, up, up-right
    directions = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

    current_word += board[row][col]
    added_to_visited = False

    for direction in directions:
        if not added_to_visited:
            # Save the coordinates of visited letters in a sub path to not cross over it again
            visited_coords.append([row, col])
            added_to_visited = True

        next_row = row + direction[0]
        next_col = col + direction[1]

        # Only continue searching if next cell is in bounds and not a letter already visited
        # Max length word counted is 10
        if [next_row, next_col] not in visited_coords and in_bounds(board, next_row, next_col) and len(current_word) < 10:
            find_all_words(board, words_found, words, visited_coords, current_word, next_row, next_col)
            visited_coords.remove([next_row, next_col])
            
    # If found a word in the dictionary, save it, but keep going
    if len(current_word) >= 3 and current_word in words:
        words_found[len(current_word)].add(current_word)

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

# if __name__ == "__main__":
#     app.run(port=8080)