// Shared by the Classes cards (page.tsx) and the enquiry form so a card click
// can preselect the matching option.
export const classOptions = [
  {
    value: "private",
    title: "Private class",
    price: "$50",
    cadence: "per hour",
    text: "One-on-one tuition with Nirmal — pace, repertoire, and emphasis tailored to you.",
  },
  {
    value: "shared",
    title: "Shared class · 2 students",
    price: "$35",
    cadence: "per person, per hour ($70 for the pair)",
    text: "Please find a friend or partner to share with. If only one person attends, private class fees apply.",
  },
  {
    value: "group",
    title: "Group class · minimum 3",
    price: "$30",
    cadence: "per person, per hour",
    text: "Up to 4 students at Chifley, 6 at Hazelbrook. If only one attends, private fees apply; if two, shared fees; three or more remains $30 each.",
  },
  {
    value: "join-group",
    title: "Join a group",
    price: "$30",
    cadence: "per person, per hour",
    text: "Don't have people to come with you? We can place you in a group that has spots open.",
  },
] as const;

export type ClassOptionValue = (typeof classOptions)[number]["value"];

export const classOptionValues = classOptions.map((o) => o.value) as [
  ClassOptionValue,
  ...ClassOptionValue[],
];

// Fired by a class card; the enquiry form listens and preselects the option.
export const SELECT_CLASS_EVENT = "odissi:select-class";
