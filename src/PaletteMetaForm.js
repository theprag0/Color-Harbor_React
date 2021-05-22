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
            stage: "form",
            newPaletteName: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
    
    showEmojiPicker() {
        this.setState({stage: "emoji"});
    }

    savePalette(emoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        };
        this.setState({stage: ''});
        this.props.handleSubmit(newPalette);
    }

    render() {
        const {hideForm} = this.props;
        const {newPaletteName, stage} = this.state;
        return (
            <div>
            <Dialog open={stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker title="Pick a palette emoji" onSelect={this.savePalette}/>
            </Dialog>
            <Dialog
                open={stage === 'form'}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
            >
                <ValidatorForm onSubmit={this.showEmojiPicker} autoComplete="off">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your beautiful palette.
                            Make sure it's unique!
                        </DialogContentText>
                        <TextValidator 
                            autoFocus
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
            </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;