import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Form,
	Input,
	Modal as AntdModal,
} from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import "./styles.scss";
import { v4 as uuidv4 } from 'uuid';
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
interface IAddBatch {
  id_batch: string,
  questions: string[],
}
interface IModalFilter {
	handleCancel: () => void,
  isShow: boolean;
}

const defaultQuestion = [
  {
      id: uuidv4(),
      question: "",
      required: false,
  }
]

export const ModalAdd = ({
  handleCancel,
  isShow,
}:IModalFilter) => {
    const [listQuestion, setListQuestion] = useState<any[]>(defaultQuestion);
    const handleAddQuestion = () => {
      const payload = {
        id: uuidv4(),
        question: "",
        required: false,
      }
      
      const tempDataAdd = [...listQuestion, payload];
      setListQuestion(tempDataAdd);
  }

  const form = useFormik<IAddBatch>({
    initialValues: {
        id_batch: "",
        questions: [],
    },
    enableReinitialize: true,
    // validationSchema: validation,
    onSubmit: async(values) => {
      const payload = {
        ...values,
        questions: listQuestion
      }
      console.log("add batch : ", payload);
    },
  }); 
  
  const handleDelete = (id: number) => {
    setListQuestion(
      listQuestion.filter(item =>
        item.id !== id
      )
    );
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedQuestions = listQuestion.map((data) => {
      if (data.id === id) {
        return { ...data, question: e.target.value };
      }
      return data;
    });
    setListQuestion(updatedQuestions);
  };
  const handleChangeCheckbox = (e: CheckboxChangeEvent, id: string) => {
    const updatedQuestions = listQuestion.map((data) => {
      if (data.id === id) {
        return { ...data, required: e.target.checked };
      }
      return data;
    });
    setListQuestion(updatedQuestions);
  };

  
  
  return (
    <AntdModal
      title={
        <h3 className="title-page">Add New Batch</h3>
      }
      footer={
        <div className='flex justify-center mt-8'>
          <Button className='btn-primary' style={{width: "250px"}} onClick={() => form.handleSubmit()}>
            Continue
          </Button>
        </div>
      }
      onCancel={handleCancel}
      open={isShow}
      width={850}
      className="modal-add-usecase"
      destroyOnClose
    >
      <Form onFinish={form.handleSubmit}>
        <Form.Item>
          <div className="form-group">
            <p className="title-form">ID Batch</p>
            <Input
              name="id_batch"
              type="text"
              className="form-control ps-15 bg-transparent"
              placeholder="Masukkan Email Anda"
              style={{height: "48px"}}
              value={form.values.id_batch}
              disabled
            />
          </div>
        </Form.Item>
        {listQuestion?.map((item, index) => (
            <Form.Item>
              <div className="form-group">
                <p className="title-form">Pertanyaan {index + 1}</p>
                <div className="wrapper-input-usecase">
                  <Input
                    name={`listQuestion.${index}.question`}
                    type="text"
                    className="form-control ps-15 bg-transparent"
                    placeholder="Contoh: apa itu box?"
                    style={{height: "48px"}}
                    onChange={(e) => handleChange(e, item.id)}
                    value={item.question}
                  />
                  <div className="btn-delete-usecase">
                    <DeleteOutlined onClick={() => handleDelete(item.id)} />
                  </div>
                </div>
                <Checkbox onChange={(e) => handleChangeCheckbox(e, item.id)} name="catalog">Set sebagai pertanyaan wajib</Checkbox>
              </div>
            </Form.Item>
        ))}
        <div className="add-wrarpper" onClick={handleAddQuestion}>
          <PlusOutlined style={{marginRight: "8px"}} />
          Add Pertanyaan
        </div>
      </Form>
    </AntdModal>
  )
}