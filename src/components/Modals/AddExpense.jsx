import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
const AddExpense = ({
  isExpenseModalVisible,
  setIsExpenseModalVisible,
  onFinish,
}) => {
  const { form } = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "600" }}
      open={isExpenseModalVisible}
      title="Add Expense"
      onCancel={() => setIsExpenseModalVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          
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
              message: "Please input the expense amount!",
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
              message: "Please input the date for expense!",
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
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="office">Office</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">Add Income</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
