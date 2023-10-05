import illustration from '../../../assets/images/illustration.png'
import { Button, Form, Input } from 'antd';
import logo from '../../../assets/images/logo-ciamic.png'
import { useNavigate } from 'react-router-dom';

const SectionHero = () => {
    const navigate = useNavigate();
    return (
        <section className='section-hero'>
          <div className='section-left'>
            <h2 className='title-hero'>Dekati Target <br />Konsumen <br />Dan Raih Target <br />Bulanan</h2>
            <h2 className='title-hero-mobile'>Dekati Target Konsumen Dan Raih Target Bulanan</h2>
            <img src={illustration} className='illustration' />
          </div>
          <div className='section-right'>
            <div className='form-wrapper'>
              <div className='title-wp'>
                <p className='title-form'>Masuk Ke Akun Anda</p>
                <p className='subtitle-form m-hide'>Silahkan masukkan username dan password yang sesuai</p>
                <img src={logo} className='logo-mobile' />
              </div> 
              <Form>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-transparent">
                        <i className="ti-user"></i>
                      </span>
                      <Input
                        type="text"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Username"
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
                    <div className="input-group mb-3">
                      <span className="input-group-text  bg-transparent">
                        <i className="ti-lock"></i>
                      </span>
                      <Input.Password
                        type="password"
                        className="form-control ps-15 bg-transparent"
                        placeholder="Password"
                        style={{height: "48px"}}
                        />
                    </div>
                  </div>
                </Form.Item>
                <p className='forgot'>Lupa Password?</p>
                <Button type="primary" htmlType="submit" style={{height: "48px", width: "100%", backgroundColor: "#003BA1"}}>
                  Masuk
                </Button>
                <p style={{marginTop: "24px"}} className='subtitle-form'>Belum punya akun? <span onClick={() => navigate('/register')}>Daftar Sekarang!</span></p>
              </Form>
            </div>
          </div>
        </section>
    )
}

export default SectionHero