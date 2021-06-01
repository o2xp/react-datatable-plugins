import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import Datatable from "@o2xp/react-datatable";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "../style.css";
import { useO2xpProvider } from "../O2xpContext/O2xpContext";

const Print = () => {
  const {
    state: { data, columns = { data: { columns: {} } } },
    dispatch
  } = useO2xpProvider();

  const [showDialog, setShowDialog] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [enable, setEnable] = useState(false);
  const [checkedRowsArray, setCheckedRowsArray] = useState([]);
  const [tempo, setTempo] = useState([]);

  const handleOpen = () => {
    setShowDialog(true);
    const elements = document.getElementsByClassName("row");

    elements.forEach(element => {
      const checkbox = element.getElementsByTagName("INPUT")[0];
      const temp = [];
      const tempo = [];
      setEnable(false);
      let truc;

      if (checkbox.checked) {
        setEnable(true);
        temp.push(element);
        element.getElementsByClassName("cell").forEach(el => {
          tempo.push(el.innerText);
        });
      }
      setTempo(tempo);
      setCheckedRowsArray(temp);
    });
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const manageWindow = ({ head, body }) => {
    const newWindow = window.open();
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

  const managePrintingDataChecked = () => {
    printingData({ rows: checkedRowsArray });
  };
  const managePrintingData = () => {
    printingData({ rows: data.rowsData });
  };

  const printingData = ({ rows, colVal }) => {
    if (columns.data !== null) {
      const head = `<thead>${Object.values(columns.data.columns).map(
        col => `<th>${col.label}</th>`
      )}</thead>`;

      const body = `<tbody>${rows.map(
        row =>
          `<tr>${Object.values(columns.data.columns).map(
            col => `<td>${row[col.id]}</td>`
          )}`
      )}`;
      manageWindow({ head, body });
    }
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
          <Typography className="columnsToPrint" gutterBottom>
            Choose what you want to print
          </Typography>
          <Typography gutterBottom>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleChange}
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
