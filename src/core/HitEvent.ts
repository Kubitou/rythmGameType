export type HitEvent = 
| {
    type: "perfect";
    noteId: number    
}
| {
    type: "good";
    noteId: number;
}
| {
    type: "bad";
    noteId: number;
}
| {
    type: "miss";
    noteId: number;
}
| {
    type: "roll-hit";
    noteId: number;
}