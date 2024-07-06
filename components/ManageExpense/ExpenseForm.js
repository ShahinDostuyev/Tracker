import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/IconButton/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ expense, onCancel, onSubmit, submitButtonLabel }) {
  const [inputs, setInputs] = useState({
    description: {
      value: expense ? expense.description : "",
      isValid: true,
    },

    amount: {
      value: expense ? String(expense.amount) : "",
      isValid: true,
    },

    date: {
      value: expense ? getFormattedDate(new Date(expense.date)) : "",
      isValid: true,
    },
  });


  function inputChangeHandler(inputIdentifier, enteredInput) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredInput, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionisValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionisValid) {
      // Alert.alert("Invalid Input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionisValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marign: 8,
  },
});
