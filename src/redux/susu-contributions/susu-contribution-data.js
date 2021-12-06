const image = require("../../assets/images/disruptivo.jpg");

export const contributions = [
  {
    _id: 1,
    contributor: {
      image,
      name: "Stanley Hayford",
      role: 'Admin'
    },
    createdAt: Date.now(),
    amount: {
      value: 50,
      currency: 'GHS'
    },
    payment: {
      method: 'BANK'
    },
    status: 'SUCCESS'
  },
  {
    _id: 2,
    contributor: {
      image,
      name: "Stanley Hayford",
      role: 'Admin'
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
    contributor: {
      image,
      name: "Stanley Hayford",
      role: 'Admin'
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
    _id: 4,
    contributor: {
      image,
      name: "Stanley Hayford",
      role: 'Admin'
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
    contributor: {
      image,
      name: "Stanley Hayford",
      role: 'Admin'
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
