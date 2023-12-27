import mockup from "../../../assets/images/mockup.png";
import chat from "../../../assets/images/chat-1.png";

const Section1 = () => {
    return (
      <section className='section-1'>
        <div className='section-left'>
          <p className='title'>
            CIAMIC (Chatbot Intelligence for Account Manager In Collaboration)
          </p>
          <p className='subtitle'>
            Engine yang akan membantu teman teman Account Manager, AFRAM, dan
            HERO dalam mendapatkan knowledge tentang produk Telkom, strategi
            untuk mendapatkan pelanggan, hingga rekomendasi pelanggan.
            <p style={{ marginTop: "18px" }} />
            CIAMIC merupakan hasil inisiatif yang bertujuan untuk mendukung
            strategi besar Telkom (5 Bold Moves) untuk Switch dari B2C Menjadi
            B2B dari Kolaborasi antara TCUC, DBT, dan CX.
          </p>
        </div>
        <div className='section-right'>
          <img src={mockup} className='mockup' />
          <img src={chat} className='chat' />
        </div>
      </section>
    );
}

export default Section1;