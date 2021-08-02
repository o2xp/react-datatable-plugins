// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

type Props = {
  setCurrentPage: number => void,
  currentPage: number,
  totalPage: number
};

const NavButton = ({ setCurrentPage, currentPage, totalPage }: Props) => {
  const handleNav = (value: string) => {
    setCurrentPage(value === "previous" ? currentPage - 1 : currentPage + 1);
  };

  const EnableButton = () => {
    return (
      <div>
        <IconButton
          className="o2xp-nav-page"
          size="small"
          onClick={() => handleNav("previous")}
          disabled={!(currentPage > 1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          className="o2xp-nav-page"
          size="small"
          onClick={() => handleNav("next")}
          disabled={!(currentPage < totalPage)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    );
  };

  return <EnableButton />;
};

export default NavButton;
