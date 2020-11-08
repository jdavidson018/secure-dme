import React, { useState } from "react";
import { Formik, Form, useField } from "formik"
import { TextField, Checkbox, Radio, FormControlLabel, Typography } from "@material-ui/core"
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
    },
    centered: {
        textAlign: "center"
    }
};

const ProductLookup = props => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const [searching, setSearching] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { getAccessTokenSilently } = useAuth0();


    const scanOptions = {
        loop: true,
        autoplay: true,
        animationData: scanDocumentData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const ProductProgress = props => {

        if (searching) {
            return (
                <div className={classes.centered}>
                    <Lottie options={scanOptions} height={200} width={200} />
                    <Typography>Searching for product...</Typography>
                </div>
            )
        } else if (loaded) {
            return (
                <div>
                    <Typography>Product will be displayed here</Typography>
                </div>
            )
        } else {
            return (
                <div>
                    <Typography>Please enter a 4 digit pin and select submit</Typography>
                </div>
            )
        }
    }

    const searchForProduct = async () => {
        try {
            const token = await getAccessTokenSilently();
            const product = await SecureDMEAPI.get('https://localhost:5001/product/1', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(product);
            setSearching(false);
            setLoaded(true);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <Card>
            <CardBody>
                <Formik
                    enableReinitialize
                    initialValues={{
                        pin: "", lastName: "", phone: "", dateOfBirth: ""
                    }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        setSearching(true);
                        //submit logic goes here
                        searchForProduct();
                        setSubmitting(false);
                    }}>
                    {({ values, isSubmitting, errors }) => (
                        <Form>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}><MyTextField name="pin" label="Product Pin" formControlProps={{ fullWidth: true }} /></GridItem>
                                <GridItem xs={12} sm={12} md={6}><ProductProgress /></GridItem>
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

ProductLookup.propTypes = {
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    children: PropTypes.node
};

export default ProductLookup;