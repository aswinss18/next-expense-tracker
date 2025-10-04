import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, Receipt, AttachMoney } from '@mui/icons-material';
import { formatCurrency } from '@/lib/helpers';

export default function StatisticsCards({ stats }) {
  const statItems = [
    {
      title: 'Total Expenses',
      value: formatCurrency(stats.total),
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#FF6B6B',
    },
    {
      title: 'Total Transactions',
      value: stats.count,
      icon: <Receipt sx={{ fontSize: 40 }} />,
      color: '#4ECDC4',
    },
    {
      title: 'Average Expense',
      value: formatCurrency(stats.average),
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#95E1D3',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              height: '100%',
              background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}44 100%)`,
              border: `1px solid ${item.color}66`,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: item.color }}>
                    {item.value}
                  </Typography>
                </Box>
                <Box sx={{ color: item.color, opacity: 0.7 }}>{item.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
