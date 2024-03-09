import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./Datacontext.jsx";
import divisions from "./division"; // Assuming you have divisions data in a separate file

const { Option } = Select;

const ShopSignupForm = () => {
  const { isShopLoggedIn, setIsShopLoggedIn, shopLicense, setShopLicense } =
    useData();
  const navigate = useNavigate();
  console.log("Divisions:", divisions);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [upzillaOptions, setUpzillaOptions] = useState([]);
  const [requestedData, setRequestedData] = useState({});

  const onFinish = async (values) => {
    console.log("Received values:", values);
    console.log("File List:", fileList);
    setRequestedData({});
    try {
      const response = await fetch("http://localhost:3000/shopSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.shopName,
          license_no: values.shopLicense,
          phone_number: values.phoneNumber,
          password: values.password,
        }),
      });
      // message.success("Signup successful!");
      if (response.status == 200) {
        setIsShopLoggedIn(true);
        setShopLicense(values.shopLicense);
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
    const division = divisions.find((div) => div.name === value);
    setDistrictOptions(
      division ? division.districts.map((dist) => dist.name) : []
    );
    setUpzillaOptions([]);
    form.setFieldsValue({ district: undefined, upzilla: undefined });
  };

  const onDistrictChange = (value) => {
    const selectedDivision = form.getFieldValue("division");
    const division = divisions.find((div) => div.name === selectedDivision);
    const district = division
      ? division.districts.find((dist) => dist.name === value)
      : null;
    setUpzillaOptions(district ? district.upzillas : []);
    form.setFieldsValue({ upzilla: undefined });
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
    beforeUpload: () => false, // To prevent upload immediately
    fileList,
  };

  return (
    <Form
      form={form}
      name="shop_signup_form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="shopName"
        label="Shop Name"
        rules={[{ required: true, message: "Please input the shop name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="shopLicense"
        label="Shop License"
        rules={[{ required: true, message: "Please input the shop license!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="division"
        label="Division"
        rules={[{ required: true, message: "Please select the division!" }]}
      >
        <Select onChange={onDivisionChange}>
          {divisions.map((division) => (
            <Option key={division.name} value={division.name}>
              {division.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="district"
        label="District"
        rules={[{ required: true, message: "Please select the district!" }]}
      >
        <Select onChange={onDistrictChange}>
          {districtOptions.map((district) => (
            <Option key={district} value={district}>
              {district}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="upzilla"
        label="Upzilla"
        rules={[{ required: true, message: "Please select the upzilla!" }]}
      >
        <Select>
          {upzillaOptions.map((upzilla) => (
            <Option key={upzilla} value={upzilla}>
              {upzilla}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="roadNo"
        label="Road No"
        rules={[{ required: true, message: "Please input the road name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="HouseNo"
        label="House No"
        rules={[{ required: true, message: "Please input the House No!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item
        name="shopImage"
        label="Shop Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload {...uploadProps} listType="picture-card">
          <Button icon={<PlusOutlined />}>Upload</Button>
        </Upload>
      </Form.Item> */}
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

export default ShopSignupForm;
