import React, {Component} from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: true,
            newPaletteName: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    
    handleClickOpen() {
        this.setState({ open: true });
    };
    
    handleClose() {
        this.setState({ open: false });
    };

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    render() {
        const {handleSubmit, hideForm} = this.props;
        const {newPaletteName} = this.state;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
            >
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)} autoComplete="off">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beautiful palette.
                            Make sure it's unique!
                        </DialogContentText>
                        <TextValidator 
                            value={newPaletteName}
                            label="Palette Name"
                            name="newPaletteName"
                            onChange={this.handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Name already used']}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        CANCEL
                    </Button>
                    <Button variant="contained" color="primary" type="submit" size="small">
                        SAVE
                    </Button>
                    </DialogActions>
                </ValidatorForm>
                <Picker />
            </Dialog>
        );
    }
}

export default PaletteMetaForm;