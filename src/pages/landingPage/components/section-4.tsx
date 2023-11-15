import { Button, Form, Input, message } from "antd";
import accent from "../../../assets/images/icon-quote.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendFeedbackApi } from "../../../api/feedback";

const { TextArea } = Input;
const Section4 = () => {
  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    notes: Yup.string().required("Notes is required"),
  });
  const onSubmit = async (values: any) => {
    try {
      const response = await sendFeedbackApi(values);
      message.success({
        content: `${response.data.message}`,
      });
      form.resetForm();
    } catch (error: any) {
      message.error({
        content: `Terjadi kesalahan saat mengirim feedback`,
      });
    }
  };

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      notes: "",
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: onSubmit,
  });

  return (
    <section className='section-4'>
      <div className='section-left'>
        <div className='quote-accent'>
          <img src={accent} height='12px' />
        </div>
        <p className='title'>Kirim Masukan!</p>
        <p className='subtitle'>Feedback dari Anda berarti Untuk Kami.</p>
      </div>
      <div className='section-right' id='feedback'>
        <div className='form-wrapper'>
          <div className='title-wp'>
            <p className='title-form'>Isi Form Feedback</p>
            <p className='subtitle-form'>
              Apakah kamu punya saran atau menemukan Bug?
            </p>
          </div>
          <Form onFinish={form.handleSubmit}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <div className='form-group'>
                <p style={{ marginBottom: "8px" }}>Nama</p>
                <Input
                  name='name'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.name}
                  type='text'
                  placeholder='Nama'
                  style={{ height: "48px" }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <div className='form-group'>
                <p style={{ marginBottom: "8px" }}>Email</p>
                <Input
                  name='email'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                  type='text'
                  placeholder='Email'
                  style={{ height: "48px" }}
                />
              </div>
            </Form.Item>
            <Form.Item
              name='suggestion'
              rules={[
                {
                  required: true,
                  message: "Please input your suggestion!",
                },
                {
                  min: 10,
                  message: "Suggestion must be at least 10 characters",
                },
              ]}
            >
              <div className='form-group'>
                <p style={{ marginBottom: "8px" }}>Kirim Masukkan</p>
                <TextArea
                  name='notes'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.notes}
                  placeholder='Suggestion'
                  style={{ height: "150px" }}
                />
              </div>
            </Form.Item>

            <Button type='primary' htmlType='submit' className='btn-submit'>
              Kirim Masukkan
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Section4;
