import { contributions } from "./susu-contribution-data";
const image = require("../../assets/images/disruptivo.jpg");

const INITIAL_STATE = {
  susuContributionLoading: false,
  susuContributions: [...contributions],
  susuContributionError: null,
  susuContributionDetail: {
    contributor: {
      name: 'Stanley Hayford',
      image,
      role: 'Admin'
    },
    amount: {
      value: 50,
      currency: 'USD'
    },
    status: 'Success',
    createdAt: '2020-11-09',
    payment: {
      method: 'CARD',
      cardDetail: {
        issuingNetwork: 'VISA',
        address: 'Atakorah Estate 2, Ashomang',
        cardHolderName: 'Stanley Hayford',
        cardNumber: '1234567890',
        cvv: '123',
        expiryDate: '12/2020',
      }
    }
  }
};

const susuContributionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;

  }
};

export const selectSusuContributions = state => state.susuContributions;

export default susuContributionReducer;
