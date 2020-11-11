import React, { useState, useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Dispenses from "components/Dispenses/Dispenses.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import SecureDMEAPI from "../../api/SecureDMEAPI";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useAuth0 } from '@auth0/auth0-react';
import { Stepper } from "@material-ui/core";

const useStyles = makeStyles(styles);


export  const ProviderDashboard = props=>  {
  const [dispenses, setDispenses] = React.useState([]);
  const classes = useStyles();
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getDispenses();
  }, []);

  const getDispenses = async () => {
    try {
      await SecureDMEAPI.get("Dispense/GetAll").then(x=>{
        setDispenses(x.data.data);
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Dispenses:"
            headerColor="primary"
            tabs={[
              {
                tabName: "New",
                //tabIcon: BugReport,
                tabContent: (
                  <Dispenses
                    dispenses={dispenses.filter((d) =>d.status === 1)}
                  />
                )
              },
              {
                tabName: "In Progress",
                //tabIcon: Code,
                tabContent: (
                  <Dispenses
                    dispenses={dispenses.filter((d) =>d.status === 2)}
                  />
                )
              },
              {
                tabName: "Rejected",
                //tabIcon: Cloud,
                tabContent: (
                  <Dispenses
                    dispenses={dispenses.filter((d) =>d.status === 4)}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default ProviderDashboard;