import React from "react";
import "./style.css";
import { Row, Card } from "antd";
import Button from "../Button";
const Cards = ({
  income,
  expense,
  balance,
  setIsExpenseModalVisible,
  setIsIncomeModalVisible,
}) => {
  return (
    <div>
      <Row className="row">
        <Card className="card" title="Current Balance">
          <p>₹ {balance}</p>
          <Button text={"Reset Balance"} blue="true" />
        </Card>

        <Card className="card" title="Total Income">
          <p>₹ {income}</p>
          <Button
            text={"Add Income"}
            blue="true"
            onClick={() => setIsIncomeModalVisible(true)}
          />
        </Card>

        <Card className="card" title="Total Expense">
          <p>₹ {expense}</p>
          <Button
            text={"Add Expense"}
            blue="true"
            onClick={() => setIsExpenseModalVisible(true)}
          />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
