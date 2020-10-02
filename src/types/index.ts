/**
 * Represents the value of a cell
 * @export
 * @enum {number}
 */
export enum CellValue {
  None,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Bomb,
}

/**
 * Represents the state of a cell
 * @export
 * @enum {number}
 */
export enum CellState {
  Open,
  Visible,
  Flagged,
}

/**
 * Represents difference faces used throughout game
 * @export
 * @enum {number}
 */
export enum Face {
  Smile = "🙂",
  Oh = "😟",
  Lost = "💀",
  Won = "😎",
}

export type Cell = { value: CellValue; state: CellState };
