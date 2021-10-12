import React, { useState, useRef } from "react";
import { Form, Input, Select } from "antd";
import "./registrationform.scss";
import "../../shared/button/button.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/moduels/user";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
const RegistrationForm = props => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const nameInput = useRef();
  const is_Loading = useSelector(state => state.user.isLoading);

  const signUp = () => {
    dispatch(userActions.signUpDB(id, pwd, name));

    if (is_Loading === false) {
      nameInput.current.focus();
    }
  };

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map(domain => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
    >
      <label htmlFor='name' className='formLabel'>
        <span style={{ color: "red" }}>*</span> 아이디
      </label>
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true
          }
        ]}
      >
        <Input
          placeholder='닉네임을 입력해주세요'
          onChange={e => setName(e.target.value)}
          ref={nameInput}
        />
      </Form.Item>

      <label htmlFor='userId' className='formLabel'>
        <span style={{ color: "red" }}>*</span> 이메일
      </label>
      <Form.Item
        name='userId'
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input
          placeholder='이메일 형식으로 입력해주세요'
          onChange={e => setId(e.target.value)}
        />
      </Form.Item>
      <label htmlFor='password' className='formLabel'>
        <span style={{ color: "red" }}>*</span> 비밀번호
      </label>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input.Password
          placeholder='6자리 이상을 입력해주세요'
          onChange={e => setPwd(e.target.value)}
        />
      </Form.Item>

      <label htmlFor='confirm' className='formLabel'>
        <span style={{ color: "red" }}>*</span> 비밀번호 확인
      </label>
      <Form.Item
        name='confirm'
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              } else if (Number(value.length) < 6) {
                return Promise.reject(
                  new Error("Passwords must be at least 6 characters long.")
                );
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            }
          })
        ]}
      >
        <Input.Password
          placeholder='비밀번호를 한 번 더 입력해주세요'
          onChange={e => setPwdCheck(e.target.value)}
        />
      </Form.Item>
      {is_Loading ? (
        <button className='btn btn_gray'>
          회원가입 중
          <LoadingOutlined
            style={{
              position: "relative",
              left: "30px",
              fontSize: "20px"
            }}
          />
        </button>
      ) : (
        <button htmlType='submit' className='btn' onClick={signUp}>
          회원가입
        </button>
      )}
    </Form>
  );
};

export default RegistrationForm;
