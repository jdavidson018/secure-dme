import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import MainForm from 'views/Form/MainForm';
import ProductLookup from './ProductLookup';
import PatientSignature from './PatientSignature';
import PhysicianSignature from './PhysicianSignature';
import { useAuth0 } from '@auth0/auth0-react';
import SecureDMEAPI from "../../api/SecureDMEAPI";
import Lottie from "react-lottie";
import successAnimation from "../../assets/lotties/success";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  centered: {
    textAlign: "center"
  },
  marginTop: {
    marginTop: theme.spacing(2)
  }
}));

function getSteps() {
  return ['Product Information', 'Patient Information', 'Patient Signature', 'Physician Signature'];
}

export default function DispenseStepper() {
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [product, setProduct] = useState(null);
  const [patient, setPatient] = useState(null);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [patientSigned, setPatientSigned] = useState(false);
  const [physician, setPhysician] = useState(null);
  const [physicianSigned, setPhysicianSigned] = useState(false);
  const steps = getSteps();
  const successAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    switch (activeStep) {
      case 0:
        if (product) {
          setNextEnabled(true);
        } else {
          setNextEnabled(false);
        }
        break;
      case 1:
        if (patient) {
          setNextEnabled(true);
        } else {
          setNextEnabled(false);
        }
        break;
      case 2:
        if (patientSigned) {
          setNextEnabled(true);
        } else {
          setNextEnabled(false);
        }
        break;
      case 3:
        if (physicianSigned) {
          setNextEnabled(true);
        } else {
          setNextEnabled(false);
        }
        break;
      default:
    }
  }, [product, patient, patientSigned, physicianSigned, activeStep]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductLookup product={product} setProduct={setProduct} />;
      case 1:
        return (<MainForm patient={patient} setPatient={setPatient} />);
      case 2:
        return (<PatientSignature expectedSignature={patient.firstName + " " + patient.lastName} setPatientSigned={setPatientSigned}></PatientSignature>);
      case 3:
        return (<PhysicianSignature setPhysicianSigned={setPhysicianSigned} setPhysician={setPhysician}></PhysicianSignature>)
      default:
        return 'Collect the physicians signature';
    }
  }

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      // Finish was clicked. Create a new Dispense
      let dispense = {
        ICD10DiagnosisCode: "",
        productId: product.id,
        clientId: 1,
        patientId: patient.id,
        physicianId: physician.id,
        dateOfService: new Date(),
        hasPatientSigned: patientSigned,
        hasPhysicianSigned: physicianSigned,
        status: 1
      }

      const token = await getAccessTokenSilently();
      const result = await SecureDMEAPI.post('https://localhost:5001/dispense', dispense, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
      );

      if (result.data.data) {
        // everything went well
        console.log("everything went well");
      }

    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Typography variant="h5" className={classes.centered}>
                Item was successfully dispensed.
            </Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Lottie options={successAnimationOptions} height={200} width={200} />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <div className={classes.centered}>
                <Button variant="contained" className={classes.marginTop} onClick={handleReset}>
                  Reset
              </Button>
              </div>
            </GridItem>
          </GridContainer>
        ) : (
            <div>
              <div className={classes.centered}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={!nextEnabled}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
          )}
      </div>
    </div>
  );
}


DispenseStepper.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  children: PropTypes.node
};
