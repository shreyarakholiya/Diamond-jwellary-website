import React from 'react';
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { Step, StepLabel, Stepper } from '@material-ui/core';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <h1>Shipping Details</h1>,
            icon: <LocalShippingIcon />
        },
        {
            label: <h1>Confirm Order</h1>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <h1>SuccessFull</h1>,
            icon: <CheckCircleRoundedIcon />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    }

    return (
        <div>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                    completed={activeStep >= index ? true : false}>
                        <StepLabel style={{
                            color : activeStep >= index ? "green" : "grey",
                        }} icon={item.icon}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default CheckoutSteps