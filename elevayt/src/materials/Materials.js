/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";

export const LinearIndeterminate = () => {
  return (
    <Box sx={{ width: "50%" }}>
      <LinearProgress />
    </Box>
  );
};

export const AccordionButton = ({ heading, data }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<AiOutlinePlus />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          style={{
            color: "var(--cool-gray-90, #21272A)",
            fontFamily: "TT Wellingtons Trl",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "110%",
          }}
        >
          {heading}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          style={{
            color: "var(--cool-gray-90, #21272A)",
            fontFamily: "TT Wellingtons Trl",
            fontSize: "15px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "110%",
          }}
        >
          {data}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
AccordionButton.propTypes = {
  heading: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
export const ToolTips = ({ button, display }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      Width: 300,

      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div style={{ backgroundColor: "transparent" }}>
        <HtmlTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={display}
          arrow
          placement="top-start"
        >
          <Button
            style={{ backgroundColor: "transparent" }}
            onClick={handleTooltipOpen}
          >
            {button}
          </Button>
        </HtmlTooltip>
      </div>
    </ClickAwayListener>
  );
};
