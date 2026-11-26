# Tic-Tac-Toe — simple React version

In WebStorm, right-click `index.html` and choose **Open in Browser**.
Use the WebStorm localhost URL, rather than opening the file with a file:// URL.
An internet connection is needed to load React and Babel. No npm installation
or build command is needed. This browser-based setup is for learning.

## Branches

- `main`: your original vanilla JavaScript structure, extended to n × n.
- `react-refactor`: this simple React version, also supporting 3 × 3, 4 × 4, and 5 × 5.

## The three game files

- `index.html`: loads the libraries and provides an empty root div.
- `app.jsx`: the game rules, two components, state, and click handlers.
- `styles.css`: your existing design, with small changes for React's root and buttons.

## How a turn works

1. The player clicks a Square; its onClick calls handleCellClick with its index.
2. The handler ignores occupied cells and finished games.
3. It copies board with slice, puts X or O in the copy, and calls setBoard.
4. checkWin and checkTie examine that new copy. The original board variable
   still belongs to the previous render until React renders again.
5. State setters save the result or the next player's turn. React runs App
   again and updates the displayed squares and message.

## React concepts

- **Component:** a function returning JSX. App is the game; Square is one cell.
- **JSX:** HTML-like markup in JavaScript. className replaces class, htmlFor
  replaces for, and braces insert JavaScript values.
- **State:** values React remembers between renders. Each useState returns
  the current value and a setter, such as board and setBoard.
- **Props:** values App passes to Square: value, number, disabled, and onClick.
- **Events:** onClick and onChange replace addEventListener.
- **key:** the stable cell index helps React identify each square in the list.

## Your existing logic

The winningCombinations arrays, row/column/diagonal loops, and allMatch check
are reused from the vanilla game. checkWin and checkTie now accept a board
argument so they can check the new move before React's next render.

resetGame sets an empty array, X's turn, an active game, and the opening
message. Changing size calls it with the new size; Restart keeps the old size.

This setup follows the simple HTML example linked from:
https://react.dev/learn/installation
