import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NewItemForm from "../NewItemForm/NewItemForm"

interface DialogOpenerState {
    open: boolean;
}

interface DialogOpenerProps {
    caption?: string;
    graphType?: string | "line";
    label?: string;
    addNewData: Function;
}

class DialogOpener extends Component<DialogOpenerProps, DialogOpenerState>{
    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add New Data
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{color: "black"}}>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add new data, enter the details below.
                        </DialogContentText>
                        <NewItemForm graphType={"line"} label={this.props.graphType} caption={this.props.caption} addNewData={this.props.addNewData}/>
                    </DialogContent>
                    <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Subscribe
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
                );
            }
        }
        
export default DialogOpener;