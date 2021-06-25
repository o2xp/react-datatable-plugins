// @flow

import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useO2xpProvider from "../../hooks/useO2xpProvider";
import "../../style.css";

type Props = {
  showDialog: boolean,
  setShowDialog: boolean => void
};

const Printing = ({ showDialog, setShowDialog }: Props) => {
  const {
    state: { data, columns }
  } = useO2xpProvider();

  const [isChecked, setIsChecked] = useState(true);
  const [divRowArray, setDivRowArray] = useState([]);

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
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={showDialog}>
        <DialogTitle onClose={handleClose}>Print</DialogTitle>
        <DialogContent dividers>
          <div className="o2xp-to-print-columns">Choose what you want to print</div>
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
        </DialogContent>
        <DialogActions className="controlButtons">
          <Button
            id="o2xp-checked-rows-button"
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

export default Printing;
