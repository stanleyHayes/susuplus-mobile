const image = require("../../assets/images/disruptivo.jpg");

export const paymentMethods = [
  {
    _id: 1,
    method: "Bank Account",
    bankAccount: {
      bankName: "Universal Merchant Bank",
      accountName: "Stanley Hayford",
      accountNumber: "123456791234",
      accountBranch: "Madina",
      mobileNumber: "+233270048319",
      last4: '1234'
    },
  },
  {
    _id: 2,
    method: "Card",
    cardDetail: {
      cvv: "123",
      cardNumber: "123456791234",
      cardHoldingName: "Stanley Hayford",
      expiryDate: "12/30",
      mobileNumber: "+233270048319",
      last4: '1234',
      bankIssuer: 'Zenith Bank',
      network: 'Visa'
    },
  },
  {
    _id: 3,
    method: "Bank Account",
    bankAccount: {
      bankName: "Universal Merchant Bank",
      accountName: "Stanley Hayford",
      accountNumber: "123456791234",
      accountBranch: "Madina",
      mobileNumber: "+233270048319",
      last4: '1234'
    },
  },
  {
    _id: 4,
    method: "Card",
    cardDetail: {
      cvv: "123",
      cardNumber: "123456791234",
      cardHoldingName: "Stanley Hayford",
      expiryDate: "12/30",
      mobileNumber: "+233270048319",
      last4: '1234',
      bankIssuer: 'Zenith Bank',
      network: 'Visa'
    },
  },
  {
    _id: 5,
    method: "Mobile Money",
    mobileMoneyAccount: {
      provider: "MTN",
      number: "+233555180048",
    },
  },
  {
    _id: 6,
    method: "Mobile Money",
    mobileMoneyAccount: {
      provider: "AirtelTigo",
      number: "+233270048319",
    },
  },
  {
    _id: 7,
    method: "Mobile Money",
    mobileMoneyAccount: {
      provider: "Vodafone",
      number: "+233502595892",
    },
  },
];
