// @flow

import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useO2xpProvider from "../hooks/useO2xpProvider";
import "../style.css";

const Print = () => {
  const {
    state: { data, columns }
    // dispatch
  } = useO2xpProvider();

  const [showDialog, setShowDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [enable, setEnable] = useState(false);
  const [divRowArray, setDivRowArray] = useState([]);
  const [checkedRowArray, setCheckedRowArray] = useState([]);

  const handleOpen = () => {
    setShowDialog(true);
    const elements = document.getElementsByClassName("row");
    // elements.forEach(element => {
    //   const checkbox = element.getElementsByTagName("INPUT")[0];
    //   const divArray = [];
    //   setEnable(false);
    //   if (checkbox.checked) {
    //     setEnable(true);
    //     divArray.push(element);
    //     element.getElementsByClassName("cell").forEach(el => {
    //       checkedRowArray.push(el.innerText);
    //     });
    //   }
    //   setCheckedRowArray(checkedRowArray);
    //   setDivRowArray(divArray);
    // });
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
  };

  const manageWindow = ({ head, body }) => {
    const newWindow: Object = window.open();
    newWindow.document.write(
      `<html>
        <body>
          <table>
            ${head}
            ${body}
          </table>
        </body>
      <html>`
    );
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  const printingData = ({ rows }: { rows: Object[] }) => {
    if ((columns.data: Object) !== null) {
      const head: string = `<thead>${Object.values(columns.data.columns).map(
        (col: string) => `<th>${col.label}</th>`
      )}</thead>`;

      const body: string = `<tbody>${rows.map(
        (row: Object) =>
          `<tr>${Object.values(columns.data.columns).map(
            (col: string) => `<td>${row[col.id]}</td>`
          )}`
      )}`;
      manageWindow({ head, body });
    }
  };
  const managePrintingDataChecked = () => {
    printingData({ rows: divRowArray });
  };
  const managePrintingData = () => {
    printingData({ rows: data.rowsData });
  };

  return (
    <div>
      <IconButton aria-label="print" onClick={handleOpen}>
        <PrintIcon />
      </IconButton>

      <Dialog
        className="dialog"
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showDialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Print
        </DialogTitle>
        <DialogContent dividers>
          <Typography className="o2xp-to-print-columns" gutterBottom>
            Choose what you want to print
          </Typography>
          <Typography gutterBottom>
            <FormControlLabel
              control={
                <Checkbox
                  className="o2xp-checkbox"
                  checked={isChecked}
                  onChange={handleChangeChecked}
                  name="onlyColumnsDisplay"
                  color="secondary"
                />
              }
              label="Only columns displayed"
            />
          </Typography>
        </DialogContent>
        <DialogActions className="controlButtons">
          <Button
            onClick={managePrintingDataChecked}
            variant="contained"
            color="primary"
            size="small"
            disabled
          >
            Selected rows
          </Button>
          <Button
            id="o2xp-all-rows-button"
            onClick={managePrintingData}
            variant="contained"
            color="primary"
            size="small"
          >
            All rows
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Print;
