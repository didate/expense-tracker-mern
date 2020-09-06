export default (state, action) => {

    switch (action.type) {
        case 'GET_T':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_T':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_T':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'ERROR_T':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }

}