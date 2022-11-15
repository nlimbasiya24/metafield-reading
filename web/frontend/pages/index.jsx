import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Form
} from "@shopify/polaris";
import React from "react";
import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "../hooks/index.js";

export default function LayoutExample() {
  const initialValuesofAttributes = {
    Compaign: "",
    CharityId: "",
    WebsiteUrl: "",
  };
  const [recurrring, setRecurring] = useState("true");
  const [state, setState] = useState(initialValuesofAttributes);
  const handleSelectChange = useCallback((value) => setRecurring(value), []);
  const loggedInFetch = useAuthenticatedFetch();
  const handleOnChangeValues = useCallback(
    (value, id) => {
      setState({ ...state, [id]: value });
    },
    [state]
  );
    async function handleOnSave() {
    const attributesSaveMetaField = {
      Compaign: state.Compaign,
      CharityId: state.CharityId,
      recurrring: recurrring,
      WebsiteUrl: state.WebsiteUrl
    };
    const response = await loggedInFetch(
      "/api/v1/metafield-set/metafields",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attributesSaveMetaField }),
      }
    );
    console.log("Response",response);
 }
   
  const options = [
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ];
  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          id="Metafields"
          title="MetaFieds"
          description="Submit the form to store the value in metafields"
        >
          <Card sectioned primaryFooterAction={{content: "Save", onAction:handleOnSave}}>
            <Form action="Save">
              <FormLayout>
                <TextField
                  label="Compaign"
                  onChange={handleOnChangeValues}
                  value={state.Compaign}
                  id="Compaign"
                />
                <TextField
                  label="CharityId"
                  onChange={handleOnChangeValues}
                  value={state.CharityId}
                  id="CharityId"
                />
                <Select
                  label="Recurring"
                  options={options}
                  onChange={handleSelectChange}
                  value={recurrring}
                />
                <TextField
                  label="WebsiteUrl"
                  onChange={handleOnChangeValues}
                  value={state.WebsiteUrl}
                  id="WebsiteUrl"
                />
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
