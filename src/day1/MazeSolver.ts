const directions = [
    [0, 1], // up
    [1, 0], // right
    [0, -1], // down
    [-1, 0], // left
];

function walk( maze: string[], wall: string, curr: Point,
                    goal: Point, visited: boolean[][], path: Point[]): boolean {
    if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length)
        return false;

    if (maze[curr.y][curr.x] === wall) return false;
    if (visited[curr.y][curr.x]) return false;

    if (curr.x === goal.x && curr.y == goal.y){
        path.push(curr);
        return true;
    }

    visited[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < directions.length; i++) {
        const next = {
            x: curr.x + directions[i][0],
            y: curr.y + directions[i][1],
        };
        if(walk(maze, wall, next, goal, visited, path))
            return true;
    }

    path.pop();
    
    return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point,): Point[] {
    const visited: boolean[][] = [];
    const path: Point[] = [];

    for(let i = 0; i < maze.length; i++)
        visited.push( new Array(maze[0].length ).fill(false))

    walk(maze, wall, start, end, visited, path);
    
    return path;
}
