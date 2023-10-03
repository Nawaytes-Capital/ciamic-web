import { useState } from "react";
import accent from "../assets/images/background-2.png";
import img1 from "../assets/images/img-content-1.png";
import img2 from "../assets/images/img-content-2.png";
import img3 from "../assets/images/img-content-3.png";

const Section3 = () => {
    const content = [
        {
            id: 1,
            title: "Login dengan Email yang terdaftar",
            subtitle: "Buka website Ciamic dan login dengan email yang terdaftar sebelumnya"
        },
        {
            id: 2,
            title: "Tanyakan Apapun di Chatbot Ciamic",
            subtitle: "Tulis pertanyaan kamu di menu chat interface"
        },
        {
            id: 3,
            title: "Dapatkan Rekomendasi dari Ciamic",
            subtitle: "Chatbot akan menjawab pertanyaan mu dan bisa kamu gunakan untuk membantu Analisa sesuai dengan keperluan"
        }
    ]
    const [idContent, setIdContent] = useState<number>(1)
    return (
        <section className='section-3'>
            <img src={accent} className="img"/>
            <p className="title">
                Cara menggunakan ciamic
            </p>
            <div style={{display: "flex", width: '100%'}}>
                <div className="section-left">
                    {content.map((item, index) => (
                        <div className={`container-wrapper ${idContent === item.id && 'active'}`} onClick={() => setIdContent(item.id)}>
                            <div className="number">{index + 1}</div>
                            <div className="content-wrapper">
                                <div className="title-content">{item.title}</div>
                                <div className="subtitle">{item.subtitle}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section-right">
                    {idContent === 1 && (
                        <img src={img1} width="100%"/>
                    )}
                    {idContent === 2 && (
                        <img src={img2} width="100%"/>
                    )}
                    {idContent === 3 && (
                        <img src={img3} width="100%"/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Section3;