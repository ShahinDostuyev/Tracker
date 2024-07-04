import { ExpenseContext } from "../../context/expenses-context";
import { useContext } from "react";
import { getDateMinusDays } from "../../utils/date";
import ExpensesOutput from "../../components/expensesShow/expensesOutput";

function RecentExpenses() {
  const expenseContext = useContext(ExpenseContext);
  console.log(expenseContext.expenses);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  console.log(recentExpenses);
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No recent expenses yet"
    />
  );
}

export default RecentExpenses;
