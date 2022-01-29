import { USER_ACTION_TYPES } from "./user-action-types";

const INITIAL_STATE = {
    userLoading: false,
    users: [],
    contacts: [],
    contactsLoading: [],
    contactError: null,
    userError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case USER_ACTION_TYPES.GET_USERS_REQUEST:
            return {
                ...state,
                userLoading: true,
                userError: null
            }
        
        case USER_ACTION_TYPES.GET_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: action.payload
            }
        case USER_ACTION_TYPES.GET_USERS_FAILURE:
            return {
                ...state,
                userLoading: false,
                userError: action.payload,
            }
        
        case USER_ACTION_TYPES.GET_USER_CONTACTS_REQUEST:
            return {
                ...state,
                contactsLoading: true,
                contactError: null
            }
        
        case USER_ACTION_TYPES.GET_USER_CONTACTS_SUCCESS:
            return {
                ...state,
                contactsLoading: false,
                contacts: action.payload,
                contactError: null
            }
        case USER_ACTION_TYPES.GET_USER_CONTACTS_FAILURE:
            return {
                ...state,
                contactsLoading: false,
                contactError: action.payload,
                contacts: []
            }
        default:
            return state;
        
    }
};

export const selectUsers = state => {
    if(state.users.users.length > 1 && state.users.contacts.length > 1){
        const contacts = state.users.contacts.map(contact => {
            const number = contact.phoneNumbers && contact.phoneNumbers[1] && contact.phoneNumbers[1].number;
            if(number){
                const numberWithoutSpaceAndHyphens = number
                    .replace(' ', '')
                    .replace(' ', '')
                    .replace(' ', '')
                    .replace(' ', '')
                    .replace('+', '')
                    .replace('-', '')
                    .replace('(', '')
                    .replace(')', '');
                return numberWithoutSpaceAndHyphens.slice(numberWithoutSpaceAndHyphens.length - 9);
            }
        });
        const users = state.users.users.map(user => {
            const phone = user.phone.replace('+', '').slice(user.phone.length - 9);
            return {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                isContact: contacts.includes(phone)
            }
        });
        return {userLoading: state.users.userLoading, users, userError: state.users.userError};
    }
};


export default userReducer;
