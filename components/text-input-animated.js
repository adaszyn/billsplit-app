import React, { Component } from 'react';
import { TextInput } from 'react-native';

export class TextInputAnimatedPlaceholder extends Component {
    state = {
        currentPlaceholder: ''
    }
    componentDidMount() {
        let { placeholder } = this.props;
        let interval = setInterval(() => {
            if (placeholder) {
                let [firstLetter, ...rest] = placeholder;
                placeholder = rest.join(''); 
                this.setState({
                    currentPlaceholder: this.state.currentPlaceholder + firstLetter
                })
            } else {
                clearInterval(interval);
            }
        }, 30);
    }
    render() {
        return <TextInput {...this.props} placeholder={this.state.currentPlaceholder} />
    }
}