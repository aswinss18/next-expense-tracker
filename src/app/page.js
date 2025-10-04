'use client';

import { useState } from 'react';
import { Container, Box } from '@mui/material';
import AppHeader from '@/components/layout/AppHeader';
import StatisticsCards from '@/components/layout/StatisticsCards';
import AddExpenseForm from '@/components/expense/AddExpenseForm';
import ExpenseFilters from '@/components/filter/ExpenseFilters';
import ExpensesList from '@/components/expense/ExpensesList';
import { useExpenseData } from '@/hooks/useExpenseData';

export default function Home() {
  const [filters, setFilters] = useState({
    category: 'All',
    startDate: null,
    endDate: null,
    search: '',
  });

  const { expenses, stats, loading, addExpense, deleteExpense } = useExpenseData(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <StatisticsCards stats={stats} />
        </Box>

        <AddExpenseForm onAdd={addExpense} />

        <ExpenseFilters filters={filters} onFilterChange={handleFilterChange} />

        <ExpensesList expenses={expenses} onDelete={deleteExpense} loading={loading} />
      </Container>
    </>
  );
}
