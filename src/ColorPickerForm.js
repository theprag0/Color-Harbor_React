import React, {Component} from 'react';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

class ColorPickerForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
          this.props.colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
          this.props.colors.every(
            ({ color }) => color !== this.state.currentColor
          )
        );
    }
    handleColorChange(newColor) {
        this.setState({currentColor: newColor.hex});
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    handleSubmit() {
        let newColor = {
            color: this.state.currentColor, 
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({newColorName: ''});
    }
    render() {
        const {paletteIsFull} = this.props;
        const {currentColor} = this.state;
        return(
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.handleColorChange}/>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <TextValidator
                        onChange={this.handleChange}
                        name="newColorName"
                        label="Color Name"
                        value={this.state.newColorName}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={
                        ['Enter color name', 
                        'Color name must be unique',
                        'Color already used!'
                        ]}
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        style={{backgroundColor: currentColor}}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? "PALETTE FULL" : "ADD COLOR"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default ColorPickerForm;