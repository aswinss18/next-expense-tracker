import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Collapse,
} from '@mui/material';
import { Delete, ExpandMore } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { formatCurrency, formatDate, getCategoryColor } from '@/lib/helpers';
import { CATEGORY_ICONS } from '@/constants/categories';

export default function ExpenseCard({ expense, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const categoryColor = getCategoryColor(expense.category);
  const iconName = CATEGORY_ICONS[expense.category];
  const IconComponent = MuiIcons[iconName] || MuiIcons.MoreHoriz;

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `4px solid ${categoryColor}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: `${categoryColor}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: categoryColor,
              }}
            >
              <IconComponent sx={{ fontSize: 28 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {expense.title}
                </Typography>
                <Chip
                  label={expense.category}
                  size="small"
                  sx={{
                    backgroundColor: `${categoryColor}22`,
                    color: categoryColor,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                {formatDate(expense.date)}
              </Typography>

              {expense.description && (
                <Box sx={{ mt: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                  <Collapse in={expanded}>
                    <Typography variant="body2" sx={{ mt: 1, pl: 1 }}>
                      {expense.description}
                    </Typography>
                  </Collapse>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: categoryColor,
              }}
            >
              {formatCurrency(expense.amount)}
            </Typography>
            <IconButton
              onClick={() => onDelete(expense)}
              color="error"
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white',
                },
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
