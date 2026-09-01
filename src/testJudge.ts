import { NoteManager } from "./engine/NoteManager.js";
import { Judge } from "./engine/Judge.js";
import { TapNote } from "./core/Note.js";

const PERFECT_WINDOW = 0.05;
const GOOD_WINDOW = 0.10;
const BAD_WINDOW = 0.20;

const noteManager = new NoteManager(10, BAD_WINDOW);

const judge = new Judge(
  noteManager,
  PERFECT_WINDOW,
  GOOD_WINDOW,
  BAD_WINDOW,
);

type TestCase = {
  offset: number;
  expected: "perfect" | "good" | "bad";
};

const tests: TestCase[] = [
  { offset: 0.00, expected: "perfect" },
  { offset: 0.04, expected: "perfect" },
  { offset: 0.05, expected: "perfect" },
  { offset: 0.06, expected: "good" },
  { offset: 0.10, expected: "good" },
  { offset: 0.11, expected: "bad" },
  { offset: 0.20, expected: "bad" },
];

let passed = 0;

for (const test of tests) {
  const note = new TapNote(
    10,
    1,
    "DON",
    "small",
  );

  noteManager.load([note]);
  noteManager.update(10);

  const result = judge.tryHit(
    10 + test.offset,
    "DON",
  );

  const success = result === test.expected;

  if (success) {
    console.log(
      `PASS  +${test.offset.toFixed(2)} → ${result}`,
    );
    passed++;
  } else {
    console.error(
      `FAIL  +${test.offset.toFixed(2)} → esperado: ${test.expected}, recebido: ${result}`,
    );
  }

  noteManager.resetNoteManager();
  judge.resetJudge();
}

console.log("");
console.log(`Resultado: ${passed}/${tests.length} testes passaram.`);

if (passed === tests.length) {
  console.log("✓ Judge funcionando corretamente.");
} else {
  console.error("✗ Existem falhas no Judge.");
}