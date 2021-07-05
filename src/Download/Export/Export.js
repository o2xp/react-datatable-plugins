// @flow
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useO2xpProvider from "../../hooks/useO2xpProvider";
import "../../style.css";

type Props = {
  showDialog: boolean,
  setShowDialog: boolean => void
};

const Export = ({ showDialog, setShowDialog }: Props): Object => {
  const {
    state: { data }
  } = useO2xpProvider();

  const [fileType, setFileType] = useState("csv");
  const [fileName, setFileName] = useState("my-data");

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleChange = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    setFileType(value);
  };

  const handleChangeFileName = (e: SyntheticInputEvent<*>) => {
    const { value } = e.target;
    setFileName(value);
  };

  const handleClick = (e: SyntheticInputEvent<*>) => {
    console.log(e.target);
    const stringifiedData: string = JSON.stringify((data.rowsData: Object[]));
    if (fileType === "json") {
      e.target.setAttribute(
        "href",
        `data:text/json;charset=utf-8,${encodeURIComponent(stringifiedData)}`
      );
      e.target.setAttribute("download", `${fileName}.json`);
    } else {
      const parsedData: Object = JSON.parse(stringifiedData);
      const identifier = (key, value: string) => (value === null ? "" : value);
      const header = Object.keys(parsedData[0]);
      const csv: string = [
        header.join(", "),
        ...parsedData.map(row =>
          header.map(cell => JSON.stringify(row[cell], identifier)).join(",")
        )
      ].join("\r\n");

      e.target.setAttribute(
        "href",
        `data:text/json;charset=utf-8,${encodeURIComponent(csv)}`
      );
      e.target.setAttribute("download", `${fileName}.csv`);
    }
  };

  return (
    <div>
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={showDialog}>
        <DialogTitle>Download</DialogTitle>
        <DialogContent dividers>
          Data will be export in {fileType} file
          <div className="o2xp-file-infos">
            <TextField
              className="o2xp-export-file-name"
              placeholder="Name your file"
              value={fileName}
              onChange={handleChangeFileName}
            />
            <RadioGroup id="o2xp-radio-group" value={fileType} onChange={handleChange}>
              <FormControlLabel
                id="o2xp-radio-csv"
                value="csv"
                control={<Radio />}
                label=".csv"
              />
              <FormControlLabel
                id="o2xp-radio-json"
                value="json"
                control={<Radio />}
                label=".json"
              />
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions className="controlButtons">
          <Button
            id="o2xp-checked-rows-button"
            variant="contained"
            color="primary"
            size="small"
            disabled
          >
            Selected rows
          </Button>
          <Button
            id="o2xp-all-rows-button"
            variant="contained"
            color="primary"
            size="small"
          >
            <a
              id="o2xp-download-link"
              href="./"
              onClick={handleClick}
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            >
              All rows
            </a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Export;
