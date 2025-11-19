"use client";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className="bg-amber-200 border border-gray-400 p-2 rounded-2xl cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
