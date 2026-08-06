export const GRID_W = 24;
export const GRID_H = 14;

export interface Point {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

export interface SnakeState {
  snake: Point[];
  dir: Direction;
  queuedDir: Direction | null;
  food: Point;
  alive: boolean;
}

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const DELTA: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

// One hardcoded pellet position per tour stop, spread so the path
// sweeps the whole arena
export const FOOD_POSITIONS: Point[] = [
  { x: 18, y: 3 },
  { x: 4, y: 10 },
  { x: 20, y: 11 },
  { x: 6, y: 2 },
  { x: 12, y: 7 },
  { x: 21, y: 6 },
];

export function initialState(foodIndex: number): SnakeState {
  return {
    snake: [
      { x: 8, y: 7 },
      { x: 7, y: 7 },
      { x: 6, y: 7 },
    ],
    dir: "right",
    queuedDir: null,
    food: FOOD_POSITIONS[foodIndex % FOOD_POSITIONS.length],
    alive: true,
  };
}

export function turn(state: SnakeState, next: Direction): SnakeState {
  if (next === state.dir || next === OPPOSITE[state.dir]) {
    return state;
  }
  return { ...state, queuedDir: next };
}

export interface StepResult {
  state: SnakeState;
  ate: boolean;
}

export function step(state: SnakeState): StepResult {
  if (!state.alive) {
    return { state, ate: false };
  }

  const dir = state.queuedDir ?? state.dir;
  const delta = DELTA[dir];
  const head = state.snake[0];
  const nextHead: Point = {
    x: (head.x + delta.x + GRID_W) % GRID_W,
    y: (head.y + delta.y + GRID_H) % GRID_H,
  };

  const ate = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const body = ate ? state.snake : state.snake.slice(0, -1);

  const hitSelf = body.some((cell) => cell.x === nextHead.x && cell.y === nextHead.y);
  if (hitSelf) {
    return { state: { ...state, dir, queuedDir: null, alive: false }, ate: false };
  }

  return {
    state: {
      ...state,
      snake: [nextHead, ...body],
      dir,
      queuedDir: null,
    },
    ate,
  };
}

export function withFood(state: SnakeState, foodIndex: number): SnakeState {
  return { ...state, food: FOOD_POSITIONS[foodIndex % FOOD_POSITIONS.length] };
}
