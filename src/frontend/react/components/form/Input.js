import React from 'react';
import Formsy from 'formsy-react';
import reactMixin from 'react-mixin';

@reactMixin.decorate(Formsy.Mixin)
export default class Input extends React.Component {
  changeValue(event) {
    if(this.getErrorMessage() != null){
      this.setValue(event.currentTarget.value);
    }
    else {
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
      } 
      else {
        this.setState({
          _value: event.currentTarget.value,
          _isPristine: false
        });
      }
    }
  }
  
  blurValue(event) {
    this.setValue(event.currentTarget.value);
  }

  keyDown(event){
    if(event.keyCode=='13'){
      this.setValue(event.currentTarget.value);
    }
  }

  render() {
    let error;
    let className = this.showRequired() ? 'form-group' : this.showError() ? 'form-group has-error' : "form-group";

    if(this.getErrorMessage()) {
      error = <span className="error-message">{this.getErrorMessage()}</span>;
    }

    return (
      <div className={className}>
        <label>{this.props.label}</label>
        <div>
          <input type="text" onBlur={this.blurValue.bind(this)} onKeyDown={this.keyDown.bind(this)} onChange={this.changeValue.bind(this)}
                 type={this.props.type} required={this.props.required} disabled={this.props.disabled} value={this.getValue()} placeholder={this.props.placeholder} />
          {error}
        </div>
      </div>
    );
  }
}