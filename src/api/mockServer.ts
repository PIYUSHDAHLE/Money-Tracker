import { User, Transaction } from '../types'
import { v4 as uuid } from 'uuid'

const USERS_KEY = 'mt_users'
const TX_KEY = 'mt_transactions'

function readUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}
function writeUsers(u: User[]) { localStorage.setItem(USERS_KEY, JSON.stringify(u)) }

function readTx(): Transaction[] {
  return JSON.parse(localStorage.getItem(TX_KEY) || '[]')
}
function writeTx(t: Transaction[]) { localStorage.setItem(TX_KEY, JSON.stringify(t)) }

export async function register(name: string, email: string, password: string) {
  const users = readUsers()
  if (users.find(u => u.email === email)) throw new Error('Email already registered')
  const user: User = {
    id: uuid(), name, email, password, token: 'token-' + Math.random().toString(36).slice(2),
    phone: '',
    profilePicture: '',
    permanentAddress: '',
    currentAddress: '',
    familyCount: 0,
    familyMembers: []
  }
  users.push(user)
  writeUsers(users)
  return { ...user, password: undefined }
}

export async function login(email: string, password: string) {
  const users = readUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  // refresh token
  user.token = 'token-' + Math.random().toString(36).slice(2)
  writeUsers(users)
  return { ...user, password: undefined }
}

export async function forgotPassword(email: string) {
  return new Promise<{ message: string }>((resolve, reject) => {
    setTimeout(() => {
      if (email === "fail@test.com") {
        reject(new Error("No account found with that email"));
      } else {
        resolve({ message: "Password reset link sent to your email" });
      }
    }, 1000);
  });
}

export async function resetPassword(email: string, newPassword: string) {
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");
  user.password = newPassword;    
  writeUsers(users);               
  return { id: user.id, email: user.email, name: user.name };
}



export async function createTransaction(tx: Omit<Transaction, 'id'>) {
  const all = readTx()
  const newTx: Transaction = { ...tx, id: uuid() }
  all.push(newTx)
  writeTx(all)
  return newTx
}

export async function updateTransaction(id: string, patch: Partial<Transaction>) {
  const all = readTx()
  const idx = all.findIndex(t => t.id === id)
  if (idx === -1) throw new Error('Not found')
  all[idx] = { ...all[idx], ...patch }
  writeTx(all)
  return all[idx]
}

export async function deleteTransaction(id: string) {
  let all = readTx()
  all = all.filter(t => t.id !== id)
  writeTx(all)
  return true
}

export async function fetchTransactionsForUser(userId: string) {
  const all = readTx()
  return all.filter(t => t.userId === userId)
}

// mockServer.ts

export function getUser(userId: string) {
  const users = readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  return { ...user, password: undefined }; // never expose password
}

export function updateUser(updatedData: Partial<User>) {
  const users = readUsers();

  if (!updatedData.id) {
    throw new Error("User ID is required to update");
  }

  const idx = users.findIndex((u) => u.id === updatedData.id);
  if (idx === -1) throw new Error("User not found");

  // merge existing user with updates
  users[idx] = { ...users[idx], ...updatedData };

  writeUsers(users);

  return { ...users[idx], password: undefined }; // return safe user object
}



