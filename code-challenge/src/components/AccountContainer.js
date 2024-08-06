// src/components/AccountContainer.js
import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  // State to hold transactions
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the server when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8001/transactions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); // Empty array means this effect runs only once

  // Add a new transaction to the server and update the state
  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions((prevTransactions) => [...prevTransactions, data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Filter transactions based on the search term
  function searchTransaction(searchTerm) {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setTransactions(filteredTransactions);
  }

  return (
    <div>
      <Search searchTransaction={searchTransaction} />
      <AddTransactionForm addTransaction={addTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
