// /app/api/users/route.js
import connectDB from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { getUsers, createUser, updateUser, deleteUser } from "../../controllers/userController";

export async function GET() {
  await connectDB();
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { name, email } = await req.json();
    const newUser = await createUser({ name, email });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const { id, name, email } = await req.json();
    const updatedUser = await updateUser(id, { name, email });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    const deletedUser = await deleteUser(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
