import { Button, Form, Input, message } from "antd";
import "./style.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/forgotPassword";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    handleForgotPassword();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email harus valid").required("Email dibutuhkan"),
  });

  const form = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      handleSubmit();
    },
  });

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      await forgotPassword(form.values.email);
      setIsLoading(false);
      const email = btoa(form.values.email);
      navigate(`/check-forgot-password/${email}`);
    } catch (error) {
      setIsLoading(false);
      message.error("Email tidak terdaftar");
    }
  };

  // useEffect(() => {
  //   console.log(form.values.email);
  //   console.log(form.errors);
  // }, [form.values.email, form.errors]);

  return (
    <div className='forgot-password-wp'>
      <div className='container'>
        <img src={"logo512.png"} className='logo' alt='logo' />
        <Form
          className='form'
          initialValues={{
            email: "",
          }}
          onFinish={form.handleSubmit}
        >
          <Form.Item
            label={<span className='title'>Email</span>}
            required={false}
            labelCol={{ span: 24 }}
            name='email'
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                max: 255,
                message: "Email must be less than 255 characters!",
              },
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input
              placeholder='Masukan Email Anda'
              className='input'
              name='email'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className='btn'
              htmlType='submit'
              type='primary'
              loading={isLoading}
            >
              Kirim Email
            </Button>
          </Form.Item>
        </Form>
        <div className='back-to-login' onClick={handleBackToLogin}>
          <ArrowLeftOutlined />
          <span>Kembali ke halaman login</span>
        </div>
      </div>
    </div>
  );
}
