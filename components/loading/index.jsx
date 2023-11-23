import React from "react";
import Loader from "./Loader";

const Loading = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-4 justify-between items-center gap-5">
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </section>
  );
};

export default Loading;
