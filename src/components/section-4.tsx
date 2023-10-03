import { Button, Form, Input } from "antd";
import accent from "../assets/images/icon-quote.png";

const { TextArea } = Input;
const Section4 = () => {
    return (
        <section className='section-4'>
            <div className="section-left">
                <div className="quote-accent">
                    <img src={accent} height="12px"/>
                </div>
                <p className="title">
                    Kirim Masukan!
                </p> 
                <p className="subtitle">
                    Feedback dari Anda berarti Untuk Kami. 
                </p>

            </div>
            <div className="section-right">
                <div className='form-wrapper'>
                <div className='title-wp'>
                    <p className='title-form'>Isi Form Feedback</p>
                    <p className='subtitle-form'>Apakah kamu punya saran atau menemukan Bug?</p>
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
                            <p style={{marginBottom: "8px"}}>Nama</p>
                            <Input
                                type="text"
                                placeholder="Nama"
                                style={{height: "48px"}}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: "Please input your email!",
                            },
                        ]}
                    >
                        <div className="form-group">
                            <p style={{marginBottom: "8px"}}>Email</p>
                            <Input
                                type="text"
                                placeholder="Email"
                                style={{height: "48px"}}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="suggestion"
                        rules={[
                            {
                            required: true,
                            message: "Please input your suggestion!",
                            },
                        ]}
                    >
                        <div className="form-group">
                            <p style={{marginBottom: "8px"}}>Kirim Masukkan</p>
                            <TextArea
                                placeholder="Suggestion"
                                style={{height: "150px"}}
                            />
                        </div>
                    </Form.Item>
        
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Kirim Masukkan
                    </Button>
    
                </Form>
                </div>
            </div>
        </section>
    )
}

export default Section4;