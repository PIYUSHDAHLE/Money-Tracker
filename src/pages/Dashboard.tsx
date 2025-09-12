import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";

import {
  fetchUserTx,
  addTx,
  optimisticAdd,
  optimisticRemove,
  optimisticUpdate,
  editTx,
  removeTx,
} from "../store/transactionsSlice";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import ReactECharts from "echarts-for-react";

export default function Dashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const items = useSelector((s: RootState) => s.transactions.items);
  const loading = useSelector((s: RootState) => s.transactions.loading);
  const dispatch = useAppDispatch();

const theme = useSelector((s: RootState) => s.theme.mode);
const isDark = theme === "dark";


  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<{
    title: string;
    amount: number;
    type: "expense" | "income" | "transfer" | "investment" | "loan";
    notes: string;
  }>({ title: "", amount: 0, type: "expense", notes: "" });

  useEffect(() => {
    if (user) dispatch(fetchUserTx(user.id));
  }, [user]);

  const totals = items.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += t.amount;
      else if (t.type === "expense") acc.expense += t.amount;
      else if (t.type === "investment") acc.investment += t.amount;
      else if (t.type === "loan") acc.loan += t.amount;
      else if (t.type === "transfer") acc.transfer += t.amount;
      return acc;
    },
    { income: 0, expense: 0, investment: 0, loan: 0, transfer: 0 }
  );

  function openForCreate() {
    setEditing(null);
    setForm({ title: "", amount: 0, type: "expense", notes: "" });
    setOpen(true);
  }
  function openForEdit(tx: any) {
    setEditing(tx);
    setForm({
      title: tx.title,
      amount: tx.amount,
      type: tx.type,
      notes: tx.notes || "",
    });
    setOpen(true);
  }

  async function submit() {
    if (!user) return alert("Not logged in");
    if (editing) {
      dispatch(optimisticUpdate({ id: editing.id, ...form }));
      setOpen(false);
      try {
        await dispatch(editTx({ id: editing.id, patch: { ...form } })).unwrap();
      } catch (err) {
        alert("Update failed");
        dispatch(fetchUserTx(user.id));
      }
    } else {
      const optimisticId = "temp-" + Math.random().toString(36).slice(2);
      const optimistic = {
        id: optimisticId,
        userId: user.id,
        ...form,
        date: new Date().toISOString(),
      };
      dispatch(optimisticAdd(optimistic));
      setOpen(false);
      try {
        await dispatch(
          addTx({ userId: user.id, ...form, date: new Date().toISOString() })
        ).unwrap();
        dispatch(fetchUserTx(user.id));
      } catch (err) {
        alert("Create failed");
        dispatch(optimisticRemove(optimisticId));
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete transaction?")) return;
    dispatch(optimisticRemove(id));
    try {
      await dispatch(removeTx(id)).unwrap();
    } catch (err) {
      alert("Delete failed");
      if (user) dispatch(fetchUserTx(user.id));
    }
  }

  // ---------------- ECharts Config ----------------
const chartOption = {
  backgroundColor: isDark ? "#1a1a1a" : "#f0f8ff",
  tooltip: { trigger: "axis" },
  legend: {
    data: ["Income", "Expense", "Predicted Savings"],
    textStyle: { color: isDark ? "#fff" : "#000" },
  },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    axisLine: { lineStyle: { color: isDark ? "#fff" : "#000" } },
    axisLabel: { color: isDark ? "#fff" : "#000" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: isDark ? "#fff" : "#000" } },
    axisLabel: { color: isDark ? "#fff" : "#000" },
  },
  series: [
    {
      name: "Income",
      type: "bar",
      data: [
        totals.income,
        totals.income * 1.1,
        totals.income * 1.2,
        totals.income * 1.3,
        totals.income * 1.4,
        totals.income * 1.5,
      ],
      itemStyle: { color: isDark ? "#4f9cf0" : "#4682B4" },
    },
    {
      name: "Expense",
      type: "bar",
      data: [
        totals.expense,
        totals.expense * 1.05,
        totals.expense * 1.1,
        totals.expense * 1.15,
        totals.expense * 1.2,
        totals.expense * 1.25,
      ],
      itemStyle: { color: isDark ? "#6fb9f0" : "#87CEEB" },
    },
    {
      name: "Predicted Savings",
      type: "line",
      smooth: true,
      data: [
        totals.income - totals.expense,
        totals.income * 1.1 - totals.expense * 1.05,
        totals.income * 1.2 - totals.expense * 1.1,
        totals.income * 1.3 - totals.expense * 1.15,
        totals.income * 1.4 - totals.expense * 1.2,
        totals.income * 1.5 - totals.expense * 1.25,
      ],
      lineStyle: { color: isDark ? "#fff" : "#000", width: 3 },
      symbolSize: 10,
    },
  ],
}

  return (
    <div className="container mx-auto p-6 space-y-6 dark:bg-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-white font-semibold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button color="primary" variant="shadow" onClick={openForCreate}>
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>Income</CardHeader>
          <CardBody>
            <strong>₹{totals.income}</strong>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Expense</CardHeader>
          <CardBody>
            <strong>₹{totals.expense}</strong>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Investment</CardHeader>
          <CardBody>
            <strong>₹{totals.investment}</strong>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Loan</CardHeader>
          <CardBody>
            <strong>₹{totals.loan}</strong>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Transfer</CardHeader>
          <CardBody>
            <strong>₹{totals.transfer}</strong>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Total Balance</CardHeader>
          <CardBody>
            <strong>₹{totals.income - totals.expense}</strong>
          </CardBody>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>Transactions</CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table aria-label="Transactions table">
              <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Amount</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Date</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {items.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.title}</TableCell>
                    <TableCell>₹{tx.amount}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="mr-2"
                        onClick={() => openForEdit(tx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() => handleDelete(tx.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>Predictive Savings & Expenses</CardHeader>
        <CardBody>
          <ReactECharts option={chartOption} style={{ height: "400px" }} />
        </CardBody>
      </Card>


      {/* Pie Chart Section */}
      <Card>
        <CardHeader>Money Pie Chart Tracker</CardHeader>
        <CardBody>
          <ReactECharts
            option={{
              backgroundColor: isDark ? "#1a1a1a" : "#f0f8ff",
              tooltip: {
                trigger: "item",
                formatter: "{b}: ₹{c} ({d}%)",
              },
              legend: {
                orient: "vertical",
                left: "left",
                textStyle: { color: isDark ? "#fff" : "#000" },
              },
              series: [
                {
                  name: "Transactions",
                  type: "pie",
                  radius: "70%",
                  data: [
                    { value: totals.expense, name: "Expense" },
                    { value: totals.income, name: "Income" },
                    { value: totals.transfer, name: "Transfer" },
                    { value: totals.investment, name: "Investment" },
                    { value: totals.loan, name: "Loan" },
                  ],
                  label: {
                    color: isDark ? "#fff" : "#000",
                  },
                  labelLine: {
                    lineStyle: { color: isDark ? "#fff" : "#000" },
                  },
                },
              ],
            }}
            style={{ height: "400px" }}
          />
        </CardBody>
      </Card>




      {/* Modal for Add/Edit */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>{editing ? "Edit" : "Add"} Transaction</ModalHeader>
          <ModalBody className="space-y-3">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
            <Input
              label="Amount"
              type="number"
              value={form.amount.toString()}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: Number(e.target.value) }))
              }
            />
            <Select
              label="Type"
              selectedKeys={[form.type]}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as any }))
              }
            >
              <SelectItem key="expense">Expense</SelectItem>
              <SelectItem key="income">Income</SelectItem>
              <SelectItem key="transfer">Transfer</SelectItem>
              <SelectItem key="investment">Investment</SelectItem>
              <SelectItem key="loan">Loan</SelectItem>
            </Select>
            <Textarea
              label="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={submit}>
              {editing ? "Save" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
