import React from "react";
import { Formik, Form, useField, Field } from "formik"
import { FormControl } from "@material-ui/core"
import * as yup from "yup";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import SecureDMEAPI from "../../api/SecureDMEAPI";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import FormikRadioGroup from "components/CustomInput/FormikRadioGroup";


// const MyCheckBox = ({ label, ...props }) => {
//     const [field] = useField(props);
//     return (
//         <FormControlLabel className="text-left col" {...field} control={<Checkbox />} label={label}></FormControlLabel>
//     )
// }


const DatePickerField = ({ field, form, ...props }) => {
    const currentError = form.errors[field.name];

    return (
        <FormControl className="MuiFormControl-root undefined makeStyles-formControl-95 MuiFormControl-fullWidth">
            <KeyboardDatePicker
                className={"MuiFormControl-root undefined makeStyles-formControl-95 MuiFormControl-fullWidth"}
                style={{ marginTop: "16px" }}
                clearable
                name={field.name}
                value={field.value}
                format="MM/dd/yyyy"
                placeholder={props.label}
                helperText={currentError}
                error={Boolean(currentError)}
                onError={error => {
                    // handle as a side effect
                    if (error !== currentError) {
                        form.setFieldError(field.name, error);
                    }
                }}
                // if you are using custom validation schema you probably want to pass `true` as third argument
                onChange={date => form.setFieldValue(field.name, date, true)}
            />
        </FormControl>

    );
};

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

    var validationSchema = yup.object({
        firstName: yup.string().required("First Name is a required field"),
        lastName: yup.string().required("Last Name is a required field"),
        phoneNumber: yup.string().required("Phone Number is a required field"),
        DOB: yup.string().required("Date of Birth is a required field"),
        gender: yup.string().required("Gender is a required field"),
        insuranceCarrierID: yup.string().required("Insurnace Carrier ID is a required field"),
        primaryInsurancePolicyNumber: yup.string().required("Primary Insurance Policy Number is a required field"),
        primaryInsuranceGroupNumber: yup.string().required("Primary Insurance Group Number is a required field"),

        primaryInsuranceAddress: yup.string().required("Primary Insurance Address is a required field"),
        primaryInsuranceState: yup.string().required("Primary Insurance State is a required field"),
        primaryInsuranceZipCode: yup.string().required("Primary Insurance Zip Code is a required field"),
        primaryInsuranceCountry: yup.string().required("Primary Insurance Country is a required field"),
        primaryInsuredFirstName: yup.string().required("Primary Insurance First Name is a required field"),
        primaryInsuredLastName: yup.string().required("Primary Insurance Last Name is a required field"),
        primaryInsuranceDateOfBirth: yup.string().required("Primary Insurance Date of Birth is a required field"),
        secondaryInsuranceCarrierID: yup.string().required("Secondary Carrier ID is a required field"),




        // firstName: "", lastName: "", phoneNumber: "", DOB: "", gender: "", insuranceCarrierID: "", primaryInsurancePolicyNumber: "", primaryInsuranceGroupNumber: "", primaryInsuranceAddress: "",
        // primaryInsuranceState: "", primaryInsuranceZipCode: "", primaryInsuranceCountry: "", primaryInsuredFirstName: "", primaryInsuredLastName: "", primaryInsuranceDateOfBirth: "", secondaryInsuranceCarrierID: "",
        // icd10DiagnosisCode: "", productReceived: "", dateOfService: ""
    })


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik
                enableReinitialize
                initialValues={{
                    firstName: "", lastName: "", phoneNumber: "", DOB: "", gender: "", insuranceCarrierID: "", primaryInsurancePolicyNumber: "", primaryInsuranceGroupNumber: "", primaryInsuranceAddress: "",
                    primaryInsuranceState: "", primaryInsuranceZipCode: "", primaryInsuranceCountry: "", primaryInsuredFirstName: "", primaryInsuredLastName: "", primaryInsuranceDateOfBirth: "", secondaryInsuranceCarrierID: "",
                    icd10DiagnosisCode: "", productReceived: "", dateOfService: "", rightOrLeft: ""
                }}
                validationSchema={validationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    //submit logic goes here
                    try {
                        var newPatient = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            phoneNumber: data.phoneNumber,
                            DOB: new Date(),
                            gender: data.gender,
                            InsuranceCarrierID: 1,
                            policyNumber: data.primaryInsurancePolicyNumber,
                            groupNumber: data.primaryInsuranceGroupNumber,
                            streetAddress: data.primaryInsuranceAddress,
                            state: data.primaryInsuranceState,
                            zipCode: data.primaryInsuranceZipCode,
                            country: data.primaryInsuranceCountry,
                            PrimaryInsuredFirstName: data.primaryInsuredFirstName,
                            PrimaryInsuredLastName: data.primaryInsuredLastName,
                            PrimaryInsuredDOB: new Date(),
                            SecondaryInsuranceCarrierID: 1
                        }

                        const token = await getAccessTokenSilently();
                        const result = await SecureDMEAPI.post('https://localhost:5001/patient', newPatient, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                        }
                        );
                        props.setPatient(result.data.data);
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
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Patient Information</h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}><MyTextField label="First Name" name="firstName" formControlProps={{ fullWidth: true }} /></GridItem>
                                    <GridItem xs={12} sm={12} md={6}><MyTextField label="Last Name" name="lastName" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                    <GridItem xs={12} sm={12} md={3}><MyTextField label="Phone Number" name="phoneNumber" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                    <GridItem xs={12} sm={11} md={2}><Field label="Date of Birth" name={"DOB"} component={DatePickerField}></Field></GridItem>
                                    <GridItem xs={12} sm={12} md={3}><MyTextField label="Insurance Carrier ID" name="insuranceCarrierID" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormControl className="MuiFormControl-root undefined makeStyles-formControl-95 MuiFormControl-fullWidth">
                                            <div>Gender:</div>
                                            <Field
                                                name="gender"
                                                horizontal={true}
                                                component={FormikRadioGroup}
                                                options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader color="info">
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
                                    <GridItem xs={12} sm={11} md={2}><Field label="Primary Insurance Date of Birth" name="primaryInsuranceDateOfBirth" component={DatePickerField}></Field></GridItem>
                                    <GridItem xs={12} sm={12} md={3}><MyTextField label="Secondary Insurance Carrier ID" name="secondaryInsuranceCarrierID" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>

                        {/* <Card>
                            <CardHeader color="info">
                                <h4 className={classes.cardTitleWhite}>Dispense Information</h4>
                            </CardHeader>

                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}><MyTextField label="ICD-10 Diagnosis Code" name="icd10DiagnosisCode" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                    <GridItem xs={12} sm={12} md={3}><MyTextField label="Product Received" name="productReceived" formControlProps={{ fullWidth: true }}></MyTextField></GridItem>
                                    <GridItem xs={12} sm={11} md={2}><Field label="Date of Service" name="dateOfService" component={DatePickerField}></Field></GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <FormControl className="MuiFormControl-root undefined makeStyles-formControl-95 MuiFormControl-fullWidth">
                                            <div>Preferred Side:</div>
                                            <Field
                                                name="rightOrLeft"
                                                horizontal={true}
                                                component={FormikRadioGroup}
                                                options={[{ value: 'right', label: 'Right' }, { value: 'left', label: 'Left' }]}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card> */}
                        <div>
                            <Button className="btn-success" disabled={isSubmitting} type="submit">Submit</Button>
                        </div>

                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </MuiPickersUtilsProvider>
    )
}

export default MainForm;

