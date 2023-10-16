import illustration from '../../../../assets/images/illustration.png'
import { Button, Form, Input } from 'antd';
import logo from '../../../../assets/images/logo-ciamic.png'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import './styles.scss'
import HeaderUsecase from '../header';
interface ILoginRequest {
	email: string;
	password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const validationLogin = yup.object().shape({
      email: yup
      .string()
      .email("must be a valid email")
      .required("email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@telkom\.co\.id$/,
        "must be a valid telkom email"
      ),
      password: yup.string().matches(
          /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters with Number"
        ).required("password is required")
    });
    const form = useFormik<ILoginRequest>({
      initialValues: {
          email: "",
          password: "",
      },
      enableReinitialize: true,
      validationSchema: validationLogin,
      onSubmit: async(values) => {
          console.log("login : ", values);
          localStorage.setItem("userEmail", values.email);
          navigate('/usecase-form')
      },
    });
    return (
        <>
            <HeaderUsecase />
            <div className='container-wrapper-login'>
                <section className='login-wrapper'>
                    <div className='section-left'>
                    <h2 className='title-hero'>
                        Dekati Target <br />
                        Konsumen <br />
                        Dan Raih Target <br />
                        Bulanan
                    </h2>
                    <h2 className='title-hero-mobile'>
                        Dekati Target Konsumen Dan Raih Target Bulanan
                    </h2>
                    <img src={illustration} className='illustration' />
                    </div>
                    <div className='section-right'>
                    <div className='form-wrapper'>
                        <div className='title-wp'>
                        <p className='title-form'>Masuk Ke Akun Anda</p>
                        <p className='subtitle-form m-hide'>
                            Silahkan masukkan username dan password yang sesuai
                        </p>
                        <img src={logo} className='logo-mobile' />
                        </div>
                        <Form onFinish={form.handleSubmit}>
                        <Form.Item>
                            <div className='form-group'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text bg-transparent'>
                                <i className='ti-user'></i>
                                </span>
                                <Input
                                name='email'
                                type='text'
                                className='form-control ps-15 bg-transparent'
                                placeholder='Email'
                                style={{ height: "48px" }}
                                value={form.values.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                />
                            </div>
                            {form.touched.email && form.errors.email ? (
                                <span className='text-error'>{form.errors.email}</span>
                            ) : null}
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div className='form-group'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text  bg-transparent'>
                                <i className='ti-lock'></i>
                                </span>
                                <Input.Password
                                name='password'
                                type='password'
                                className='form-control ps-15 bg-transparent'
                                placeholder='Password'
                                style={{ height: "48px" }}
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                />
                            </div>
                            {form.touched.password && form.errors.password ? (
                                <span className='text-error'>{form.errors.password}</span>
                            ) : null}
                            </div>
                        </Form.Item>
                        <p className='forgot'>Lupa Password?</p>
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{
                            height: "48px",
                            width: "100%",
                            backgroundColor: "#003BA1",
                            }}
                        >
                            Masuk
                        </Button>
                        <p style={{ marginTop: "24px" }} className='subtitle-form'>
                            Belum punya akun?{" "}
                            <span onClick={() => navigate("/register")}>
                            Daftar Sekarang!
                            </span>
                        </p>
                        </Form>
                    </div>
                    </div>
                </section>
            </div>
      </>
    );
}

export default LoginPage