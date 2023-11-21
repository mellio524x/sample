import React, { useState } from "react";
import { useForm } from "react-hook-form";
import eyeIcon from "../../assets/images/icon_eye.svg";
// import apiService from "../../api/axios";
// import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [display, setDisplay] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();

  const {
    register,
    // control,
    handleSubmit,
    //setError,
    //reset,
    formState: { errors },
  } = useForm();

  const toglgeDisplay = () => {
    setDisplay(!display);
  };
  
  const handleLogin = async (formValues) => {
    // let { email, password } = formValues;
    // if (errors.email || errors.password) {
    //   return;
    // }
    // const from = location.state?.from?.pathname || "/";
    // try {
    //   // fake api call
    //   await apiService.login({ email, password }, () => {
    //     navigate(from, { replace: true });
    //   });
    // } catch (error) {
    //   reset();
    //   setError("ResponseError", error);
    // }
    console.log(formValues);
    console.log("Submitted");
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full h-full">
      {errors.email && (
        <p className="text-red-500 pt-2 text-sm w-full">
          {errors.email.message}
        </p>
      )}
      {errors.password && (
        <p className="text-red-500 pb-2 text-sm w-full">
          {errors.password.message}
        </p>
      )}
      <label htmlFor="email">Email</label>
      <input
    
        type="text"
        id="email"
        autoComplete="off"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email.",
          },
        })}
        className="w-full h-5 my-2 py-2 border-b focus:outline-none"
      />

      <label htmlFor="password">Password</label>
      <div className="flex">
        <input
       
          type={display ? "text" : "password"}
          id="password"
          autoComplete="off"
          {...register("password", {
            required: true,
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
              message:
                "Password must has at least 8-20 characters, 1 uppercase, 1 lowercase, 1 number.",
            },
          })}
          className="w-full h-5 my-1 py-2 border-b focus:outline-none"
        />
        <div onClick={toglgeDisplay} className="cursor-pointer">
          <img src={eyeIcon} alt="showIcon" className="w-5 h-5" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-10 bg-orange-200 hover:bg-orange-300 hover:shadow-sm rounded-md mt-5"
      >
        Sign in
      </button>
      <button
        type="reset"
        className=" w-full py-2 px-10 rounded-md my-3 border hover:shadow-sm"
      >
        Reset
      </button>
    </form>
  );
};

export default LoginForm;
