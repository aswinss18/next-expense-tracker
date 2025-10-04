import { useState, useEffect, useCallback } from 'react';

export const useExpenseData = (filters = {}) => {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    count: 0,
    average: 0,
    byCategory: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Build query string from filters
  const buildQueryString = useCallback((filters) => {
    const params = new URLSearchParams();

    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params.append('endDate', filters.endDate);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }

    return params.toString();
  }, []);

  // Fetch expenses
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryString = buildQueryString(filters);
      const response = await fetch(`/api/expenses?${queryString}`);
      const data = await response.json();

      if (data.success) {
        setExpenses(data.data);
      } else {
        setError(data.error || 'Failed to fetch expenses');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, buildQueryString]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const queryString = params.toString();
      const response = await fetch(`/api/expenses/stats?${queryString}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [filters.startDate, filters.endDate]);

  // Add new expense
  const addExpense = async (expenseData) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchExpenses();
        await fetchStats();
        return { success: true, data: data.data };
      } else {
        return { success: false, errors: data.errors || { general: data.error } };
      }
    } catch (err) {
      return { success: false, errors: { general: err.message } };
    }
  };

  // Update expense
  const updateExpense = async (id, expenseData) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchExpenses();
        await fetchStats();
        return { success: true, data: data.data };
      } else {
        return { success: false, errors: data.errors || { general: data.error } };
      }
    } catch (err) {
      return { success: false, errors: { general: err.message } };
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchExpenses();
        await fetchStats();
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [fetchExpenses, fetchStats]);

  return {
    expenses,
    stats,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses,
  };
};
