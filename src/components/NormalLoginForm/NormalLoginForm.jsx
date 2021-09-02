import React from 'react';
import { Form, Input, Button } from 'antd';
import './normalloginform.scss';
import '../../shared/button.scss'

const NormalLoginForm = () => {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
    >
      <Form.Item
        name="userId"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={"* 아이디"} placeholder="이메일 형식으로 입력해주세요" />
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
       >
        <Input prefix={"* 비밀번호"} type="password" placeholder="6자 이상을 입력해주세요" />
      </Form.Item>

      <Form.Item className="button">
        <Button type="primary" htmlType="submit" className="login-form-button btn">
          로그인
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;