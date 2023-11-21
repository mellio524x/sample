import React from "react";
import heroImg from "../assets/images/event-hero-img.jpg";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  return (
    <section className="w-full h-full flex flex-col md:flex-row ">
      <div className="w-full h-[300px] md:w-[50%] md:h-full bg-slate-400">
        <img
          src={heroImg}
          alt="hero-img"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col w-full h-fit md:w-[50%]  md:my-auto md:ml-20 px-10 pt-5">
        <div className="text-5xl font-semibold text-orange-400 mb-10">
          <h1>event+</h1>
        </div>
        <h1 className="text-3xl md:text-5xl my-8 ">Welcome back!</h1>
        <div className="w-full md:w-1/2 ">
          <LoginForm />
          <a href="/signup" className="w-fit h-10 text-sm cursor-pointer">
            <p className="w-fit mx-auto pt-2 text-orange-700 ">Sign up here</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
