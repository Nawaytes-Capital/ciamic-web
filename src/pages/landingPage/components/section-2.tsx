import mockup from "../../../assets/images/mockup-2.png";
import chat from "../../../assets/images/chat-2.png";
import iconCheck from "../../../assets/images/icon-check.png"

const Section2 = () => {
    const profit = [
        {
            id: 1,
            value: 'Mendapatkan Rekomendasi Pelanggan Baru'
        },
        {
            id: 2,
            value: 'Upsell penjualan kepada calon client mu'
        },
        {
            id: 3,
            value: 'Analisa tentang kompetitor produk telkom'
        },
        {
            id: 4,
            value: 'Strategi Komunikasi untuk berhadapan dengan calon client'
        },
        {
            id: 5,
            value: 'Rekomendasi Produk terhadap usecase yang didapatkan'
        }
    ]
    return (
        <section className='section-2'>
          <div className="section-left">
            <img src={mockup} className="mockup" />
            <img src={chat} className="chat"/>
          </div>
          <div className="section-right">
            <p className="title">
                Keuntungan Menggunakan Ciamic
            </p>
            {profit.map((item) => (
                <div className="text-wp">
                    <img src={iconCheck} height="32px" />
                    <p className="subtitle">
                        {item.value}
                    </p>
                </div>
            ))}
          </div>
        </section>
    )
}

export default Section2;