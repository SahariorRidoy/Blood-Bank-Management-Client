import { Typography } from "@material-tailwind/react";
import { FaTint } from 'react-icons/fa';  // Blood drop icon

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-10">
      {/* Outer div takes full width, inner div is constrained */}
      <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between text-center text-white">
        {/* Logo with Icon */}
        <div className="flex items-center gap-4 mb-6 sm:mb-0">
          <FaTint className="text-white text-5xl transform hover:scale-110 transition-all duration-300" />
          <h2 className="text-4xl font-semibold tracking-tight">Blood Bank</h2>
        </div>

        {/* Links */}
        <ul className="flex flex-col sm:flex-row items-center gap-6 text-lg font-medium">
          <li>
            <Typography
              as="a"
              color="white"
              className="transition-colors cursor-pointer hover:text-red-200 focus:text-red-200"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              color="white"
              className="transition-colors cursor-pointer hover:text-red-200 focus:text-red-200"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              color="white"
              className="transition-colors cursor-pointer hover:text-red-200 focus:text-red-200"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              color="white"
              className="transition-colors cursor-pointer hover:text-red-200 focus:text-red-200"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>

      {/* Footer Divider and Copyright */}
      <hr className="max-w-[1320px] mx-auto my-8 border-t-2 border-white opacity-40" />
      <Typography color="white" className="text-center font-normal text-lg">
        &copy; 2025 Blood Bank | All rights reserved
      </Typography>
    </footer>
  );
}
