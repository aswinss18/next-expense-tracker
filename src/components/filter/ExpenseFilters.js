import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilterList, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import { CATEGORIES } from '@/constants/categories';

export default function ExpenseFilters({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      category: 'All',
      startDate: null,
      endDate: null,
      search: '',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                label="Category"
                value={localFilters.category || 'All'}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <MenuItem value="All">All Categories</MenuItem>
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Start Date"
                value={localFilters.startDate ? dayjs(localFilters.startDate) : null}
                onChange={(date) =>
                  handleChange('startDate', date ? date.toISOString() : null)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="End Date"
                value={localFilters.endDate ? dayjs(localFilters.endDate) : null}
                onChange={(date) =>
                  handleChange('endDate', date ? date.toISOString() : null)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Search"
                placeholder="Search expenses..."
                value={localFilters.search || ''}
                onChange={(e) => handleChange('search', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FilterList />}
                  onClick={handleApply}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
