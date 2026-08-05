export const getAIAdvice = (
  highestCategory,
  saving,
  income
) => {

  const aiAdvice = [];

  if (highestCategory) {

    switch (highestCategory[0]) {

      case "Transport":
        aiAdvice.push(
          "Try using public transport or carpooling 1-2 days a week."
        );
        aiAdvice.push(
          "Reducing transport expenses by 15% could save you a good amount."
        );
        break;

      case "Hotel":
        aiAdvice.push(
          "Dining out is your biggest expense."
        );
        aiAdvice.push(
          "Cooking at home a few extra days can improve your savings."
        );
        break;

      case "Drink":
        aiAdvice.push(
          "Beverage expenses are high this month."
        );
        aiAdvice.push(
          "Reducing unnecessary drinks can increase your monthly savings."
        );
        break;

      case "Accessories":
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

      case "Veg & Fruits":
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
          "Your spending is balanced. Keep tracking your expenses regularly."
        );
    }
  }

  if (saving > income * 0.30) {

    aiAdvice.push(
      "Excellent! You are saving more than 30% of your income."
    );

  } else if (saving > income * 0.20) {

    aiAdvice.push(
      "Good savings! Try reaching a 30% savings target."
    );

  } else {

    aiAdvice.push(
      "Your savings are below 20%. Try reducing unnecessary spending."
    );

  }

  return aiAdvice;
};