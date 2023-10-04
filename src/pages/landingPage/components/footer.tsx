import illustration from '../../../assets/images/illustration.png'
import { Button } from 'antd';

const Footer = () => {
    return (
        <section className='section-footer'>
          <div className='section-left'>
            <img src={illustration} className="img" />
          </div>
          <div className='section-right'>
            <div className='content-wp'>
                <p className='title'>
                    Siap Untuk Perubahan?
                </p>
                <p className='subtitle'>
                    Gunakan CIAMIC untuk mendukung <br /> kegiatan penjualan mu terhadap Client!
                </p>
            </div>
            <Button type="primary" htmlType="submit" className='btn-footer'>
                 Gunakan Sekarang
            </Button>
          </div>
        </section>
    )
}

export default Footer