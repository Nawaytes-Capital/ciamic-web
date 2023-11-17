/* eslint-disable jsx-a11y/alt-text */
import { RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import accent from "../../../assets/images/background-2.png";
import img1 from "../../../assets/images/img-content-1.png";
import img2 from "../../../assets/images/img-content-2.png";
import img3 from "../../../assets/images/img-content-3.png";

const Section3 = () => {
  const [idContent, setIdContent] = useState<number>(1);
  const slider = React.useRef<any>(null);
  const content = [
    {
      id: 1,
      title: "Login dengan Email yang terdaftar",
      subtitle:
        "Buka website Ciamic dan login dengan email yang terdaftar sebelumnya",
      img: img1,
    },
    {
      id: 2,
      title: "Tanyakan Apapun di Chatbot Ciamic",
      subtitle: "Tulis pertanyaan kamu di menu chat interface",
      img: img2,
    },
    {
      id: 3,
      title: "Dapatkan Rekomendasi dari Ciamic",
      subtitle:
        "Chatbot akan menjawab pertanyaan mu dan bisa kamu gunakan untuk membantu Analisa sesuai dengan keperluan",
      img: img3,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className='section-3'>
      <img src={accent} className='img' />
      <p className='title' id='cara-penggunaan'>
        Cara menggunakan ciamic
      </p>
      <div className='slider-mobile'>
        <button
          onClick={() => slider?.current?.slickNext()}
          className='arrow-next'
        >
          <RightOutlined />
        </button>
        <Slider ref={slider} {...settings}>
          {content.map((item, index) => (
            <div
              className='slider-wrapper'
              onClick={() => {
                setIdContent(item.id);
                // resetInterval();
              }}
            >
              <div
                className='img-wp'
                style={item.id === 1 ? { paddingBottom: "59px" } : {}}
              >
                <img src={item.img} width='100%' />
              </div>
              <div className='content-wrapper'>
                <div className='title-content'>{item.title}</div>
                <div className='subtitle'>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className='m-hide' style={{ display: "flex", width: "100%" }}>
        <div className='section-left'>
          {content.map((item, index) => (
            <div
              className={`container-wrapper ${
                idContent === item.id && "active"
              }`}
              onClick={() => setIdContent(item.id)}
            >
              <div className='number'>{index + 1}</div>
              <div className='content-wrapper'>
                <div className='title-content'>{item.title}</div>
                <div className='subtitle'>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div className='section-right'>
          {idContent === 1 && <img src={img1} width='100%' />}
          {idContent === 2 && <img src={img2} width='100%' />}
          {idContent === 3 && <img src={img3} width='100%' />}
        </div>
      </div>
    </section>
  );
};

export default Section3;
