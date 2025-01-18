export const mockOverviewData = {
  candidate: "John Doe",
  strengths: [
    "Good communication skills",
    "Strong technical knowledge",
    "Team player",
    "Adaptable to changes",
  ],
  weaknesses: [
    "Needs improvement in time management",
    "Lacks experience in project management",
    "Struggles with conflict resolution",
  ],
  decision: "Strong Approve",
  scores: [
    {
      question: "REST vs GraphQL",
      priority: "Critical",
      level: "Senior",
      score: 8,
    },
    {
      question: "Linked List Implementation",
      priority: "High",
      level: "Staff",
      score: 9,
    },
    {
      question: "Database Design",
      priority: "Standard",
      level: "Junior",
      score: 7,
    },
    {
      question: "Algorithm Optimization",
      priority: "Critical",
      level: "Staff",
      score: 10,
    },
    {
      question: "System Design Basics",
      priority: "Standard",
      level: "Senior",
      score: 6,
    },
  ],
  traits: [
    { trait: "Communication", type: "binary", value: 1 },
    { trait: "Problem-Solving", type: "spectrum", value: 8 },
    { trait: "Teamwork", type: "spectrum", value: 6 },
    { trait: "Adaptability", type: "spectrum", value: 9 },
    { trait: "Conflict Management", type: "spectrum", value: 5 },
  ],
  decisionDistribution: [
    { name: "Strong Approve", value: 40 },
    { name: "Approve", value: 30 },
    { name: "Undecided", value: 15 },
    { name: "Disapprove", value: 10 },
    { name: "Strong Disapprove", value: 5 },
  ],
};
