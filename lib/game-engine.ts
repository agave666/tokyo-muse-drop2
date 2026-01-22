export type TileType = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export interface Tile {
  type: TileType;
  id: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  grid: Tile[][];
  score: number;
  moves: number;
  targetScore: number;
  isGameOver: boolean;
  isVictory: boolean;
}

let tileIdCounter = 0;

export class Match3Engine {
  private grid: Tile[][];
  private size: number;
  private numTypes: number;

  constructor(size: number = 8, numTypes: number = 5) {
    this.size = size;
    this.numTypes = numTypes;
    this.grid = this.generateGrid();
  }

  private generateGrid(): Tile[][] {
    const grid: Tile[][] = [];
    
    // Generate random grid without initial matches
    for (let row = 0; row < this.size; row++) {
      grid[row] = [];
      for (let col = 0; col < this.size; col++) {
        let type: TileType;
        let attempts = 0;
        
        do {
          type = Math.floor(Math.random() * this.numTypes) as TileType;
          attempts++;
        } while (attempts < 10 && this.wouldCreateMatch(grid, row, col, type));
        
        grid[row][col] = { type, id: tileIdCounter++ };
      }
    }
    
    return grid;
  }

  private wouldCreateMatch(grid: Tile[][], row: number, col: number, type: TileType): boolean {
    // Check horizontal
    if (col >= 2 && 
        grid[row][col - 1]?.type === type && 
        grid[row][col - 2]?.type === type) {
      return true;
    }
    
    // Check vertical
    if (row >= 2 && 
        grid[row - 1]?.[col]?.type === type && 
        grid[row - 2]?.[col]?.type === type) {
      return true;
    }
    
    return false;
  }

  getGrid(): Tile[][] {
    return this.grid;
  }

  isValidSwap(pos1: Position, pos2: Position): boolean {
    // Check if adjacent
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);
    
    if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
      return false;
    }
    
    // Check bounds
    if (pos1.row < 0 || pos1.row >= this.size || pos1.col < 0 || pos1.col >= this.size ||
        pos2.row < 0 || pos2.row >= this.size || pos2.col < 0 || pos2.col >= this.size) {
      return false;
    }
    
    return true;
  }

  swap(pos1: Position, pos2: Position): boolean {
    if (!this.isValidSwap(pos1, pos2)) {
      return false;
    }

    // Perform swap
    const temp = this.grid[pos1.row][pos1.col];
    this.grid[pos1.row][pos1.col] = this.grid[pos2.row][pos2.col];
    this.grid[pos2.row][pos2.col] = temp;

    // Check if swap creates matches
    const matches = this.findMatches();
    
    if (matches.length === 0) {
      // Swap back if no matches
      this.grid[pos2.row][pos2.col] = this.grid[pos1.row][pos1.col];
      this.grid[pos1.row][pos1.col] = temp;
      return false;
    }

    return true;
  }

  findMatches(): Position[] {
    const matches = new Set<string>();

    // Find horizontal matches
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size - 2; col++) {
        const type = this.grid[row][col].type;
        if (this.grid[row][col + 1].type === type && 
            this.grid[row][col + 2].type === type) {
          matches.add(`${row},${col}`);
          matches.add(`${row},${col + 1}`);
          matches.add(`${row},${col + 2}`);
          
          // Check for longer matches
          let k = col + 3;
          while (k < this.size && this.grid[row][k].type === type) {
            matches.add(`${row},${k}`);
            k++;
          }
        }
      }
    }

    // Find vertical matches
    for (let col = 0; col < this.size; col++) {
      for (let row = 0; row < this.size - 2; row++) {
        const type = this.grid[row][col].type;
        if (this.grid[row + 1][col].type === type && 
            this.grid[row + 2][col].type === type) {
          matches.add(`${row},${col}`);
          matches.add(`${row + 1},${col}`);
          matches.add(`${row + 2},${col}`);
          
          // Check for longer matches
          let k = row + 3;
          while (k < this.size && this.grid[k][col].type === type) {
            matches.add(`${k},${col}`);
            k++;
          }
        }
      }
    }

    return Array.from(matches).map(pos => {
      const [row, col] = pos.split(',').map(Number);
      return { row, col };
    });
  }

  clearMatches(matches: Position[]): number {
    let score = 0;
    
    for (const pos of matches) {
      this.grid[pos.row][pos.col] = { type: -1, id: -1 };
      score += 10;
    }

    // Bonus for larger matches
    if (matches.length > 3) {
      score += (matches.length - 3) * 5;
    }

    return score;
  }

  dropTiles(): void {
    for (let col = 0; col < this.size; col++) {
      let writeRow = this.size - 1;
      
      // Collect non-empty tiles from bottom to top
      for (let row = this.size - 1; row >= 0; row--) {
        if (this.grid[row][col].type !== -1) {
          if (row !== writeRow) {
            this.grid[writeRow][col] = this.grid[row][col];
            this.grid[row][col] = { type: -1, id: -1 };
          }
          writeRow--;
        }
      }
      
      // Fill empty spaces at top
      for (let row = writeRow; row >= 0; row--) {
        this.grid[row][col] = {
          type: Math.floor(Math.random() * this.numTypes) as TileType,
          id: tileIdCounter++
        };
      }
    }
  }

  processMatches(): number {
    let totalScore = 0;
    let matches = this.findMatches();
    
    while (matches.length > 0) {
      totalScore += this.clearMatches(matches);
      this.dropTiles();
      matches = this.findMatches();
    }
    
    return totalScore;
  }

  hasValidMoves(): boolean {
    // Check if any swap would create matches
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        // Try swapping with right neighbor
        if (col < this.size - 1) {
          const temp = this.grid[row][col];
          this.grid[row][col] = this.grid[row][col + 1];
          this.grid[row][col + 1] = temp;
          
          const hasMatch = this.findMatches().length > 0;
          
          // Swap back
          this.grid[row][col + 1] = this.grid[row][col];
          this.grid[row][col] = temp;
          
          if (hasMatch) return true;
        }
        
        // Try swapping with bottom neighbor
        if (row < this.size - 1) {
          const temp = this.grid[row][col];
          this.grid[row][col] = this.grid[row + 1][col];
          this.grid[row + 1][col] = temp;
          
          const hasMatch = this.findMatches().length > 0;
          
          // Swap back
          this.grid[row + 1][col] = this.grid[row][col];
          this.grid[row][col] = temp;
          
          if (hasMatch) return true;
        }
      }
    }
    
    return false;
  }
}
