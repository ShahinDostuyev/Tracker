import { createContext, useReducer } from "react";

const Dummy_Expenses = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 49.9,
    date: new Date("2024-07-02"),
  },
  {
    id: "e2",
    description: "Glasses",
    amount: 32.9,
    date: new Date("2023-07-02"),
  },
  {
    id: "e3",
    description: "Watch",
    amount: 343.9,
    date: new Date("2023-03-12"),
  },
  {
    id: "e4",
    description: "A car",
    amount: 12499.9,
    date: new Date("2023-03-22"),
  },
  {
    id: "e5",
    description: "Books",
    amount: 3.9,
    date: new Date("2023-03-17"),
  },
  {
    id: "e6",
    description: "Phone",
    amount: 1399.9,
    date: new Date("2023-03-14"),
  },
];

export const ExpenseContext = createContext({
  expenses: Dummy_Expenses,
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, date, amount }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, Dummy_Expenses);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpensesContextProvider;
