import React, { useRef } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../../../redux/moduels/user";
import { LoadingOutlined } from "@ant-design/icons";
import "./normalloginform.scss";
import "../../../shared/button/button.scss";

const NormalLoginForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const emailInput = useRef();
  const pwdInput = useRef();

  const onFinish = values => {
    const id = values.userId;
    const pwd = values.password;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailCheck.test(id)) {
      window.alert("이메일 형식으로 입력해주세요!");
      emailInput.current.focus();
      return;
    } else if (pwd.length < 6 || 19 < pwd.length) {
      window.alert("비밀번호는 6~20자 이내로 입력해주세요!");
      pwdInput.current.focus();
      return;
    }
    dispatch(userAction.signIn(values.userId, values.password));
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <label htmlFor='name' className='formLabel'>
        <span style={{ color: "red" }}>*</span>이메일
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
        <Input ref={emailInput} placeholder='이메일 형식으로 입력해주세요' />
      </Form.Item>

      <label htmlFor='name' className='formLabel'>
        <span style={{ color: "red" }}>*</span>비밀번호
      </label>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: "Please input your Password!"
          },
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              } else if (value.length < 6) {
                return Promise.reject(
                  new Error("Passwords must be at least 6 characters long.")
                );
              } else {
                return Promise.resolve();
              }
            }
          })
        ]}
      >
        <Input
          ref={pwdInput}
          type='password'
          placeholder='6~20자 이내로 입력해주세요'
        />
      </Form.Item>
      {isLoading ? (
        <button className='btn btn_gray'>
          로그인 중
          <LoadingOutlined
            style={{
              position: "relative",
              left: "30px",
              fontSize: "20px"
            }}
          />
        </button>
      ) : (
        <button htmltype='submit' className='btn'>
          로그인
        </button>
      )}
    </Form>
  );
};

export default NormalLoginForm;
