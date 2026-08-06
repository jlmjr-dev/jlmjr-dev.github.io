export interface Point {
  x: number;
  y: number;
}

export interface Grid {
  w: number;
  h: number;
}

export type Direction = "up" | "down" | "left" | "right";

export interface SnakeState {
  snake: Point[];
  dir: Direction;
  queuedDir: Direction | null;
  grow: number;
  alive: boolean;
}

export const GROWTH_PER_MEAL = 3;

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

export function initialState(start: Point, dir: Direction): SnakeState {
  const away = DELTA[OPPOSITE[dir]];
  return {
    snake: [
      start,
      { x: start.x + away.x, y: start.y + away.y },
      { x: start.x + away.x * 2, y: start.y + away.y * 2 },
    ],
    dir,
    queuedDir: null,
    grow: 0,
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

export function step(state: SnakeState, grid: Grid, target: Point | null): StepResult {
  if (!state.alive) {
    return { state, ate: false };
  }

  const dir = state.queuedDir ?? state.dir;
  const delta = DELTA[dir];
  const head = state.snake[0];
  const nextHead: Point = {
    x: (head.x + delta.x + grid.w) % grid.w,
    y: (head.y + delta.y + grid.h) % grid.h,
  };

  const ate = target !== null && nextHead.x === target.x && nextHead.y === target.y;
  const keepTail = state.grow > 0;
  const body = keepTail ? state.snake : state.snake.slice(0, -1);

  const hitSelf = body.some((cell) => cell.x === nextHead.x && cell.y === nextHead.y);
  if (hitSelf) {
    return { state: { ...state, dir, queuedDir: null, alive: false }, ate: false };
  }

  return {
    state: {
      snake: [nextHead, ...body],
      dir,
      queuedDir: null,
      grow: Math.max(0, state.grow - (keepTail ? 1 : 0)) + (ate ? GROWTH_PER_MEAL : 0),
      alive: true,
    },
    ate,
  };
}
