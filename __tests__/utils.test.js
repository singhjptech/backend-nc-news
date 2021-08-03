const {
  mapTopic,
  mapUsers,
  formatComments,
  formatArticles,
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

describe("formatArticles()", () => {
  test("should return an array", () => {
    const input = [];
    const actualOutput = formatArticles(input);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });

  test("should not mutate the input array ", () => {
    const input = [];
    expect(formatArticles(input)).not.toBe(input);
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
    expect(formatArticles(input)).toEqual(expectedOutput);
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
    expect(formatArticles(input)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(2);
  });
});

describe("formatComments()", () => {
  test("should return an array and should be empty if no comments are passed", () => {
    const input1 = [];
    const input2 = [];
    const actualOutput = formatArticles(input1, input2);
    expect(actualOutput).toEqual([]);
    expect(Array.isArray(actualOutput)).toEqual(true);
  });
  test("should not mutate the input arrays ", () => {
    const input1 = [];
    const input2 = [];
    expect(formatComments(input1, input2)).not.toBe(input1 || input2);
  });
  test("should return formated comments for all comment objects passed in input ", () => {
    const input1 = [
      {
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: new Date(1586179020000),
      },
      {
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: new Date(1604113380000),
      },
    ];

    const input2 = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
      {
        article_id: 2,
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: new Date(1591438200000),
      },
    ];
    const expectedOutput = [
      [
        "butter_bridge",
        2,
        16,
        new Date(1586179020000),
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      ],

      [
        "butter_bridge",
        1,
        14,
        new Date(1604113380000),
        "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
      ],
    ];
    expect(formatComments(input1, input2)).toEqual(expectedOutput);
    expect(expectedOutput).toHaveLength(2);
  });
});
