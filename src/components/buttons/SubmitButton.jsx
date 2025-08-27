import React from "react";
import Loader from "../loader/Loader";

const SubmitButton = ({
  type = "submit",
  children,
  isLoading,
  className,
  ...props
}) => {
  return (
    <button {...props} type={type} className={`bg-primary py-3 rounded-full text-white font-medium ${className}`}>
      {isLoading && <Loader variant="dots" size="sm" className="text-white" />}
      {children}
    </button>
  );
};

export default SubmitButton;
