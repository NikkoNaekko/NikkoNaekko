import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import './registrationform.scss';
import '../../shared/button/button.scss'

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

    <Form.Item
        name="name"
        rules={[
          {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
          },
        ]}
    >
        <Input prefix={"* 닉네임"} placeholder="닉네임을 입력해주세요"/>
      </Form.Item>

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
        <Input prefix={"* 이메일"} placeholder="이메일 형식으로 입력해주세요"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password prefix={"* 비밀번호"} placeholder="6자리 이상을 입력해주세요"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {              
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              } else if ( Number(value.length) < 6 ) {
                return Promise.reject(new Error('Passwords must be at least 6 characters long.'));
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={"* 비밀번호 확인"} placeholder="비밀번호를 한 번 더 입력해주세요"/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout} className="button">
        <Button type="primary" htmlType="submit" className="btn">
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;