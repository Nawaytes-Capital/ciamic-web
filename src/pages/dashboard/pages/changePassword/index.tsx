import "./style.scss";
import logo from "../../../../assets/images/logo512.png";
import { Button, Form, Input, message } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import successLogo from "../../../../assets/images/success-icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../../../api/forgotPassword";

export default function ResetPasswordPage() {
  const [isFinnish, setIsFinnish] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const params = useParams<{ token: string }>();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!params.token) {
      navigate("/");
    }
    try {
      atob(params.token!);
      setIsValid(true);
    } catch (error) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isValid) {
      const base64 = atob(params.token!);
      const token = base64.split("+")[0];
      const email = base64.split("+")[1];
      setToken(token);
      setEmail(email);
    }
  }, [isValid]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password harus memiliki setidaknya 8 karakter")
      .max(255, "Password harus kurang dari 255 karakter")
      .matches(
        //kapital, kecil, angka, 8 karakter
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Password harus mengandung setidaknya 1 huruf kapital, 1 huruf kecil, 1 angka, dan 1 karakter khusus"
      )
      .required("Password dibutuhkan"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password harus cocok")
      .required("Konfirmasi Password dibutuhkan"),
  });

  const form = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      submitResetPassword();
    },
  });


  const submitResetPassword = async () => {
    try {
      setIsLoading(true);
      await changePassword({
        email: email,
        forgot_key: token,
        new_password: form.values.password,
      });
      message.success("Berhasil Ubah Password");
      setIsLoading(false);
      setIsFinnish(true);
    } catch (error: any) {
      setIsLoading(false);
      // console.log(error.response);
      if (error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Gagal Ubah Password");
      }
    }
  };

  return (
    <>
      <div className={`reset-password-page-wp`}>
        <div className={`container  ${isFinnish ? "hide" : ""}`}>
          <img src={logo} className='logo' alt='logo' />
          <span className='title'>Atur Ulang Password</span>
          <div className='content'>
            <span className='description'>
              Password Baru Anda harus berbeda dengan password sebelumnya
            </span>
          </div>
          <Form
            className='form'
            name='basic'
            initialValues={{ remember: true }}
            onFinish={form.handleSubmit}
          >
            <Form.Item
              name={"password"}
              label={<span className='label'>Password</span>}
              required={false}
              labelCol={{ span: 24 }}
              //show 1 error

              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  max: 255,
                  message: "Password must be less than 255 characters!",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                  message:
                    "Password harus mengandung setidaknya 1 huruf kapital, 1 huruf kecil, dan 1 angka",
                },
              ]}
            >
              <Input.Password
                disabled={isLoading}
                placeholder='Password'
                className='input'
                name='password'
                onChange={(e) => {
                  form.setFieldValue("password", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              name={"confirmPassword"}
              label={<span className='label'>Konfirmasi Password</span>}
              required={false}
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  max: 255,
                  message: "Password must be less than 255 characters!",
                },
                // {
                //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                //   message:
                //     "Password harus mengandung setidaknya 1 huruf kapital, 1 huruf kecil, dan 1 angka",
                // },
                {
                  validator(rule, value, callback) {
                    if (value !== form.values.password) {
                      return Promise.reject(
                        "Konfirmasi password harus sama dengan password"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                disabled={isLoading}
                placeholder='Konfirmasi Password'
                className='input'
                name='confirmPassword'
                onChange={(e) => {
                  form.setFieldValue("confirmPassword", e.target.value);
                }}
                onBlur={form.handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Button className='btn' htmlType='submit' loading={isLoading}>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={`success-container ${isFinnish ? "" : "hide"}`}>
          <img src={successLogo} className='logo' alt='logo' />
          <span className='title'>Password Reset</span>
          <div className='content'>
            <span className='description'>
              Password kamu berhasil diganti! Silahkan login dengan klik tombol
              di bawah ini
            </span>
          </div>
          <Button className='btn' onClick={handleBack}>
            Kembali ke halaman awal
          </Button>
        </div>
      </div>
    </>
  );
}
