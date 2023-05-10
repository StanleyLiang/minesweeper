# Live demo

![截圖 2023-05-10 上午9 27 47](https://github.com/StanleyLiang/minesweeper/assets/106784615/90e00f51-b8b0-47de-97aa-7794b9bba84a)

https://main--aquamarine-meerkat-deb7b6.netlify.app/

# Getting Started with minesweeper

For Development, clone this repo and run the following commands to start:

```bash
npm install
npm start
```

# Original requirement

## Question 1: Minesweeper

Implement the classic Windows game Minesweeper.
The game has the following rules:

1. Clicking a mine ends the game.
2. Clicking a square with an adjacent mine clears that square and shows the number of mines touching it.
3. Clicking a square with no adjacent mine clears that square and clicks all adjacent squares.
4. The first click will never be a mine, it will clear the map and place numbers on the grid.
5. The numbers reflect the number of mines touching a square.
6. Right clicking on a square puts a flag on it. The flagged square can’t be opened by a click.
7. If the number in a square is equal to the number of squares touching that square that are flagged, double clicking on the number opens up all remaining squares around the number. (Note: this won’t work on touch screen devices)

Your submission will be evaluated for:

- Functionality: does it run and meet the basic rules.
- Code quality: is your code readable, maintainable, and extendable.
- Styling: CSS and minimal UI/UX design.
- Additionally, you may further consider the following functionalities:
- Game control: Start and Reset.
- Game status: Timer and mine count.

# Design

## UI

- game board
  - dimension: 9 x 9, which means there are 81 squares in the game board.
  - width 400px
  - RWD support
- sqaure: units to compose the game board
  - isFlag: 🚩
  - isOpen && isMine: 💣
  - isOpen && count > 0: colorful count number
  - blank if none of above are fulfilled.

## react components

- App
  - data container
  - handle event callback from `Square` and `Controller`
  - board calculating helpers are encapsulated into `utils`
- Square
  - based on the component props to render a single square
- Controller
  - display message, e.g "game over"
  - buttons, e.g "Restart"

## data structure

square: object

```javascript
{
  isOpen: false, // revealed square
  isMine: false, // square where a mine is placed
  isFlag: false, // square flagged by player
  count: 0, // mines existing in the adjacent squares
}
```

board: two dimension array with squares

```javascript
[
  [
    {
      isOpen: false,
      isMine: false,
      isFlag: false,
      count: 0,
    },
    {
      isOpen: false,
      isMine: false,
      isFlag: false,
      count: 0,
    },
  ],
  [
    {
      isOpen: false,
      isMine: false,
      isFlag: false,
      count: 0,
    },
    {
      isOpen: false,
      isMine: false,
      isFlag: false,
      count: 0,
    },
  ],
];
```

# process of thought
I played minesweeper for the very first time from my 15 but I never practially develop a minesweeper game from scratch, cool. 

I start from thinking the behavior of a 3 x 3 (9 squares) game board which is supposred to be the minimun scale of a minesweeper.

By this 3 x 3 game board, the followings are determined:
* how to generate and place mines
  1. generate n random numbers between 0 ~ 8
  2. transform those random numbers into indexes of a 3 x 3 two dimenstion array. For example, mine with number 5 will be placed in array[1][1]. Then mark these index by `isMine = true`
* how to count the number of mines around the central square
  1. check adjacent sqaures the central sqaure where `isMine` is true or not
  2. here I take `[x][y]` as the index of the central square. And the adjacent indexes the central square are: `[x-1][y-1]`, `[x-1][y]`, `[x-1][y+1]`, `[x][y-1]`, `[x][y+1]`, `[x+1][y-1]`, `[x+1][y]` [x+1],[y+1]
  3. so through checking these squares, I can get the mines count of the central square

Then I expand the dimension into my dedicated one: 9 x 9. Then the most difficty problem comes to me: 'Clicking a square with no adjacent mine clears that square and clicks all adjacent squares.'

Originally I guess I may need some cool algorithm from leetcode to conquer this functionaility. After I observed the minesweeper by google, luckly I don't think it's so difficult. The flow is as the following:
1. As a the clicked and opened square is blank square, start to traverse other four squares: top `[x-1][y]`, left `[x][y-1]`, right `[x][y+1]`, bottom `[x+1][y]`.
2. recursively traverse these squares, return until the traversing square is originally opend or count > 0

Then it just working, AWESOME!!!

Becuase the successful case is not specified in the requirement, so I didn't implement it yet.
