import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";

// helper text 보여주기
const showHelperText = (state) => {
    if (state.value) {
        return (
            <FormHelperText id='component-helper-text'>
                {state.getValidateText()}
            </FormHelperText>
        );
    }
};

export default showHelperText;
