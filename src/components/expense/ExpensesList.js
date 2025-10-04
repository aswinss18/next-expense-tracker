import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Receipt } from '@mui/icons-material';
import ExpenseCard from './ExpenseCard';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function ExpensesList({ expenses, onDelete, loading }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (expenseToDelete) {
      await onDelete(expenseToDelete._id);
      setDeleteDialogOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading expenses...</Typography>
      </Box>
    );
  }

  if (expenses.length === 0) {
    return (
      <Paper
        sx={{
          py: 8,
          textAlign: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Receipt sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No expenses found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add your first expense to get started
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Expense History ({expenses.length})
        </Typography>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            onDelete={handleDeleteClick}
          />
        ))}
      </Box>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        expense={expenseToDelete}
      />
    </>
  );
}
