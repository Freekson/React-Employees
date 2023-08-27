import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../redux/services/employees";
import { Layout } from "../../components/Layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/EmployeeForm";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { Path } from "../../paths";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();
      navigate(`${Path.status}/updated`);
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Unkown error");
      }
    }
  };

  if (isLoading) {
    return <span>Loading</span>;
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Edit employee"
          btnText="Edit"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};
