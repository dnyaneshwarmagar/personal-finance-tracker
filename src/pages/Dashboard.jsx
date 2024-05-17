import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpense from "../components/Modals/AddExpense";
import AddIncome from "../components/Modals/AddIncome";
import { addDoc, collection, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import Charts from "../components/Charts";
import no_transaction_img from '../assets/no-transaction.png'

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance(transactions);
  }, [transactions]);

  function onFinish(values, type) {
    // console.log("finish", values, type);
    const newTransactions = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransactions);
  }

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      await getTransactions();
      if (!many) toast.success("Transaction Added!");
    } catch (error) {
      console.log("error", error.message);
      if (!many) toast.error("Transaction could not be added!");
    }
  }

  async function getTransactions() {
    setLoading(true);
    // console.log('user: ', user);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshots = await getDocs(q);
      let transactionArray = [];
      querySnapshots.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      // console.log("transactionArray: ", transactionArray);
      setTransactions(transactionArray);
      calculateBalance(transactions);
      setLoading(false);
      return transactionArray;
    }
    setLoading(false);
  }

  function calculateBalance(transactions) {
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setBalance(incomeTotal - expenseTotal);
  }
  return (
    <div className="dashboard_box" style={{padding:"2rem"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <Cards
            income={income}
            expense={expense}
            balance={balance}
            setIsExpenseModalVisible={setIsExpenseModalVisible}
            setIsIncomeModalVisible={setIsIncomeModalVisible}
          />
          {transactions && transactions.length != 0? <Charts transactions={transactions}/>:<><img className="no_transaction_img" src={no_transaction_img} alt="img"/></>}
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            setIsIncomeModalVisible={setIsIncomeModalVisible}
            onFinish={onFinish}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            setIsExpenseModalVisible={setIsExpenseModalVisible}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            getTransactions={getTransactions}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
