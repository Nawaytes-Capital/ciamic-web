/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { ModalDelete } from "./components/modalDelete";
import { createAdminApi, getAdminListApi } from "../../../../api/dashboard";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { logoutApp } from "../../../../redux/features/auth/authSlice";

export interface IAddAdmin {
  name: string;
  email: string;
  number_phone: string;
}

interface IDataAdmin {
  id: number;
  name: string;
  number_phone: string;
  email: string;
}

// const dataSource = [
//   {
//     key: "1",
//     id: "ID328721",
//     name: "Ahmad Arive",
//     number_phone: "081219281293",
//     email: "arvie@telkom.co.id",
//   },
//   {
//     key: "2",
//     id: "ID328722",
//     name: "Ahmad Rizal",
//     number_phone: "081219281293",
//     email: "arvie@telkom.co.id",
//   },
//   {
//     key: "3",
//     id: "ID328723",
//     name: "Ahmad Tommo",
//     number_phone: "081219281293",
//     email: "arvie@telkom.co.id",
//   },
// ];
const AdminManagementpage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [dataSource, setDataSource] = useState<IDataAdmin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDetail = (data: IDataAdmin) => {
    setDetail(data);
    setIsShow(true);
  };

  const fetchAdminList = async () => {
    try {
      const response = await getAdminListApi();
      const data: IDataAdmin[] = response.data.data.map((item) => {
        return {
          id: item.user_id,
          name: item.name,
          number_phone: item.phone_number,
          email: item.email,
        };
      });
      setDataSource(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
        }
      }
    }
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string, record: any, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "ID Admin",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "No. Handphone",
      dataIndex: "number_phone",
      key: "number_phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      render: (text: string, record: any, index: number) => {
        return (
          <div>
            <EditOutlined onClick={() => handleDetail(record)} />
            <DeleteOutlined
              onClick={() => setIsDelete(true)}
              style={{ marginLeft: "8px" }}
            />
          </div>
        );
      },
    },
  ];
  const validation = yup.object().shape({
    email: yup
      .string()
      .email("must be a valid email")
      .required("email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "must be a valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@telkom\.co\.id$/,
        "must be a valid telkom email"
      ),
    name: yup.string().required("name is required"),
    number_phone: yup.string().required("email is required"),
  });
  const form = useFormik<IAddAdmin>({
    initialValues: {
      name: detail?.name,
      email: detail?.email,
      number_phone: detail?.number_phone,
    },
    enableReinitialize: true,
    validationSchema: validation,
    onSubmit: async (values) => {
      console.log("add batch : ", values);
      // handleCreateAdmin();
    },
  });

  const handleDelete = () => {
    setIsDelete(false);
  };

  const handleCreateAdmin = async () => {
    try {
      setIsLoading(true);
      console.log("kok kocak sih");
      const response = await createAdminApi({
        email: form.values.email,
        name: form.values.name,
        phone_number: form.values.number_phone,
      });
      setIsShow(false);
      setDetail({
        name: "",
        email: "",
        number_phone: "",
      });
      message.success("Berhasil menambahkan admin");
      fetchAdminList();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
        }
      }
      message.error("Gagal menambahkan admin");
    }
  };

  return (
    <div id='admin-dashboard'>
      <div className='header-wp'>
        <h3 className='title-page'>Admin Management</h3>
        <Button
          className='btn-add'
          onClick={() => {
            setDetail({
              name: "",
              email: "",
              number_phone: "",
            });
            setIsShow(true);
          }}
        >
          Tambah Admin <PlusOutlined style={{ marginLeft: "8px" }} />
        </Button>
      </div>
      <Table className='table-wp' dataSource={dataSource} columns={columns} />
      <ModalAdd
        isShow={isShow}
        handleCancel={() => setIsShow(false)}
        form={form}
        handleSubmit={form.handleSubmit}
        isLoading={isLoading}
      />
      <ModalDelete
        isShow={isDelete}
        handleSubmit={handleDelete}
        handleCancel={() => setIsDelete(false)}
      />
    </div>
  );
};

export default AdminManagementpage;
