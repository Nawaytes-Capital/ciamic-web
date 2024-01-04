import { Button, Form, Input } from "antd";
import "./style.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className='forgot-password-wp'>
      <div className='container'>
        <img src={"logo512.png"} className='logo' alt='logo' />
        <Form
          className='form'
          initialValues={{
            email: "",
          }}
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
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleSubmit}
              className='btn'
              htmlType='submit'
              type='primary'
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
