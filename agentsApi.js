// == Fake API Service ==
/** API service to use to complete the project.*/

export class AgentsApi {
  listAgents() {
    return asFallibleAsyncResponse(AGENTS);
  }
  searchAgents(nameSubstr) {
    return asFallibleAsyncResponse(
      AGENTS.filter(agent => agent.name.includes(nameSubstr))
    );
  }
  getAgent(id) {
    return asFallibleAsyncResponse(AGENTS.find(agent => agent.id === id));
  }
}

// == Helper utilities ==

let currentId = 1;
/** Returns a new unique ID at every invocation. */
function nextId() {
  return currentId++;
}
/** Returns a random number between min and max. */
function randomBetween(min, max) {
  const rand = Math.random();
  const span = max - min;
  return rand * span + min;
}
/** Returns true a random percentage of invocations. */
function randomCondition(percentageTrue) {
  const rand = Math.random();
  return rand < percentageTrue;
}
const MIN_LATENCY_MS = 100;
const MAX_LATENCY_MS = 3000;
const FAILURE_RATE = 0.05; /* 5% API calls fail */
/**
 * Returns the data as a Promise, delayed by a random latency and
 * occasionally failing with an error.
 * */
function asFallibleAsyncResponse(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomCondition(FAILURE_RATE)) {
        reject(new Error("API Error - database unavailable."));
      } else {
        resolve(data);
      }
    }, randomBetween(MIN_LATENCY_MS, MAX_LATENCY_MS));
  });
  return Promise.resolve(data);
}

/** Fake list of agents. */
const AGENTS = [
  {
    id: nextId(),
    name: "CUONG",
    description:
      "A Flouishing and healthy 2nd gen robo with the latest flagship features...",
    tasks: [
      {
        id: "mem_1",
        name: "Blackjack",
        category: "memory",
        score: 94
      },
      {
        id: "mem_2",
        name: "Q-bert",
        category: "memory",
        score: 82
      },
      {
        id: "logic_1",
        name: "Breakout",
        category: "logic",
        score: 80
      },
      {
        id: "logic_2",
        name: "Tetris",
        category: "logic",
        score: 88
      },
      {
        id: "logic_3",
        name: "Basic Math",
        category: "logic",
        score: 64
      },
      {
        id: "planning_1",
        name: "Pacman",
        category: "planning",
        score: 62
      }
    ]
  },
  {
    id: nextId(),
    name: "HIEN",
    description:
      "A gentle, kind, and independent being with deep levels of The Good Place Janet energy.",
    tasks: [
      {
        id: "mem_1",
        name: "Blackjack",
        category: "memory",
        score: 88
      },
      {
        id: "mem_2",
        name: "Q-bert",
        category: "memory",
        score: 82
      },
      {
        id: "logic_1",
        name: "Breakout",
        category: "logic",
        score: 60
      },
      {
        id: "logic_2",
        name: "Tetris",
        category: "logic",
        score: 64
      },
      {
        id: "logic_3",
        name: "Basic Math",
        category: "logic",
        score: 48
      },
      {
        id: "planning_1",
        name: "Pacman",
        category: "planning",
        score: 88
      }
    ]
  },
  {
    id: nextId(),
    name: "NGOC BICH",
    description:
      "Time is precious, and Ngoc can help you recongize weaknesses in your habit system.",
    tasks: [
      {
        id: "mem_1",
        name: "Blackjack",
        category: "memory",
        score: 78
      },
      {
        id: "mem_2",
        name: "Q-bert",
        category: "memory",
        score: 64
      },
      {
        id: "logic_1",
        name: "Breakout",
        category: "logic",
        score: 64
      },
      {
        id: "logic_2",
        name: "Tetris",
        category: "logic",
        score: 86
      },
      {
        id: "logic_3",
        name: "Basic Math",
        category: "logic",
        score: 74
      },
      {
        id: "planning_1",
        name: "Pacman",
        category: "planning",
        score: 98
      }
    ]
  }
];
