import { HashLink } from "react-router-hash-link";
import illustration from "../../../assets/images/illustration.png";
import { Button } from "antd";

const Footer = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <section className='section-footer'>
      <div className='section-left'>
        <img src={illustration} className='img' />
      </div>
      <div className='section-right'>
        <div className='content-wp'>
          <p className='title'>Siap Untuk Perubahan?</p>
          <p className='subtitle'>
            Gunakan CIAMIC untuk mendukung <br /> kegiatan penjualan mu terhadap
            Client!
          </p>
        </div>
        <HashLink
          smooth
          to='/#home'
          style={{
            textDecoration: "none",
          }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <Button type='primary' htmlType='submit' className='btn-footer'>
            Gunakan Sekarang
          </Button>
        </HashLink>
      </div>
    </section>
  );
};

export default Footer;
