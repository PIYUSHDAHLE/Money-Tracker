import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { Helmet } from "react-helmet";
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
import GlobalButton from "@/components/common/GlobalButton";

export default function Dashboard() {
  const user = useSelector((s: RootState) => s.auth.user);
  const items = useSelector((s: RootState) => s.transactions.items);
  const loading = useSelector((s: RootState) => s.transactions.loading);
  const [readOnly, setReadOnly] = useState(false);
  const dispatch = useAppDispatch();
  const theme = useSelector((s: RootState) => s.theme.mode);
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  function handleDelete(id: string) {
    setDeleteId(id);
    setDeleteOpen(true);
  }

  const [form, setForm] = useState<{
    title: string;
    amount: number;
    type: "expense" | "income" | "transfer" | "investment" | "loan";
    notes: string;
  }>({ title: "", amount: 0, type: "expense", notes: "" });

  useEffect(() => {
    if (user) dispatch(fetchUserTx(user.id));
  }, [user]);

  function openForRead(tx: any) {
    setEditing(tx);
    setForm({
      title: tx.title,
      amount: tx.amount,
      type: tx.type,
      notes: tx.notes || "",
    });
    setReadOnly(true);
    setOpen(true);
  }

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

  //ECharts Config
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
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Money Tracker</title>
                <meta name="title" content="Dashboard | Money Tracker" />
        <meta
          name="description"
          content="Get a clear overview of your spending, savings, and budgeting progress in one place."
        />
      </Helmet>

      <div className="container lg:px-25 mx-auto p-6 space-y-6 dark:bg-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl dark:text-white font-semibold">Dashboard</h1>
          <div className="flex space-x-2">
            <GlobalButton onClick={openForCreate}>Add Transaction</GlobalButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#1ce42a57] dark:bg-[#1ce42925]">
            <CardHeader>Income</CardHeader>
            <CardBody>
              <strong>₹{totals.income}</strong>
            </CardBody>
          </Card>
          <Card className="bg-[#e4131352] dark:bg-[#e413133f]">
            <CardHeader>Expense</CardHeader>
            <CardBody>
              <strong>₹{totals.expense}</strong>
            </CardBody>
          </Card>
          <Card className="bg-[#1924b427] dark:bg-[#1c2ae636]">
            <CardHeader>Investment</CardHeader>
            <CardBody>
              <strong>₹{totals.investment}</strong>
            </CardBody>
          </Card>
          <Card className="bg-[#e4c91b4f] dark:bg-[#e4c91b3b]">
            <CardHeader>Loan</CardHeader>
            <CardBody>
              <strong>₹{totals.loan}</strong>
            </CardBody>
          </Card>
          <Card className="bg-[#7214dd48] dark:bg-[#7214dd31]">
            <CardHeader>Transfer</CardHeader>
            <CardBody>
              <strong>₹{totals.transfer}</strong>
            </CardBody>
          </Card>
          <Card className="bg-[#db29e746] dark:bg-[#da29e734]">
            <CardHeader>Total Balance</CardHeader>
            <CardBody>
              <strong>
                {" "}
                ₹
                {totals.income -
                  (totals.expense + totals.investment + totals.loan)}
              </strong>
            </CardBody>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="bg-[#f0f8ff] dark:bg-[#1a1a1a]">
          <CardHeader className="md:text-2xl">Transactions</CardHeader>

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
                  <TableRow
                    key={tx.id}
                    className="hover:bg-[#f0f8ff] dark:hover:bg-[#42a4ff11]"
                  >
                    <TableCell>{tx.title}</TableCell>
                    <TableCell>₹{tx.amount}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                    <TableCell className="space-x-2 space-y-2">
                      <GlobalButton
                        size="small"
                        onClick={() => openForEdit(tx)}
                      >
                        Edit
                      </GlobalButton>
                      <GlobalButton
                        size="small"
                        onClick={() => openForRead(tx)}
                      >
                        Read
                      </GlobalButton>
                      <GlobalButton
                        size="small"
                        onClick={() => handleDelete(tx.id)}
                      >
                        Delete
                      </GlobalButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

        {/* Chart Section */}
        <Card className="bg-[#f0f8ff] dark:bg-[#1a1a1a]">
          <CardHeader className="md:text-2xl">
            Predictive Savings & Expenses
          </CardHeader>
          <CardBody>
            <ReactECharts option={chartOption} style={{ height: "400px" }} />
          </CardBody>
        </Card>

        {/* Pie Chart Section */}
        <Card className="bg-[#f0f8ff] dark:bg-[#1a1a1a]">
          <CardHeader className="md:text-2xl">
            Money Pie Chart Tracker
          </CardHeader>
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
              className="!h-[520px]"
            />
          </CardBody>
        </Card>

        <Modal
          isOpen={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setReadOnly(false);
              setEditing(null);
            }
          }}
        >
          <ModalContent>
            <ModalHeader>
              {readOnly
                ? "View Transaction"
                : editing
                  ? "Edit Transaction"
                  : "New Transaction"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                value={form.title}
                isReadOnly={readOnly}
                variant={readOnly ? "flat" : "bordered"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
              />
              <Input
                label="Amount"
                type="number"
                value={form.amount.toString()}
                isReadOnly={readOnly}
                variant={readOnly ? "flat" : "bordered"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: Number(e.target.value) }))
                }
              />
              <Select
                label="Type"
                selectedKeys={[form.type]}
                isDisabled={readOnly}
                variant={readOnly ? "flat" : "bordered"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value as any }))
                }
              >
                <SelectItem key="income">Income</SelectItem>
                <SelectItem key="expense">Expense</SelectItem>
                <SelectItem key="transfer">Transfer</SelectItem>
                <SelectItem key="investment">Investment</SelectItem>
                <SelectItem key="loan">Loan</SelectItem>
              </Select>
              <Textarea
                label="Notes"
                value={form.notes}
                isReadOnly={readOnly}
                variant={readOnly ? "flat" : "bordered"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="solid"
                onClick={() => {
                  setOpen(false);
                  setReadOnly(false);
                  setEditing(null);
                }}
              >
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && (
                <Button color="primary" variant="flat" onClick={submit}>
                  {editing ? "Save" : "Create"}
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={deleteOpen}
          onOpenChange={(isOpen) => {
            setDeleteOpen(isOpen);
            if (!isOpen) setDeleteId(null);
          }}
        >
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this transaction?
            </ModalBody>
            <ModalFooter>
              <Button variant="solid" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="flat"
                onClick={async () => {
                  if (!deleteId) return;
                  try {
                    dispatch(optimisticRemove(deleteId));
                    await dispatch(removeTx(deleteId)).unwrap();
                  } catch (err) {
                    alert("Delete failed");
                    if (user) dispatch(fetchUserTx(user.id));
                  }
                  setDeleteOpen(false);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
