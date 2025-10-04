import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Expense from '@/models/expenseModel';
import { validateExpense } from '@/lib/validators';

// GET all expenses with optional filtering
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');

    let query = {};

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    return NextResponse.json({ success: true, data: expenses });
  } catch (error) {
    console.error('GET /api/expenses error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST create new expense
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate expense data
    const { isValid, errors } = validateExpense(body);
    if (!isValid) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const expense = await Expense.create(body);

    return NextResponse.json(
      { success: true, data: expense },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/expenses error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
