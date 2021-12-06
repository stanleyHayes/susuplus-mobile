const image = require("../../assets/images/disruptivo.jpg");

export const disbursements = [
  {
    _id: 1,
    recipient: {
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
    _id: 2,
    recipient: {
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
    recipient: {
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
    _id: 4,
    recipient: {
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
    recipient: {
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
