import React, { useState, useRef } from "react";
import { Form, Input } from "antd";
import "./registrationform.scss";
import "../../../shared/button/button.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../../redux/moduels/user";
import { LoadingOutlined } from "@ant-design/icons";

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

const RegistrationForm = props => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [name, setName] = useState("");
  const [form] = Form.useForm();
  const nameInput = useRef();
  const emailInput = useRef();
  const pwdInput = useRef();
  const pwdCheckInput = useRef();
  const is_Loading = useSelector(state => state.user.isLoading);

  const signUp = () => {
    // const nameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;

    if (name.length === 0) {
      window.alert("닉네임을 입력해주세요.");
      nameInput.current.focus();
      return;
    } else if (name.length > 19) {
      window.alert("닉네임은 20자 이내로 해야합니다.");
      nameInput.current.focus();
      return;
    } else if (!emailCheck.test(id)) {
      window.alert("이메일 형식으로 입력해주세요!");
      emailInput.current.focus();
      return;
    } else if (pwd.length < 6 || 19 < pwd.length) {
      window.alert("비밀번호는 6~20자 이내로 입력해주세요!");
      pwdInput.current.focus();
      return;
    } else if (pwd !== pwd_check) {
      window.alert("비밀번호와 비밀번호확인 값이 다릅니다!");
      pwdCheckInput.current.focus();
      return;
    }

    // if (id === "" && pwd === "" && name === "") {
    //   window.alert("닉네임, 아이디, 패스워드를 모두 입력해주세요!");
    //   nameInput.current.focus();
    //   return;
    // } else if (name === "") {
    //   window.alert("아이디를 입력해주세요!");
    //   nameInput.current.focus();
    //   return;
    // } else if (id === "") {
    //   window.alert("이메일을 입력해주세요!");
    //   emailInput.current.focus();
    //   return;
    // } else if (pwd === "") {
    //   window.alert("패스워드를 입력해주세요!");
    //   pwdInput.current.focus();
    //   return;
    // } else if (pwd_check === "") {
    //   window.alert("확인용 패스워드를 입력해주세요!");
    //   pwdCheckInput.current.focus();
    //   return;
    // }
    dispatch(userActions.signUpDB(id, pwd, name));

    if (is_Loading === false) {
      nameInput.current.focus();
    }
  };

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      scrollToFirstError
    >
      <label htmlFor='name' className='formLabel'>
        <span style={{ color: "red" }}>*</span> 닉네임
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
          placeholder='1~20자 이내로 입력해주세요'
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
          ref={emailInput}
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
          },
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              } else if (value.length < 6) {
                return Promise.reject(
                  new Error("Passwords must be at least 6 characters long.")
                );
              }
            }
          })
        ]}
      >
        <Input.Password
          placeholder='6~20자 이내로 입력해주세요'
          onChange={e => setPwd(e.target.value)}
          ref={pwdInput}
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
              if (!value) {
                return Promise.resolve();
              } else if (value.length < 6) {
                return Promise.reject(
                  new Error("Passwords must be at least 6 characters long.")
                );
              } else if (getFieldValue("password") !== value) {
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              }
            }
          })
        ]}
      >
        <Input.Password
          placeholder='비밀번호를 한 번 더 입력해주세요'
          onChange={e => setPwdCheck(e.target.value)}
          ref={pwdCheckInput}
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
        <button htmltype='submit' className='btn' onClick={signUp}>
          회원가입
        </button>
      )}
    </Form>
  );
};

export default RegistrationForm;
