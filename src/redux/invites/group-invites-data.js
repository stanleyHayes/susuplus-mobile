const image = require("../../assets/images/disruptivo.jpg");

export const invites = [
  {
    _id: 1,
    group: {
      _id: 1,
      image,
      name: "NSDAP",
      membersCount: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    },
    expirationDate: '2022-10-21',
    status: 'PENDING',
  },
  {
    _id: 2,
    group: {
      _id: 1,
      image,
      name: "Olympus",
      membersCount: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    },
    expirationDate: '2022-10-21',
    status: 'EXPIRED',
  },
  {
    _id: 3,
    group: {
      _id: 1,
      image,
      name: "FBA",
      membersCount: 100,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    },
    expirationDate: '2022-10-21',
    status: 'ACCEPTED',
  },
];
