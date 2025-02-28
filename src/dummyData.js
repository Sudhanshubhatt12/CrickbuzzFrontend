// src/dummyData.js

export const matches = [
    {
      id: 1,
      title: "India vs Australia",
      venue: "Mumbai Stadium",
      noofover: 50,
      teams: ["India", "Australia"],
      createdat: "2024-11-20",
    },
    {
      id: 2,
      title: "England vs New Zealand",
      venue: "Lords Cricket Ground",
      noofover: 20,
      teams: ["England", "New Zealand"],
      createdat: "2024-11-18",
    },
  ];
  
  export const teams = [
    {
      id: 1,
      name: "India",
      ranking: 1,
      iccpoints: 12000,
      coach: "Rahul Dravid",
      players: [
        { id: 1, name: "Virat Kohli", speciality: "Batsman" },
        { id: 2, name: "Jasprit Bumrah", speciality: "Bowler" },
      ],
    },
    {
      id: 2,
      name: "Australia",
      ranking: 2,
      iccpoints: 11500,
      coach: "Andrew McDonald",
      players: [
        { id: 3, name: "Steve Smith", speciality: "Batsman" },
        { id: 4, name: "Pat Cummins", speciality: "Bowler" },
      ],
    },
  ];
  
  export const players = {
    1: {
      id: 1,
      name: "Virat Kohli",
      age: 35,
      gender: "Male",
      speciality: "Batsman",
      email: "virat@example.com",
      playerProfile: {
        runscored: 12000,
        wicketstaken: 0,
        battingavg: 55.0,
        bowlingavg: null,
      },
    },
    2: {
      id: 2,
      name: "Jasprit Bumrah",
      age: 30,
      gender: "Male",
      speciality: "Bowler",
      email: "bumrah@example.com",
      playerProfile: {
        runscored: 200,
        wicketstaken: 300,
        battingavg: 10.5,
        bowlingavg: 22.3,
      },
    },
  };
  