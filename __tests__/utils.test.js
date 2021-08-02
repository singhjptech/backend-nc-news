const {
  mapTopic,
  mapUsers,
  mapArticles,
  mapComments,
} = require("../db/utils/data-manipulation");

describe("mapTopic()", () => {
  test("should return an array", () => {
    const input = [];
    const actualOutput = mapTopic(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });
  test("should not mutate the input array ", () => {
    const input = [];
    expect(mapTopic(input)).not.toBe(input);
  });
  test("should return an array with length equal to amoumnt of objects in input array", () => {
    const input = [{ description: "FOOTIE!", slug: "football" }];
    const expectedOutput = [["football", "FOOTIE!"]];
    expect(mapTopic(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(1);
  });
});

describe("mapUsers()", () => {
  test("should return an array", () => {
    const input = [];
    const actualOutput = mapUsers(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });

  test("should not mutate the input array ", () => {
    const input = [];
    expect(mapUsers(input)).not.toBe(input);
  });

  test("should return an array with length equal to amoumnt of objects in input array", () => {
    const input = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      },
    ];
    const expectedOutput = [
      [
        "tickle122",
        "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
        "Tom Tickle",
      ],
    ];
    expect(mapUsers(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(1);
  });

  test("should return an array with length equal to amount of objects in multiple input array", () => {
    const input = [
      {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
      },
      {
        username: "grumpy19",
        name: "Paul Grump",
        avatar_url:
          "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
      },
      {
        username: "happyamy2016",
        name: "Amy Happy",
        avatar_url:
          "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
      },
    ];
    const expectedOutput = [
      [
        "tickle122",
        "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
        "Tom Tickle",
      ],
      [
        "grumpy19",
        "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
        "Paul Grump",
      ],
      [
        "happyamy2016",
        "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
        "Amy Happy",
      ],
    ];
    expect(mapUsers(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(3);
  });
});

describe("mapArticles()", () => {
  test("should return an array", () => {
    const input = [];
    const actualOutput = mapArticles(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });

  test("should not mutate the input array ", () => {
    const input = [];
    expect(mapArticles(input)).not.toBe(input);
  });

  test("should return an array with length equal to amoumnt of objects in input array", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1604728980000),
        votes: 0,
      },
    ];
    const expectedOutput = [
      [
        "Running a Node App",
        "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        0,
        "coding",
        "jessjelly",
        new Date(1604728980000),
      ],
    ];
    expect(mapArticles(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(1);
  });

  test("should return an array with length equal to amoumnt of objects in input array", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        created_at: new Date(1604728980000),
        votes: 0,
      },
      {
        title:
          "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
        topic: "coding",
        author: "grumpy19",
        body: "Functions are objects in JavaScript, as you should know by now, if you have read any of the prerequisite articles. And as objects, functions have methods, including the powerful Apply, Call, and Bind methods. On the one hand, Apply and Call are nearly identical and are frequently used in JavaScript for borrowing methods and for setting the this value explicitly. We also use Apply for variable-arity functions; you will learn more about this in a bit.",
        created_at: new Date(1605107340000),
        votes: 0,
      },
    ];
    const expectedOutput = [
      [
        "Running a Node App",
        "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        0,
        "coding",
        "jessjelly",
        new Date(1604728980000),
      ],
      [
        "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
        "Functions are objects in JavaScript, as you should know by now, if you have read any of the prerequisite articles. And as objects, functions have methods, including the powerful Apply, Call, and Bind methods. On the one hand, Apply and Call are nearly identical and are frequently used in JavaScript for borrowing methods and for setting the this value explicitly. We also use Apply for variable-arity functions; you will learn more about this in a bit.",
        0,
        "coding",
        "grumpy19",
        new Date(1605107340000),
      ],
    ];
    expect(mapArticles(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(2);
  });
});

describe("mapComments()", () => {
  test("should return an array", () => {
    const input = [];
    const actualOutput = mapComments(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });
  test("should not mutate the input array ", () => {
    const input = [];
    expect(mapComments(input)).not.toBe(input);
  });
  test("should return an array with length equal to amoumnt of objects in input array", () => {
    const input = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1586179020000),
      },
    ];
    const expectedOutput = [
      [
        16,
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      ],
    ];
    expect(mapComments(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(1);
  });
});
