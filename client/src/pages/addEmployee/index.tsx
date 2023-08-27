import { Row } from "antd";
import { Layout } from "../../components/Layout";
import { EmployeeForm } from "../../components/EmployeeForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/slice";
import { useAddEmployeeMutation } from "../../redux/services/employees";
import { Employee } from "@prisma/client";
import { Path } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const AddEmployee: React.FC = () => {
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Path.status}/created`);
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Unkown error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Add employee"
          btnText="Add"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
