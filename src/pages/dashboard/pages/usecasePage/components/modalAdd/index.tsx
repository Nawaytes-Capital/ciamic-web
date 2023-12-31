/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal as AntdModal } from "antd";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useEffect, useState } from "react";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import * as yup from "yup";
interface IAddBatch {
  id_batch: string;
  questions: IQuestion[];
}
export interface IQuestion {
  id: number;
  question: string;
  required: boolean;
}
interface IModalFilter {
  handleCancel: () => void;
  isShow: boolean;
  questionList: IQuestion[];
  idBatch: string;
}

const defaultQuestion = [
  {
    id: uuidv4(),
    question: "",
    required: false,
  },
];

export const ModalAdd = ({
  handleCancel,
  isShow,
  questionList,
  idBatch,
}: IModalFilter) => {
  const [listQuestion, setListQuestion] = useState<any[]>(defaultQuestion);
  const handleAddQuestion = () => {
    const newId = listQuestion[listQuestion.length - 1].id + 1;
    console.log("newId", newId);
    const payload = {
      id: newId,
      question: "",
      required: true,
    };

    const tempDataAdd = [...listQuestion, payload];
    setListQuestion(tempDataAdd);
    form.setFieldValue("questions", tempDataAdd);
  };

  const validation = yup.object().shape({
    id_batch: yup.string().required("Required"),
    // min 1 array
    questions: yup.array().of(
      yup.object().shape({
        question: yup.string().trim().required("Pertanyaan harus diisi"),
        required: yup.boolean(),
      })
    ),
  });

  const form = useFormik<IAddBatch>({
    initialValues: {
      id_batch: idBatch,
      questions: questionList,
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: async (values) => {
      console.log("values", values);
      const payload = {
        ...values,
        questions: listQuestion,
      };
    },
  });
  const handleDelete = (id: number) => {
    setListQuestion(listQuestion.filter((item) => item.id !== id));
    // delete last index question touched
    if (form.touched.questions) {
      const index = form.values.questions.findIndex((item) => item.id === id);
      form.setTouched({
        ...form.touched,
        questions: form.touched.questions.filter((_, i) => i !== index),
      });
    }
    form.setFieldValue(
      "questions",
      listQuestion.filter((item) => item.id !== id)
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedQuestions = listQuestion.map((data) => {
      if (data.id === id) {
        return { ...data, question: e.target.value };
      }
      return data;
    });
    setListQuestion(updatedQuestions);
    form.setFieldValue("questions", updatedQuestions);
  };
  const handleChangeCheckbox = (e: CheckboxChangeEvent, id: string) => {
    const updatedQuestions = listQuestion.map((data) => {
      if (data.id === id) {
        return { ...data, required: e.target.checked };
      }
      return data;
    });
    form.setFieldValue("questions", updatedQuestions);
    setListQuestion(updatedQuestions);
  };

  useEffect(() => {
    form.resetForm();
    console.log("listQuestion", questionList);
    form.setFieldValue("questions", questionList);
    form.setFieldValue("id_batch", idBatch);
    setListQuestion(questionList);
  }, [isShow]);

  useEffect(() => {
    console.log("values", form.values);
    console.log("errors", form.errors);
    console.log("touched", form.touched);
  }, [form.errors, form.values, form.touched]);

  return (
    <AntdModal
      title={<h3 className='title-page'>Edit Batch</h3>}
      footer={
        <div className='flex justify-center mt-8'>
          <Button
            disabled={listQuestion.length === 0}
            className='btn-secondary '
            style={{ width: "250px" }}
            onClick={handleCancel}
          >
            Simpan Sebagai Draft
          </Button>
          <Button
            disabled={listQuestion.length === 0}
            className='btn-primary'
            style={{ width: "250px" }}
            onClick={() => form.handleSubmit()}
          >
            Simpan
          </Button>
        </div>
      }
      onCancel={handleCancel}
      open={isShow}
      width={850}
      className='modal-add-usecase'
      destroyOnClose
    >
      <Form onFinish={form.handleSubmit}>
        <Form.Item>
          <div className='form-group'>
            <p className='title-form'>ID Batch</p>
            <Input
              name='id_batch'
              type='text'
              className='form-control ps-15 bg-transparent'
              placeholder='Masukkan Email Anda'
              style={{ height: "48px" }}
              value={form.values.id_batch}
              disabled
            />
          </div>
        </Form.Item>
        {listQuestion?.map((item, index) => (
          <Form.Item>
            <div className='form-group'>
              <p className='title-form'>Pertanyaan {index + 1}</p>
              <div className='wrapper-input-usecase'>
                <Input
                  name={`questions[${index}].question`}
                  type='text'
                  className='form-control ps-15 bg-transparent'
                  placeholder='Contoh: apa itu box?'
                  style={{ height: "48px" }}
                  onChange={(e) => handleChange(e, item.id)}
                  onBlur={(e) => handleChange(e, item.id)}
                  value={item.question}
                />
                <div
                  className='btn-delete-usecase'
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteOutlined />
                </div>
              </div>

              <p className='error-form'>
                {form.errors.questions &&
                  form.errors.questions[index] &&
                  (form.errors.questions[index] as FormikErrors<IQuestion>)
                    .question &&
                  form.touched.questions &&
                  form.touched.questions[index] &&
                  (form.touched.questions[index] as FormikTouched<IQuestion>)
                    .question && (
                    <span>
                      {
                        (
                          form.errors.questions[
                            index
                          ] as FormikErrors<IQuestion>
                        ).question
                      }
                    </span>
                  )}
              </p>
              <Checkbox
                onChange={(e) => handleChangeCheckbox(e, item.id)}
                defaultChecked={item.required}
                name={`questions[${index}].required`}
              >
                Set sebagai pertanyaan wajib
              </Checkbox>
            </div>
          </Form.Item>
        ))}
        <p className='error-form'>
          {listQuestion.length === 0 && "Minimal 1 Pertanyaan"}
        </p>
        <div className='add-wrarpper' onClick={handleAddQuestion}>
          <PlusOutlined style={{ marginRight: "8px" }} />
          Add Pertanyaan
        </div>
      </Form>
    </AntdModal>
  );
};
