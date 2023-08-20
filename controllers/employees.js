const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route GET /api/employees
 * @description All employees
 * @access Private
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json("Сouldn't find employees");
    console.log(err);
  }
};

/**
 * @route GET /api/employees/:id
 * @description Find employee
 * @access Private
 */

const find = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json("Сouldn't find employee");
    console.log(err);
  }
};

/**
 * @route POST /api/employees/add
 * @description Add employee
 * @access Private
 */

const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (err) {
    res.status(500).json("Сouldn't add employee");
    console.log(err);
  }
};

/**
 * @route DELETE /api/employees/remove/:id
 * @description Remove employee
 * @access Private
 */

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: { id },
    });
    res.status(204).json("Employee deleted");
  } catch (err) {
    res.status(500).json("Сouldn't delete employees");
    console.log(err);
  }
};

/**
 * @route PUT /api/employees/edit/:id
 * @description Edit employee
 * @access Private
 */

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    await prisma.employee.update({
      where: { id },
      data,
    });
    res.status(204).json("Employee updated");
  } catch (err) {
    res.status(500).json("Сouldn't edit employees");
    console.log(err);
  }
};

module.exports = {
  all,
  add,
  find,
  remove,
  edit,
};
