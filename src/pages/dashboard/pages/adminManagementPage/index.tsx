/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Table, message } from "antd";
import { useEffect, useState } from "react";
import { ModalAdd } from "./components/modalAdd";
import "./styles.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { ModalDelete } from "./components/modalDelete";
import {
  createAdminApi,
  deleteAdminApi,
  getAdminListApi,
  updateAdminApi,
} from "../../../../api/dashboard";
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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [setIdAccount, setSetIdAccount] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  const handleDetail = (data: IDataAdmin) => {
    setIsEdit(true);
    setDetail(data);
    setIsShow(true);
    setSetIdAccount(data.id);
  };

  const [page, setPage] = useState<number>(1);

  const fetchAdminList = async () => {
    try {
      const response = await getAdminListApi(page);
      const data: IDataAdmin[] = response.data.data.map((item) => {
        return {
          id: item.user_id,
          name: item.name,
          number_phone: item.phone_number,
          email: item.email,
        };
      });
      setDataSource(data);
      setTotalData(response.data.total);
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
  }, [page]);

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
              onClick={() => {
                setIsDelete(true);
                setSetIdAccount(record.id);
              }}
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
      .email("Email tidak valid")
      .required("Email tidak boleh kosong")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email tidak valid"),
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@telkom\.co\.id$/,
    //   "must be a valid telkom email"
    // ),
    name: yup.string().required("Nama tidak boleh kosong"),
    number_phone: yup
      .string()
      .required("Nomor telepon tidak boleh kosong")
      .min(11, "Minimal 11 karakter")
      .matches(/^[0-9]+$/, "Nomor telepon tidak valid"),
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
      if (isEdit) {
        handleUpdateAmdmin();
      } else handleCreateAdmin();
    },
  });

  const handleDelete = async () => {
    try {
      const response = await deleteAdminApi(setIdAccount);
      message.success({
        content: `${response.data.message}`,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
        }
      } else {
        message.error({
          content: `something went wrong`,
        });
      }
    }
    fetchAdminList();
    setIsDelete(false);
  };

  const handleCreateAdmin = async () => {
    try {
      setIsLoading(true);
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
      form.resetForm();
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

  const handleUpdateAmdmin = async () => {
    try {
      setIsLoading(true);
      const response = await updateAdminApi(setIdAccount, {
        name: form.values.name,
        email: form.values.email,
        phone_number: form.values.number_phone,
      });
      setIsShow(false);
      setDetail({
        name: "",
        email: "",
        number_phone: "",
      });
      form.resetForm();
      message.success("Berhasil mengubah admin");
      fetchAdminList();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logoutApp());
        }
      }
      message.error("Gagal mengubah admin");
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
            setIsEdit(false);
            setIsShow(true);
          }}
        >
          Tambah Admin <PlusOutlined style={{ marginLeft: "8px" }} />
        </Button>
      </div>
      <Table
        className='table-wp'
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div className='pagination-wp'>
        <Pagination
          defaultCurrent={1}
          current={page}
          total={totalData}
          pageSize={10}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
      <ModalAdd
        isShow={isShow}
        handleCancel={() => setIsShow(false)}
        form={form}
        handleSubmit={form.handleSubmit}
        isLoading={isLoading}
        isEdit={isEdit}
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
