import { disbursements } from "./susu-disbursement-data";
const image = require("../../assets/images/jeffery.jpg");

const INITIAL_STATE = {
  susuDisbursementLoading: false,
  susuDisbursements: [...disbursements],
  susuDisbursementError: null,
  susuDisbursementDetail: {
    recipient: {
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
      method: 'BANK',
      bankAccount: {
        bankAccount: 'Universal Merchant Bank',
        accountBranch: 'Madina',
        accountNumber: '12345678901234',
        accountName: 'Stanley Hayford',
        mobileNumber: '+233270048319'
      }
    }
  }
};

const susuDisbursementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;

  }
};

export const selectSusuDisbursements = state => state.susuDisbursements;

export default susuDisbursementReducer;
