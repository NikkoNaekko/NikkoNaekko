import React from 'react';
import { Form, Input } from 'antd';
import './normalloginform.scss';
import '../../shared/button/button.scss'

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
      <label htmlFor="name" className="formLabel"><span style={{color:'red'}}>*</span>아이디</label>
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
        <Input placeholder="이메일 형식으로 입력해주세요" />
      </Form.Item>
      
      <label htmlFor="name" className="formLabel"><span style={{color:'red'}}>*</span>비밀번호</label>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
       >
        <Input type="password" placeholder="6자 이상을 입력해주세요" />
      </Form.Item>

        <button htmlType="submit" className="btn">
          로그인
        </button>
    </Form>
  );
};

export default NormalLoginForm;