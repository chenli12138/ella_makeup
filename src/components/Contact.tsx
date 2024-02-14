import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Store } from "react-notifications-component";
import CustomInput from "./CustomInput";
import ImageWithSkeleton from "./ImageWithSkeleton";

const ContactUs: React.FC = () => {
  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingLocation: "",
    weddingDate: getFormattedTodayDate(),
    duration: "",
    bridemaid: 0,
    followUpNeeded: false,
    bridemaidNeeded: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    // ... other fields as necessary
  });

  const form = useRef<HTMLFormElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    if (formData.name === "") {
      newErrors.name = true;
      isValid = false;
    } else {
      newErrors.name = false;
    }

    if (formData.email === "") {
      newErrors.email = true;
      isValid = false;
    } else {
      newErrors.email = false;
    }
    if (formData.phone === "") {
      newErrors.phone = true;
      isValid = false;
    } else {
      newErrors.phone = false;
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }
    const formElement = form.current;
    console.log(form);
    if (formElement instanceof HTMLFormElement) {
      emailjs
        .sendForm(
          "service_ellamakeup",
          "template_ellamakeup",
          formElement,
          "WQEUdApXmgaCPH-d2"
        )
        .then(
          (result) => {
            console.log(result.text);
            setFormData({
              name: "",
              email: "",
              phone: "",
              weddingLocation: "",
              weddingDate: "",
              duration: "",
              bridemaid: 0,
              followUpNeeded: false,
              bridemaidNeeded: false,
            });
            Store.addNotification({
              title: "Wonderful!",
              message: "Thank you ! We will contact you soon",
              type: "success", // 'default', 'success', 'info', 'warning', 'danger'
              insert: "top",
              container: "top-center", // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
              animationIn: ["animate__animated", "animate__fadeIn"], // Use animate.css classes
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
              },
            });
            // Handle success (like showing a success message)
          },
          (error) => {
            console.log(error.text);
            // Handle errors (like showing an error message)
          }
        );
    }
  };

  return (
    <div className="container mx-auto p-4 sm:flex sm:flex-row-reverse sm:justify-between sm:gap-12 mt-[10vh] md:mt-[15vh]">
      <h1 className="block sm:hidden text-4xl mx-auto text-center mb-8 font-medium">
        Contact us
      </h1>
      <form ref={form} onSubmit={handleSubmit} className="sm:w-1/2">
        <CustomInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          necessary={true}
          onChange={handleChange}
          error={formErrors.name}
        />
        <CustomInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          necessary={true}
          onChange={handleChange}
          error={formErrors.email}
        />
        <CustomInput
          label="Best Contact Number"
          type="tel"
          name="phone"
          value={formData.phone}
          necessary={true}
          onChange={handleChange}
          error={formErrors.phone}
        />
        <CustomInput
          label="Date of Wedding/Occasion"
          type="date"
          name="weddingDate"
          value={formData.weddingDate}
          onChange={handleChange}
        />
        <CustomInput
          label="Makeup Location and Address"
          type="text"
          name="weddingLocation"
          value={formData.weddingLocation}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="followUpNeeded"
              checked={formData.followUpNeeded}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 bg-white text-gray-600"
            />
            <span className="ml-4 text-gray-700">
              Do you need a following touchup?
            </span>
          </label>
        </div>
        {formData.followUpNeeded && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Touchup Duration:
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="block appearance-none w-full border border-gray-200 bg-white text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select Duration</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="2-4 hours">2-4 hours</option>
              <option value="4-6 hours">4-6 hours</option>
              <option value="Full day">Full day</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="bridemaidNeeded"
              checked={formData.bridemaidNeeded}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 bg-white text-gray-600"
            />
            <span className="ml-4 text-gray-700">
              Do you need makeup for bridemaid/mother?
            </span>
          </label>
        </div>
        {formData.bridemaidNeeded && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How many bridemaids makeup needed:
            </label>
            <select
              name="duration"
              value={formData.bridemaid}
              onChange={handleChange}
              className="block appearance-none w-full border border-gray-200 bg-white text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">How many</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-gray-200 hover:bg-gray-800 hover:text-white text-gray-800  py-4 px-6 text-md rounded-full focus:outline-none cursor-pointer"
        >
          Submit
        </button>
      </form>
      <ImageWithSkeleton
        alt={``}
        src="https://images.squarespace-cdn.com/content/v1/5d01e3871ec2780001f8f874/1651491227478-2SN5965CBX00ER53MSG5/Mitchelton-Wines-Wedding-0076.jpg?format=1500w"
        imgClass="max-w-xs sm:max-w-lg max-h-96 object-cover mt-8 mx-auto"
      />
    </div>
  );
};

export default ContactUs;
