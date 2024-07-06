import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../../components/UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../components/UI/IconButton/Button";
import { ExpenseContext } from "../../context/expenses-context";
import ExpenseForm from "../../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const expenseContext = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const expense = route.params?.expense;
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {
    expenseContext.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    isEditing
      ? expenseContext.updateExpense(editedExpenseId, expenseData)
      : expenseContext.addExpense(expenseData);
    navigation.goBack();
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation.isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        expense={expense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
