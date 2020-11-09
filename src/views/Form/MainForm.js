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
import { useAuth0 } from '@auth0/auth0-react';
import SecureDMEAPI from "../../api/SecureDMEAPI";

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
    const { getAccessTokenSilently } = useAuth0();


    return (
        <Formik
            enableReinitialize
            initialValues={{
                firstName: "", lastName: "", phoneNumber: "", DOB: "", gender: "", insuranceCarrierID: "", primaryInsurancePolicyNumber: "", primaryInsuranceGroupNumber: "", primaryInsuranceAddress: "",
                primaryInsuranceState: "", primaryInsuranceZipCode: "", primaryInsuranceCountry: "", primaryInsuredFirstName: "", primaryInsuredLastName: "", primaryInsuranceDateOfBirth: "", secondaryInsuranceCarrierID: ""
            }}
            onSubmit={ async (data, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                //submit logic goes here
                try {
                    var newPatient = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNumber: data.phoneNumber,
                        DOB: data.DOB,
                        gender: data.gender,
                        insuranceCarrierID: data.insuranceCarrierID,
                        policyNumber: data.primaryInsurancePolicyNumber,
                        groupNumber: data.primaryInsuranceGroupNumber,
                        streetAddress: data.primaryInsuranceAddress,
                        state: data.primaryInsuranceState,
                        zipCode: data.primaryInsuranceZipCode,
                        country: data.primaryInsuranceCountry,
                        PrimaryInsuredFirstName: data.primaryInsuredFirstName,
                        PrimaryInsuredLastName: data.primaryInsuredLastName,
                        SecondaryInsuranceCarrierID: data.secondaryInsuranceCarrierID
                    }

                    const token = await getAccessTokenSilently();
                    const result = await SecureDMEAPI.post('https://localhost:5001/patient', {newPatient}, {  
                        headers: {
                            Authorization: `Bearer ${token}`
                       },
                        
                    }
                    );

                    console.log(result);

                } catch (err) {
                    console.log("form submit did not work");
                }

                setSubmitting(false);
            }}>


            {({ values, isSubmitting, errors }) => (
                <Form>
                    <Card>
                        {/* <GridItem xs={12} sm={12} md={3}><MyTextField label="First Name" name="firstName" type="input"></MyTextField></GridItem> */}
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Patient Information</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}><MyTextField label="First Name" name="firstName" formControlProps={{ fullWidth: true }} /></GridItem>
                                <GridItem xs={12} sm={12} md={6}><MyTextField label="Last Name" name="lastName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone Number" name="phoneNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date Of Birth" name="DOB" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Gender" name="gender" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Insurance Carrier ID" name="insuranceCarrierID" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Insurance Information</h4>
                        </CardHeader>

                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Policy Number" name="primaryInsurancePolicyNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Group Number" name="primaryInsuranceGroupNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Address" name="primaryInsuranceAddress" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance State" name="primaryInsuranceState" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Zip Code" name="primaryInsuranceZipCode" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Country" name="primaryInsuranceCountry" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance First Name" name="primaryInsuredFirstName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Last Name" name="primaryInsuredLastName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Primary Insurance Date Of Birth" name="primaryInsuranceDateOfBirth" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Secondary Insurance Carrier ID" name="secondaryInsuranceCarrierID" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                {/* 
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Policy Number" name="secondaryInsurancePolicyNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Group Number" name="secondaryInsuranceGroupNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Address" name="secondaryInsuranceAddress" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone" name="secondaryInsurancePhone" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Name" name="secondaryInsuranceName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date Of Birth" name="secondaryInsuranceDateOfBirth" formControlProps={{ fullWidth: true }}></MyTextField></GridItem> */}

                                {/* <GridItem xs={12} sm={12} md={3}><MyTextField label="ICD-10 Diagnosis Code" name="icd10DiagnosisCode" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Product Received" name="productReceived" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Right or Left" name="rightOrLeft" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                <GridItem xs={12} sm={12} md={3}><MyTextField label="Date of Service" name="dateOfService" formControlProps={{ fullWidth: true }}></MyTextField></GridItem> */}
                            </GridContainer>
                        </CardBody>
                    </Card>
                    <div>
                        <Button className="btn-success" disabled={isSubmitting} type="submit">Submit</Button>
                    </div>

                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    )
}

export default MainForm;

