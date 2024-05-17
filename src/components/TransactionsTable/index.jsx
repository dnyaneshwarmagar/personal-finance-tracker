import React, { useState } from "react";
import "./style.css";
import { Button, Radio, Row, Select, Table } from "antd";
import search_icon from "../../assets/search_icon.png";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
const TransactionsTable = ({ transactions,getTransactions,addTransaction }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) &&
      item.type?.includes(typeFilter)
  );

  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    console.log("sortKey: ", sortKey);
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  let dataSource = sortedTransactions.map((transaction, index) => {
    return { ...transaction, key: index };
  });
  function exportCSV() {
    let csv = unparse({
      fields: ["name", "amount", "type", "tag", "date"],
      data: [...transactions],
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  async function importCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          console.log('results: ', results);
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction,true);
          }
        },
      });
    toast.success("Imported successfully!")
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="transactions_box">
      <div className="first_row">
        <div className="input-flex">
          <img src={search_icon} alt="img"/>
          <input
            placeholder="Search By Name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>

      <Row className="second_row" wrap={true} gutter={[16,16]}>
        <h2>Transaction Table</h2>
        <Radio.Group
          className="input-radio"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort By Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <Row className="csv-btn-div" wrap={true}>
          <button className="btn" onClick={exportCSV}>
            Export CSV
          </button>
          <label htmlFor="file-csv" className="btn btn-blue">
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            onChange={importCSV}
            required
            style={{ display: "none" }}
          />
        </Row>
      </Row>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default TransactionsTable;
