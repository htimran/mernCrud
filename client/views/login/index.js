import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const [form] = Form.useForm();
  const [loginParams, setLoginParams] = useState({
    name: null,
    password: null
  });


  const handleNameChange = event => {
    setLoginParams({
      ...loginParams,
      name: event.target.value,
    });
  }

  const handlePasswordChange = event => {
    setLoginParams({
      ...loginParams,
      password: event.target.value,
    });
  }

  const handleSubmitForm = () => {
    console.log(form);
    debugger;
  }

  return (<React.Fragment>
    <Form
      name="basic"
      initialValues={{
        name: "Imran",
        password: "****************"
      }}>
      <Form.Item
        label="User Name"
        rules={[{
          required: true,
          message: "Name required!"
        }]}>
        <Input
          onChange={handleNameChange}
          placeholder="Enter User Name"
        ></Input>
      </Form.Item>
      <Form.Item
        label="Password"
        rules={[{
          required: true,
          message: "Password required!"
        }]}>
        <Input.Password
          onChange={handlePasswordChange}
          placeholder="Enter password"
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmitForm}>Login</Button>
      </Form.Item>

    </Form>
  </React.Fragment>)
}

export default Login;