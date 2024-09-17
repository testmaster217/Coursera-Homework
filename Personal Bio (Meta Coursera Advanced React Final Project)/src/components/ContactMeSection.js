import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: ""
    },
    onSubmit: (values) => submit("#", values),
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      type: Yup.string(),
      comment: Yup.string().required("Required").min(25, "Must be at least 25 characters")
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response, formik, onOpen]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={e => {
            e.preventDefault();
            formik.handleSubmit();
          }}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.getFieldMeta("firstName").touched && !formik.isValid}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.getFieldProps("firstName").value}
                  onChange={formik.getFieldProps("firstName").onChange}
                  onBlur={
                    /* Figuring out that I needed to add these
                     onBlur event handlers was many orders of
                     magnitude harder than it needed to be. */
                    formik.getFieldProps("firstName").onBlur
                  }
                />
                <FormErrorMessage>{formik.getFieldMeta("firstName").error}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.getFieldMeta("email").touched && !formik.isValid}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.getFieldProps("email").value}
                  onChange={formik.getFieldProps("email").onChange}
                  onBlur={formik.getFieldProps("email").onBlur}
                />
                <FormErrorMessage>{formik.getFieldMeta("email").error}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.getFieldProps("type").value}
                  onChange={formik.getFieldProps("type").onChange}
                >
                  {/* TODO: May want to override the styles since there is a
                   bug that makes the <option> text illegible in dark mode 
                   on certain browsers (including mine). */}
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.getFieldMeta("comment").touched && !formik.isValid}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.getFieldProps("comment").value}
                  onChange={formik.getFieldProps("comment").onChange}
                  onBlur={formik.getFieldProps("comment").onBlur}
                />
                <FormErrorMessage>{formik.getFieldMeta("comment").error}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
