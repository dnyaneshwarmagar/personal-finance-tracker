import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
const AddIncome = ({
  isIncomeModalVisible,
  setIsIncomeModalVisible,
  onFinish,
}) => {
  const { form } = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "600" }}
      open={isIncomeModalVisible}
      title="Add Income"
      onCancel={() => setIsIncomeModalVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the Income amount!",
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the date for Income!",
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please input the tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncome;
