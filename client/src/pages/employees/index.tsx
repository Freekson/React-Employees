import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/CustomButton";
import { Layout } from "../../components/Layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../redux/services/employees";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/slice";
import { useEffect } from "react";

const columns: ColumnsType<Employee> = [
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees: React.FC = () => {
  const { data, isLoading } = useGetAllEmployeesQuery();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const goToAddUser = () => {
    navigate(Path.employeeAdd);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Add employee
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(employee) => employee.id}
        onRow={(employee) => {
          return { onClick: () => navigate(`${Path.employee}/${employee.id}`) };
        }}
      />
    </Layout>
  );
};
