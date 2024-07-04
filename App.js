import { StatusBar } from "expo-status-bar";
import Navigator from "./navigation";
import ExpensesContextProvider from "./context/expenses-context";

export default function App() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <Navigator />
    </ExpensesContextProvider>
  );
}
