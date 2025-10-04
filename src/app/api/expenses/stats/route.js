import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Expense from '@/models/expenseModel';
import { calculateStats } from '@/lib/helpers';

// GET expense statistics
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const expenses = await Expense.find(query);
    const stats = calculateStats(expenses);

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('GET /api/expenses/stats error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
