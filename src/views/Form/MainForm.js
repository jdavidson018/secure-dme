import React from "react";
import { Formik, Form, useField } from "formik"
import { TextField, Checkbox, Radio, FormControlLabel } from "@material-ui/core"
// import * as yup from "yup";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";

// const MyRadio = ({ label, ...props }) => {
//     const [field] = useField(props);
//     return (
//         <FormControlLabel {...field} control={<Radio color="primary" />} label={label}></FormControlLabel>
//     )
// }

// const MyCheckBox = ({ label, ...props }) => {
//     const [field] = useField(props);
//     return (
//         <FormControlLabel className="text-left col" {...field} control={<Checkbox />} label={label}></FormControlLabel>
//     )
// }

const MyTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <CustomInput
            name={props.name}
            labelText={props.label}
            formControlProps={props.formControlProps}
            inputControlProps={props.inputControlProps}
            field={field}
            error={!!errorText}
        ></CustomInput>
        // <TextField fullWidth id="standard-basic" label={props.labelText} disabled={props.disabled} type={props.type} {...field} helperText={errorText} error={!!errorText} />
    )
}

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

export const MainForm = props => {
    const classes = useStyles();
    return (

        <Card>
            <CardBody>
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName: "", lastName: "", phone: "", dateOfBirth: "", sex: "", primaryInsurancePolicyNumber: "", primaryInsuranceGroupNumber: "", primaryInsuranceAddress: "",
                        primaryInsurancePhone: "", primaryInsuranceName: "", primaryInsuranceDateOfBirth: "", secondaryInsurancePolicyNumber: "", secondaryInsuranceGroupNumber: "", secondaryInsuranceAddress: "",
                        secondaryInsurancePhone: "", secondaryInsuranceName: "", secondaryInsuranceDateOfBirth: "", icd10DiagnosisCode: "", productReceived: "", rightOrLeft: "", dateOfService: ""
                    }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);

                        //submit logic goes here

                        setSubmitting(false);
                    }}>
                    {({ values, isSubmitting, errors }) => (
                        <Form>
                            {/* <GridItem xs={12} sm={12} md={3}><MyTextField label="First Name" name="firstName" type="input"></MyTextField></GridItem> */}

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}><MyTextField name="firstName" label="First Name" formControlProps={{ fullWidth: true }} /></GridItem>
                                <GridItem xs={12} sm={12} md={6}><MyTextField label="Last Name" name="lastName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone" name="phone" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date Of Birth" name="dateOfBirth" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Sex" name="sex" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>

                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Policy Number" name="primaryInsurancePolicyNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Group Number" name="primaryInsuranceGroupNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Address" name="primaryInsuranceAddress" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone" name="primaryInsurancePhone" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Name" name="primaryInsuranceName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date Of Birth" name="primaryInsuranceDateOfBirth" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>

                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Policy Number" name="secondaryInsurancePolicyNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Group Number" name="secondaryInsuranceGroupNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Address" name="secondaryInsuranceAddress" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone" name="secondaryInsurancePhone" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Name" name="secondaryInsuranceName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date Of Birth" name="secondaryInsuranceDateOfBirth" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>

                                <GridItem xs={12} sm={12} md={3}><MyTextField label="ICD-10 Diagnosis Code" name="icd10DiagnosisCode" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Product Received" name="productReceived" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Right or Left" name="rightOrLeft" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date of Service" name="dateOfService" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                            </GridContainer>

                            <div>
                                <Button className="btn-success" disabled={isSubmitting} type="submit">Submit</Button>
                            </div>

                            <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Form>
                    )}
                </Formik>
            </CardBody>
        </Card>
    )
}

export default MainForm;

