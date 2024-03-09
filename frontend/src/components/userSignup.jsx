import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext";

const { Option } = Select;

const divisions = [
  {
    id: 1,
    name: "Dhaka",
    districts: [
      { id: 1, name: "Dhaka" },
      { id: 2, name: "Faridpur" },
      { id: 3, name: "Gazipur" },
      { id: 4, name: "Gopalganj" },
      { id: 5, name: "Kishoreganj" },
      { id: 6, name: "Madaripur" },
      { id: 7, name: "Manikganj" },
      { id: 8, name: "Munshiganj" },
      { id: 9, name: "Narayanganj" },
      { id: 10, name: "Narsingdi" },
      { id: 11, name: "Rajbari" },
      { id: 12, name: "Shariatpur" },
      { id: 13, name: "Tangail" },
    ],
  },
  {
    id: 2,
    name: "Chittagong",
    districts: [
      { id: 14, name: "Bandarban" },
      { id: 15, name: "Brahmanbaria" },
      { id: 16, name: "Chandpur" },
      { id: 17, name: "Chittagong" },
      { id: 18, name: "Comilla" },
      { id: 19, name: "Cox's Bazar" },
      { id: 20, name: "Feni" },
      { id: 21, name: "Khagrachhari" },
      { id: 22, name: "Lakshmipur" },
      { id: 23, name: "Noakhali" },
      { id: 24, name: "Rangamati" },
    ],
  },
  {
    id: 3,
    name: "Khulna",
    districts: [
      { id: 25, name: "Bagerhat" },
      { id: 26, name: "Chuadanga" },
      { id: 27, name: "Jessore" },
      { id: 28, name: "Jhenaidah" },
      { id: 29, name: "Khulna" },
      { id: 30, name: "Kushtia" },
      { id: 31, name: "Magura" },
      { id: 32, name: "Meherpur" },
      { id: 33, name: "Narail" },
      { id: 34, name: "Satkhira" },
    ],
  },
  {
    id: 4,
    name: "Rajshahi",
    districts: [
      { id: 35, name: "Bogra" },
      { id: 36, name: "Joypurhat" },
      { id: 37, name: "Naogaon" },
      { id: 38, name: "Natore" },
      { id: 39, name: "Chapainawabganj" },
      { id: 40, name: "Pabna" },
      { id: 41, name: "Rajshahi" },
      { id: 42, name: "Sirajganj" },
    ],
  },
  {
    id: 5,
    name: "Barisal",
    districts: [
      { id: 43, name: "Barguna" },
      { id: 44, name: "Barisal" },
      { id: 45, name: "Bhola" },
      { id: 46, name: "Jhalokati" },
      { id: 47, name: "Patuakhali" },
      { id: 48, name: "Pirojpur" },
    ],
  },
  {
    id: 6,
    name: "Sylhet",
    districts: [
      { id: 49, name: "Habiganj" },
      { id: 50, name: "Moulvibazar" },
      { id: 51, name: "Sunamganj" },
      { id: 52, name: "Sylhet" },
    ],
  },
  {
    id: 7,
    name: "Rangpur",
    districts: [
      { id: 53, name: "Dinajpur" },
      { id: 54, name: "Gaibandha" },
      { id: 55, name: "Kurigram" },
      { id: 56, name: "Lalmonirhat" },
      { id: 57, name: "Nilphamari" },
      { id: 58, name: "Panchagarh" },
      { id: 59, name: "Rangpur" },
      { id: 60, name: "Thakurgaon" },
    ],
  },
  {
    id: 8,
    name: "Mymensingh",
    districts: [
      { id: 61, name: "Jamalpur" },
      { id: 62, name: "Mymensingh" },
      { id: 63, name: "Netrokona" },
      { id: 64, name: "Sherpur" },
    ],
  },
];

const SignupForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, customerData, setCustomerData } =
    useData();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const onFinish = async (values) => {
    // Handle form submission
    console.log("Received values:", values);
    console.log("Uploaded files:", uploadedFiles);
    // Save form data and uploaded files
    // You can perform API call or any other logic to save the data
    try {
      const response = await fetch("http://localhost:3000/customerSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.firstName + values.lastName,
          phone_number: values.phoneNumber,
          password: values.password,
        }),
      });
      // message.success("Signup successful!");
      if (response.status == 200) {
        setIsLoggedIn(true);
        setCustomerData(values);
        navigate("/login");
        message.success("Signup successful!");
      } else {
        message.error("Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("ERROR faced");
    }
  };

  const onDivisionChange = (value) => {
    // Handle division change
    setSelectedDivision(value);
    form.setFieldsValue({ district: undefined }); // Reset district field when division changes
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadProps = {
    onChange: onUploadChange,
    fileList,
    multiple: true, // Allow multiple file upload
    beforeUpload: (file) => {
      setUploadedFiles([...uploadedFiles, file]);
      return false; // Prevent upload immediately
    },
  };

  return (
    <Form
      form={form}
      name="signup_form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your Phone Number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email address!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          { required: true, message: "Please select your date of birth!" },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="division"
        label="Division"
        rules={[{ required: false, message: "Please select your division!" }]}
      >
        <Select onChange={onDivisionChange}>
          {divisions.map((division) => (
            <Option key={division.id} value={division.name}>
              {division.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="district"
        label="District"
        rules={[{ required: false, message: "Please select your district!" }]}
      >
        <Select disabled={!selectedDivision}>
          {selectedDivision &&
            divisions
              .find((div) => div.name === selectedDivision)
              ?.districts.map((district) => (
                <Option key={district.id} value={district.name}>
                  {district.name}
                </Option>
              ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload {...uploadProps}>
          <Button icon={<PlusOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
