export type User = {
  id: string
  name: string
  email: string
  phone: string
  profilePicture: string
  permanentAddress: string
  currentAddress: string
  familyCount: number
  familyMembers: string[]   
  password?: string
  token?: string
}

export type Transaction = {
  id: string
  userId: string
  title: string
  amount: number
  type: 'income' | 'expense' | 'transfer' | 'investment' | 'loan'
  date: string
  notes?: string
}
