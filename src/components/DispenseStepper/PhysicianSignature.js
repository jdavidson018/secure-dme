import React, { useState, useEffect } from "react";
import { Formik, Form, useField } from "formik"
import { TextField, Checkbox, Radio, FormControlLabel, Typography, FormControl, Select, MenuItem } from "@material-ui/core"
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
import PropTypes from "prop-types";
import Lottie from "react-lottie";
import scanDocumentData from "../../assets/lotties/scan-document";
import SecureDMEAPI from "../../api/SecureDMEAPI";
import { useAuth0 } from '@auth0/auth0-react';

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
const styles = theme => ({
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
    },
    centered: {
        textAlign: "center"
    },
    padded: {
        marginLeft: theme.spacing(5)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
});

const PhysicianSignature = props => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const { getAccessTokenSilently } = useAuth0();

    const [availablePhysicians, setAvailablePhysicians] = useState(null);
    const [selectedPhysician, setSelectedPhysician] = useState(null);
    const [expectedSignature, setExpectedSignature] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const token = await getAccessTokenSilently();
            const response = await SecureDMEAPI.get(`https://localhost:5001/physician/GetAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAvailablePhysicians(response.data.data);
        }
        loadData();
    }, []);

    if (!availablePhysicians) {
        return (
            <div>Wait for it</div>
        )
    } else {
        console.log(expectedSignature);
        console.log(selectedPhysician);
        return (
            <Card>
                <CardBody>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            signature: ""
                        }}
                        onSubmit={(data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            props.setPhysicianSigned(true);
                            props.setPhysician(selectedPhysician);
                            setSubmitting(false);
                        }}>
                        {({ values, isSubmitting, errors }) => (
                            <Form>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={8}>
                                        <Card>
                                            <CardHeader color="info">
                                                <Typography>Physician Signature</Typography>
                                            </CardHeader>
                                            <CardBody>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel>Physician</InputLabel>
                                                    <Select
                                                        native
                                                        value={selectedPhysician?.id}
                                                        onChange={(e) => {
                                                            let physician = availablePhysicians.filter(x => x.id == e.target.value)[0];
                                                            setSelectedPhysician(physician);
                                                            setExpectedSignature(physician.firstName + " " + physician.lastName);
                                                        }}
                                                    >
                                                        <option aria-label="None" value="" />
                                                        {availablePhysicians.map(x => {
                                                            return (
                                                                <option value={x.id}>{x.firstName + " " + x.lastName}</option>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <Typography>Typing your full name below constitues a legal signature.</Typography>
                                                <GridItem xs={12} sm={12} md={6}><MyTextField name="signature" label="Patient Signature" formControlProps={{ fullWidth: true }} /></GridItem>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <Button className="btn-success" disabled={isSubmitting || !selectedPhysician || (expectedSignature !== values.signature)} type="submit">Agree</Button>
                                                </GridItem>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>

                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        )
    }
}

PhysicianSignature.propTypes = {
    firstName: null,
    lastName: null,
    signature: null,
    setSignature: null
};

export default PhysicianSignature;