import "./App.css";

import "antd/dist/antd.css";
import { DatePicker } from "antd";
import React, { useState } from "react";

import { Layout, Breadcrumb, Button, Timeline } from "antd";

const { Header, Content, Footer } = Layout;
function App() {
  const [dateOfBirth, setDateOfBirth] = useState();
  const [ageString, setageString] = useState("");
  const calculateAge = (dateString) => {
    // const dateString = dateString ;
    const now = new Date();

    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dateNow = now.getDate();

    const dob = new Date(dateString);

    const yearDob = dob.getFullYear();
    const monthDob = dob.getMonth();
    const dateDob = dob.getDate();

    let yearAge = yearNow - yearDob;
    let monthAge;

    if (monthNow >= monthDob) {
      monthAge = monthNow - monthDob;
    } else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }

    let dateAge;
    if (dateNow >= dateDob) {
      dateAge = dateNow - dateDob;
    } else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    const age = {
      years: yearAge,
      months: monthAge,
      days: dateAge,
    };

    const yearString = age.years > 1 ? "years" : "year";
    const monthString = age.months > 1 ? " months" : " month";
    const dayString = age.days > 1 ? " days" : " day";

    let ageString = "";

    if (age.years > 0 && age.months > 0 && age.days > 0) {
      ageString =
        age.years +
        yearString +
        ", " +
        age.months +
        monthString +
        ", and " +
        age.days +
        dayString +
        " old.";
    } else if (age.years === 0 && age.months === 0 && age.days > 0) {
      ageString = "Only " + age.days + dayString + " old!";
    } else if (age.years > 0 && age.months === 0 && age.days === 0) {
      ageString = age.years + yearString + " old. Happy Birthday!!";
    } else if (age.years > 0 && age.months > 0 && age.days === 0) {
      ageString =
        age.years + yearString + " and " + age.months + monthString + " old.";
    } else if (age.years === 0 && age.months > 0 && age.days > 0) {
      ageString =
        age.months + monthString + " and " + age.days + dayString + " old.";
    } else if (age.years > 0 && age.months === 0 && age.days > 0) {
      ageString =
        age.years + yearString + " and " + age.days + dayString + " old.";
    } else if (age.years === 0 && age.months > 0 && age.days === 0) {
      ageString = age.months + monthString + " old.";
    } else {
      ageString = "Oops! Could not calculate age!";
    }
    setageString(ageString);
  };

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            background: "#7dbcea",
          }}
        >
          <div className="logo" />
          <Content
            style={{ background: "#7dbcea" }}
            mode="horizontal"
            className="d-flex justify-content-center align-items-center "
          >
            <h3 className="mt-3">Calculate Your Age </h3>
          </Content>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64, height: "100%" }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Age Calculator</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background d-flex align-items-center justify-content-center flex-column"
            style={{
              padding: 24,
              minHeight: 380,
              background: "white",
              height: "80vh",
            }}
          >
            <h4>Please enter your date of birth</h4>
            <DatePicker
              size="large"
              value={dateOfBirth}
              onChange={setDateOfBirth}
            />
            <Button
              className="mt-4"
              type="primary"
              onClick={() => {
                calculateAge(dateOfBirth);
              }}
            >
              Calculate
            </Button>

            {ageString !== "" && (
              <Timeline className="mt-4">
                <Timeline.Item>
                  {" "}
                  <h5>You are {ageString}</h5>
                </Timeline.Item>
              </Timeline>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", bottom: 0 }}>
          Created by Daksh Patel
        </Footer>
      </Layout>
    </>
  );
}

export default App;
