export const getAIAdvice = (
  highestCategory,
  saving,
  income
) => {

  const aiAdvice = [];

  if (highestCategory) {

    switch (highestCategory[0]) {

      case "Transportation":
        aiAdvice.push(
          "Try using public transport or carpooling 1-2 days a week."
        );
        aiAdvice.push(
          "Reducing transport expenses by 15% could save you a good amount."
        );
        break;

      case "Restaurant":
        aiAdvice.push(
          "Dining out is your biggest expense."
        );
        aiAdvice.push(
          "Cooking at home a few extra days can improve your savings."
        );
        break;

      case "Drinks":
        aiAdvice.push(
          "Beverage expenses are high this month."
        );
        aiAdvice.push(
          "Reducing unnecessary drinks can increase your monthly savings."
        );
        break;

      case "Beauty & Personal Care":
        aiAdvice.push(
          "Shopping is your highest spending category."
        );
        aiAdvice.push(
          "Consider waiting a few days before buying non-essential items."
        );
        break;

      case "Groceries":
        aiAdvice.push(
          "Your grocery spending is high."
        );
        aiAdvice.push(
          "Buying weekly instead of daily may help reduce costs."
        );
        break;

      case "Petrol":
        aiAdvice.push(
          "Fuel expenses are higher than usual."
        );
        aiAdvice.push(
          "Plan trips together to reduce fuel costs."
        );
        break;

      case "Rent":
        aiAdvice.push(
          "Rent is your biggest fixed expense."
        );
        aiAdvice.push(
          "Maintain a separate rent budget every month."
        );
        break;

      case "Current Bill":
        aiAdvice.push(
          "Electricity bills are increasing."
        );
        aiAdvice.push(
          "Switch off unused appliances to save electricity."
        );
        break;

      case "Fruits, Vegetables & Flowers":
        aiAdvice.push(
          "Healthy food spending is good."
        );
        aiAdvice.push(
          "Buying seasonal vegetables can reduce costs."
        );
        break;

      case "Gift":
        aiAdvice.push(
          "Gift expenses are high this month."
        );
        aiAdvice.push(
          "Plan gift budgets in advance."
        );
        break;

      default:
        aiAdvice.push(
          "Keep tracking your expenses!!!."
        );
    }
  }

  if (saving >= income * 0.30) {

    aiAdvice.push(
      "Excellent financial management! You are saving 30% or more of your income. Keep maintaining this healthy savings rate."
    );

  } else if (saving >= income * 0.20) {

    aiAdvice.push(
      "Good financial management! You are saving at least 20% of your income. Consider gradually increasing your savings toward the 30% target."
    );

  } else if (saving > 0) {

    aiAdvice.push(
      "Your current savings are below 20% of your income. Consider reviewing your discretionary expenses and setting a monthly savings target."
    );

  } else {

    aiAdvice.push(
      "Your expenses have exceeded your income this month. Consider reducing non-essential spending and reviewing your daily expenses to bring your spending within your income."
    );

  }

  return aiAdvice;
};