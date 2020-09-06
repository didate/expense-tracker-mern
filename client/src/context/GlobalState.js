import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider component

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get('api/v1/transactions');
            dispatch({
                type: "GET_T",
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: "ERROR_T",
                payload: error.response.data.error
            })
        }
    }
    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/v1/transactions', transaction, config);
            dispatch({ type: 'ADD_T', payload: res.data.data });

        } catch (error) {
            dispatch({
                type: "ERROR_T",
                payload: error.response.data.error
            })
        }
    }
    async function deleteTransaction(id) {
        try {
            await axios.delete(`api/v1/transactions/${id}`);
        } catch (error) {
            dispatch({
                type: "ERROR_T",
                payload: error.response.data.error
            })
        }
        dispatch({ type: 'DELETE_T', payload: id });
    }
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>{children}</GlobalContext.Provider>)
}

export default GlobalProvider;