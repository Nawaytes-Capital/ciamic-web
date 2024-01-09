import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo-ciamic.png';
import './styles.scss'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { register } from "../../api/auth";
interface IRegisterRequest {
	name: string;
	email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const validation = yup.object().shape({
      name: yup.string().required("Nama wajib diisi"),
      email: yup
        .string()
        .email("Email tidak valid")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email tidak valid")
        // .matches(
        //   /^[a-zA-Z0-9._%+-]+@telkom\.co\.id$/,
        //   "must be a valid telkom email"
        // )
        .required("Email wajib diisi"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Password harus mengandung setidaknya 1 huruf kapital, 1 huruf kecil dan 1 angka"
        )
        .required("Password wajib diisi"),
      confirmPassword: yup
        .string()
        .required("Konfirmasi password wajib diisi")
        .test(
          "passwords-match",
          "Konfirmasi password harus sama",
          function (value) {
            return this.parent.password === value;
          }
        ),
    });
    const form = useFormik<IRegisterRequest>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      enableReinitialize: true,
      validationSchema: validation,
      onSubmit: async (values) => {
        setIsLoading(true);
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        // console.log(btoa(values.email));
        try {
          const auth = await register(payload);
          message.success({
            content: `${auth.data.message}`,
          });
          setIsLoading(false);
          const emailBase64 = btoa(values.email);
          // navigate('/confirmation/')
          navigate(`/confirmation/${emailBase64}`);
        } catch (error: any) {
          setIsLoading(false);
          message.error({
            content: `${error?.response?.data?.message}`,
          });
        }
      },
    });
    return (
        <div className="register-wp">
            <div className='form-wrapper'>
              <div className='title-wp'>
                <img src={logo} className='logo' />
                <p className='title'>Daftar Sekarang!</p>
              </div> 
              <Form onFinish={form.handleSubmit}>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">Nama <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-transparent">
                        <i className="ti-user"></i>
                      </span>
                      <Input
                        type="text"
                        name="name"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Nama Anda"
                        style={{height: "48px"}}
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </div>
                    {form.touched.name && form.errors.name ? (
                      <span className="text-error">{form.errors.name}</span>
                    ) : null}
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">Email <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input
                        name="email"
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Email Anda"
                        style={{height: "48px"}}
                        value={form.values.email}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </div>
                    {form.touched.email && form.errors.email ? (
                      <span className="text-error">{form.errors.email}</span>
                    ) : null}
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">Password <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input.Password
                        name="password"
                        type="password"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Password Anda"
                        style={{height: "48px"}}
                        value={form.values.password}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </div>
                    {form.touched.password && form.errors.password ? (
                      <span className="text-error">{form.errors.password}</span>
                    ) : null}
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="form-group">
                    <p className="title-form">Confirm Password <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input.Password
                        name="confirmPassword"
                        type="password"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Konfirmasi Password Anda"
                        style={{height: "48px"}}
                        value={form.values.confirmPassword}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                    </div>
                    {form.touched.confirmPassword && form.errors.confirmPassword ? (
                      <span className="text-error">{form.errors.confirmPassword}</span>
                    ) : null}
                  </div>
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading} style={{height: "48px", width: "100%", backgroundColor: "#003BA1", color: "#fff"}}>
                  Daftar {isLoading && (<LoadingOutlined />)}
                </Button>
                <p style={{marginTop: "24px"}} className='subtitle-form'>Sudah punya akun? <span onClick={() => navigate('/')}>Masuk!</span></p>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage;