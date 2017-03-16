import { Component, createElement } from 'react';
import TextField from 'material-ui/TextField';

const mapError = ({ meta: { visited, submitFailed, error, warning } = {},
                    input: { ...inputProps },
                    ...props
                  }, errorProp = 'errorText') => (
  (visited || submitFailed) && (error || warning) ?
  { ...props, ...inputProps, [errorProp]: error || warning } :
  { ...inputProps, ...props }
);

const createComponent = (MaterialUIComponent, mapProps) => {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.component;
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: (c) => { this.component = c; },
      });
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`;
  return InputComponent;
};

export default createComponent(TextField, mapError);
