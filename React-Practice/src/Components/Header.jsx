/* eslint-disable react/prop-types */
import { useState } from "react";
import { getDateWeek, isUserValid, signout } from "./lib/pocketbase";
import { Link } from "react-router-dom";

function Header({ setChosenWeek }) {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div
      className={
        "  md:flex-row md:flex md:justify-between h-full md:items-center bg-regal-blue md:pl-10  "
      }
    >
      <div className=" px-2 pt-2 flex justify-between md:flex-row  md:justify-center md:items-center">
        <Link to="/">
          <h2 className="mr-2 text-2xl text-white font-semibold md:mr-5">
            HortiLoader
          </h2>
        </Link>

        <h2 className="hidden md:flex text-white text-sm md:font-medium mr-3">
          Current Week - {getDateWeek()}
        </h2>

        <div className="hidden md:flex md:justify-center items-center">
          <p className="text-white text-sm md:text-base mr-2">Selected Week</p>
          <input
            className="bg-transparent border-white border-2 text-center  text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            min={1}
            max={52}
            onChange={(e) => setChosenWeek(e.target.value)}
          />
        </div>
        <button
          className="md:hidden text-sm w-28 h-8  rounded-md bg-green-500 hover:bg-green-600 text-white"
          onClick={() => setToggleNav(!toggleNav)}
        >
          {toggleNav ? "Close" : "Open"}
        </button>
      </div>

      {!isUserValid ? (
        <p></p>
      ) : (
        <>
          <div
            className={`${
              toggleNav ? "flex" : "hidden"
            } w-full pr-10 h-full gap-5 md:justify-center md:items-center text-white  absolute md:static bg-black  md:w-auto md:bg-transparent md:flex  `}
          >
            <div className="flex-col w-full ml-10 mt-10 md:mt-0 md:ml-0 md:flex-row flex gap-5 md:items-center">
              <h2 className="md:hidden text-white text-sm md:font-medium mr-3">
                Current Week - {getDateWeek()}
              </h2>

              <div className="md:hidden flex items-center">
                <p className="text-white text-sm md:text-base mr-2">
                  Selected Week
                </p>
                <input
                  className=" bg-transparent border-white border-2 text-center  text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  min={1}
                  max={52}
                  onChange={(e) => setChosenWeek(e.target.value)}
                />
              </div>

              <Link onClick={() => setToggleNav(!toggleNav)} to="/">
                Whiteboard
              </Link>
              <Link onClick={() => setToggleNav(!toggleNav)} to="/collect">
                Collects
              </Link>
              <Link onClick={() => setToggleNav(!toggleNav)} to="/holdingPage">
                Holding Page
              </Link>

              <button
                className="mr-4 py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white"
                onClick={signout}
              >
                Signout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
