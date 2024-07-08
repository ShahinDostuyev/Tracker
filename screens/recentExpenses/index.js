import { ExpenseContext } from "../../context/expenses-context";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../../utils/date";
import ExpensesOutput from "../../components/expensesShow/expensesOutput";
import { getExpenses } from "../../utils/requests/http";
import LoadingOverlay from "../../components/UI/IconButton/LoadingOverlay";
import ErrorOverlay from "../../components/UI/IconButton/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expenseContext = useContext(ExpenseContext);

  useEffect(() => {
    async function fetchExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    fetchExpenses();
  }, []);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  console.log(recentExpenses);

  return (
    <>
      {isFetching ? (
        <LoadingOverlay />
      ) : error ? (
        <ErrorOverlay message={error} />
      ) : (
        <ExpensesOutput
          expenses={recentExpenses}
          expensesPeriod="Last 7 days"
          fallBackText="No recent expenses yet"
        />
      )}
    </>
  );
}

export default RecentExpenses;
