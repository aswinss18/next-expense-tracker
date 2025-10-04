export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const getCategoryColor = (category) => {
  const colors = {
    Food: '#FF6B6B',
    Transport: '#4ECDC4',
    Entertainment: '#FFD93D',
    Shopping: '#95E1D3',
    Bills: '#F38181',
    Health: '#AA96DA',
    Other: '#9E9E9E',
  };
  return colors[category] || colors.Other;
};

export const getCategoryIcon = (category) => {
  const icons = {
    Food: 'Restaurant',
    Transport: 'DirectionsCar',
    Entertainment: 'Movie',
    Shopping: 'ShoppingCart',
    Bills: 'Receipt',
    Health: 'LocalHospital',
    Other: 'MoreHoriz',
  };
  return icons[category] || icons.Other;
};

export const aggregateExpensesByCategory = (expenses) => {
  return expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {});
};

export const calculateStats = (expenses) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const count = expenses.length;
  const average = count > 0 ? total / count : 0;
  const byCategory = aggregateExpensesByCategory(expenses);

  return {
    total,
    count,
    average,
    byCategory,
  };
};
