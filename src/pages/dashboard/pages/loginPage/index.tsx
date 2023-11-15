import illustration from '../../../../assets/images/illustration.png'
import { Button, Form, Input } from 'antd';
import logo from '../../../../assets/images/logo-ciamic.png'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import './styles.scss'
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
      onSubmit: async (values) => {
        localStorage.setItem("userEmail", values.email);
        navigate("/dashboard/usecase");
      },
    });
    return (
        <div id='login-dashboard'>
            <div className='container-wrapper-login'>
                <section className='login-wrapper'>
                    <div className='section-left'>
                    <h2 className='title-hero'>
                        Admin Dashboard
                    </h2>
                    <img src={illustration} className='illustration' />
                    </div>
                    <div className='section-right'>
                    <div className='form-wrapper'>
                        <img src={logo} className='logo' />
                        <Form onFinish={form.handleSubmit}>
                        <Form.Item>
                            <div className='form-group'>
                            <div className='input-group mb-3'>
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
                        </Form>
                    </div>
                    </div>
                </section>
            </div>
      </div>
    );
}

export default LoginPage