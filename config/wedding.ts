/** All invitation details are edited here. 2026 is provisional. */
export const wedding = {
  year: 2026,
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  names: ["Abhilash", "Harsha"],
  monogram: "A & H",
  music: { src: "/music/wedding-soundtrack.mp3" },
  copy: {
    welcome: "Together with our families",
    invitation: "With joyful hearts, we invite you to celebrate our marriage. Join us for three days of colour, music and togetherness as we begin this new chapter.",
    farewell: "We look forward to celebrating with you and sharing the memories we’ll carry into our life together.",
    started: "Our wedding celebration begins",
  },
  optional: {
    blessing: null as string | null,
    familyCopy: null as string | null,
    portraits: null as { src: string; alt: string }[] | null,
  },
  venues: {
    sindewahi: {
      title: "Haldi & Sangeet",
      emblem: "haldi",
      name: "Haldi & Sangeet venue",
      address: null,
      locality: "Sindewahi, Maharashtra",
      directions: "https://maps.app.goo.gl/9a8JMo26DyrvSDoZ8",
    },
    wedding: {
      title: "Wedding",
      emblem: "wedding",
      name: "Jijau Lawn · Datala Rd, Chandrapur MH.",
      address: "Jijau Lawn · Datala Rd, Chandrapur MH.",
      locality: null,
      directions: "https://maps.app.goo.gl/uqsHPUvWJAgitZ7t5",
    },
    reception: {
      title: "Reception",
      emblem: "reception",
      name: "Shrawan Lawn",
      address: "Mul road, Sindewahi, Maharashtra 441222",
      locality: null,
      directions: "https://maps.app.goo.gl/KD9eEKvNETC8Y5VK6",
    },
  },
  events: [
    { id: "haldi", name: "Haldi", month: 12, day: 11, time: "12:00", venue: "sindewahi", line: "An afternoon of turmeric, sunshine and good wishes." },
    { id: "sangeet", name: "Sangeet", month: 12, day: 11, time: "19:30", venue: "sindewahi", line: "An evening of music and dancing together." },
    { id: "wedding", name: "Wedding", month: 12, day: 12, time: "12:07", venue: "wedding", line: "Join us as we take our vows and begin our married life." },
    { id: "reception", name: "Reception", month: 12, day: 13, time: "19:00", venue: "reception", line: "One more evening to celebrate with the people we love." },
  ],
  ceremonyId: "wedding",
} as const;
