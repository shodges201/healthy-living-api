import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import NewItemForm from "../NewItemForm/NewItemForm";
import DateSelector from "../DateSelector/DateSelector";
import TextInput from "../TextInput/TextInput";

interface DialogOpenerState {
    open: boolean;
    date: Date;
    amount: number;
}

interface DialogOpenerProps {
    caption?: string;
    graphType?: string | "line";
    label?: string;
    submitNewEntry: Function;
}

class DialogOpener extends Component<DialogOpenerProps, DialogOpenerState>{
    state = {
        open: false,
        date: new Date(Date.now()),
        amount: 0
    }

    handleLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ amount: Number(event.target.value) });
        }
    }

    handleDate = (date: Date) => {
        this.setState({ date: date });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log("closing");
        this.setState({ open: false });
    };

    render() {
        return (
            <div style={{marginTop: "30px", width: "100%", display: "flex", justifyContent: "center"}}>
                <Button variant="contained" color="default" onClick={this.handleClickOpen}>
                    Add New Data
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{ color: "black" }}>Add New Data</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add new data, enter the details below.
                        </DialogContentText>
                        <div style={{ width: "100%", marginBottom: "30px" }}>
                            <DateSelector handleChange={this.handleDate} selectedDate={this.state.date}/>
                            </div>
                            <div style={{ width: "100%" }}>
                                <TextInput label={`${this.props.label}`} value={this.state.amount.toString()} handleChange={this.handleLevel} textColor={"black"} backgroundColor={"white"} borderColor={"grey"} focusedBorderColor={"grey"}/>
                            </div>
                    </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={() => this.props.submitNewEntry(this.state.date, this.state.amount, this.handleClose)} color="primary">
                                Confirm
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
                );
            }
        }
        
export default DialogOpener;