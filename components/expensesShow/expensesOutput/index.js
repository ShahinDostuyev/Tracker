import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "../expensesSummary";
import ExpensesList from "../expensesList";
import { GlobalStyles } from "../../../constants/styles";

function ExpensesOutput({ expenses, expensesPeriod, fallBackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.fallBackText}>{fallBackText}</Text>
      )}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  fallBackText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
