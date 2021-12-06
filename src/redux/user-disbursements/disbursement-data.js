const image = require("../../assets/images/disruptivo.jpg");

export const disbursements = [
  {
    _id: 1,
    group: {
      image,
      name: "Olympus",
    },
    createdAt: Date.now(),
    amount: {
      value: 50,
      currency: 'GHS'
    },
    payment: {
      method: 'MOMO'
    },
    status: 'SUCCESS'
  },
  {
    _id: 2,
    group: {
      image,
      name: "Olympus",
    },
    createdAt: Date.now(),
    amount: {
      value: 50,
      currency: 'GHS'
    },
    payment: {
      method: 'MOMO'
    },
    status: 'SUCCESS'
  },
  {
    _id: 3,
    group: {
      image,
      name: "Olympus",
    },
    createdAt: Date.now(),
    amount: {
      value: 50,
      currency: 'GHS'
    },
    payment: {
      method: 'MOMO'
    },
    status: 'SUCCESS'
  },
  {
    _id: 4,
    group: {
      image,
      name: "Olympus",
    },
    createdAt: Date.now(),
    amount: {
      value: 50,
      currency: 'GHS'
    },
    payment: {
      method: 'CARD'
    },
    status: 'SUCCESS'
  },
  {
    _id: 5,
    group: {
      image,
      name: "Bilderberg",
    },
    createdAt: Date.now(),
    amount: {
      value: 500,
      currency: 'GHS'
    },
    payment: {
      method: 'CARD'
    },
    status: 'FAILED'
  },
];
