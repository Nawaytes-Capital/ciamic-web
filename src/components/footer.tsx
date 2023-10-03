import illustration from '../assets/images/illustration.png'
import { Button, Form, Input } from 'antd';

const Footer = () => {
    return (
        <section className='section-footer'>
          <div className='section-left'>
            <img src={illustration} className="img" />
          </div>
          <div className='section-right'>
            <div style={{width: "500px", zIndex: "3"}}>
                <p className='title'>
                    Siap Untuk Perubahan?
                </p>
                <p className='subtitle'>
                    Gunakan CIAMIC untuk mendukung <br /> kegiatan penjualan mu terhadap Client!
                </p>
            </div>
            <Button type="primary" htmlType="submit" style={{height: "48px", width: "500px", backgroundColor: "#003BA1", borderRadius: "16px"}}>
                 Gunakan Sekarang
            </Button>
          </div>
        </section>
    )
}

export default Footer