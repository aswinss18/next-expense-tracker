export const validateExpense = (data) => {
  const errors = {};

  // Title validation
  if (!data.title || !data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  // Amount validation
  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  // Category validation
  const validCategories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];
  if (!data.category) {
    errors.category = 'Category is required';
  } else if (!validCategories.includes(data.category)) {
    errors.category = 'Invalid category';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else if (isNaN(Date.parse(data.date))) {
    errors.date = 'Invalid date';
  }

  // Description validation (optional)
  if (data.description && data.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
