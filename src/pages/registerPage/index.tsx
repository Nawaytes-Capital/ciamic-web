import { Button, Form, Input } from "antd";
import logo from '../../assets/images/logo-ciamic.png';
import './styles.scss'

const RegisterPage = () => {
    return (
        <div className="register-wp">
            <div className='form-wrapper'>
              <div className='title-wp'>
                <img src={logo} className='logo' />
                <p className='title'>Daftar Sekarang!</p>
              </div> 
              <Form>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <div className="form-group">
                    <p className="title-form">Nama <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-transparent">
                        <i className="ti-user"></i>
                      </span>
                      <Input
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Nama Anda"
                        style={{height: "48px"}}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <div className="form-group">
                    <p className="title-form">Email <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Email Anda"
                        style={{height: "48px"}}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <div className="form-group">
                    <p className="title-form">Password <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input.Password
                        type="password"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Masukkan Password Anda"
                        style={{height: "48px"}}
                        />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <div className="form-group">
                    <p className="title-form">Confirm Password <span>*</span></p>
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input.Password
                        type="password"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Konfirmasi Password Anda"
                        style={{height: "48px"}}
                        />
                    </div>
                  </div>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{height: "48px", width: "100%", backgroundColor: "#003BA1"}}>
                  Daftar
                </Button>
                <p style={{marginTop: "24px"}} className='subtitle-form'>Sudah punya akun? <span>Masuk!</span></p>
                </Form>
            </div>
        </div>
    )
}

export default RegisterPage;