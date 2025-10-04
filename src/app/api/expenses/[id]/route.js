import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Expense from '@/models/expenseModel';
import { validateExpense } from '@/lib/validators';

// GET single expense by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const expense = await Expense.findById(params.id);

    if (!expense) {
      return NextResponse.json(
        { success: false, error: 'Expense not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: expense });
  } catch (error) {
    console.error('GET /api/expenses/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update expense by ID
export async function PUT(request, { params }) {
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

    const expense = await Expense.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return NextResponse.json(
        { success: false, error: 'Expense not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: expense });
  } catch (error) {
    console.error('PUT /api/expenses/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE expense by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const expense = await Expense.findByIdAndDelete(params.id);

    if (!expense) {
      return NextResponse.json(
        { success: false, error: 'Expense not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: {} },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/expenses/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
