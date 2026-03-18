import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className="mt-auto">
      <div className="fixed bottom-2 left-2 text-xs text-white">
        &copy; {year} Jacob Nevitt
      </div>
    </div>
  );
};

export default Footer;
