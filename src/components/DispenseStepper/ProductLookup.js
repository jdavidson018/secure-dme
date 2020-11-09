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
    }
});

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

    const ProductProgress = () => {
        console.log(props);
        if (searching) {
            return (
                <div className={classes.centered}>
                    <Lottie options={scanOptions} height={200} width={200} />
                    <Typography>Searching for product...</Typography>
                </div>
            )
        } else if (loaded) {
            let product = props.product ? props.product : false;
            if (product) {
                return (
                    <div className={classes.padded}>
                        <Typography><strong>Name: </strong>{props.product?.name}</Typography>
                        <Typography><strong>Brand: </strong>{props.product?.brand.name}</Typography>
                        <Typography><strong>Size: </strong>{props.product?.size}</Typography>
                        <Typography><strong>Side: </strong>{props.product?.isLeft ? "Left" : "Right"}</Typography >
                    </div>
                )
            } else {
                return (
                    <Typography variant="h5" align="center">The product could not be found</Typography>
                )
            }
        } else {
            return (
                <div className={classes.centered}>
                    <Typography>Please enter a 4 digit pin and select submit</Typography>
                </div>
            )
        }
    }

    const searchForProduct = async (pin) => {
        try {
            const token = await getAccessTokenSilently();
            const product = await SecureDMEAPI.get(`https://localhost:5001/product/getProductByPin/${pin}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            props.setProduct(product.data.data);
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
                        pin: ""
                    }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        setSearching(true);
                        searchForProduct(data.pin);
                        setSubmitting(false);
                    }}>
                    {({ values, isSubmitting, errors }) => (
                        <Form>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}><MyTextField name="pin" label="Product Pin" formControlProps={{ fullWidth: true }} /></GridItem>
                                <GridItem xs={12} sm={12} md={6}><ProductProgress /></GridItem>
                            </GridContainer>
                            <div>
                                <Button className="btn-success" disabled={isSubmitting} type="submit">Search</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardBody>
        </Card>
    )
}

ProductLookup.propTypes = {
    product: null,
    setProduct: null
};

export default ProductLookup;