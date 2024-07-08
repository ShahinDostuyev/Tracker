import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../../components/UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseContext } from "../../context/expenses-context";
import ExpenseForm from "../../components/ManageExpense/ExpenseForm";
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from "../../utils/requests/http";
import LoadingOverlay from "../../components/UI/IconButton/LoadingOverlay";
import ErrorOverlay from "../../components/UI/IconButton/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expenseContext = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const expense = route.params?.expense;
  const isEditing = !!editedExpenseId;

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not fetch expenses");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseContext.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      }
    } catch (error) {
      setError("Could not update expense");
      setIsSubmitting(false);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation.isEditing]);

  return (
    <>
      {isSubmitting ? (
        <LoadingOverlay />
      ) : error ? (
        <ErrorOverlay message={error} />
      ) : (
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
      )}
    </>
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
