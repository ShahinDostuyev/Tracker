import { useContext } from "react";
import ExpensesOutput from "../../components/expensesShow/expensesOutput";
import { ExpenseContext } from "../../context/expenses-context";

function AllExpenses() {
  const expenseContext = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      expensesPeriod={"Total"}
      fallBackText="No expenses yet"
    />
  );
}

export default AllExpenses;
