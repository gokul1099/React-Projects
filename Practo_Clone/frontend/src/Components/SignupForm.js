import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { signup } from "../Actions/UserLogin"
import { useDispatch } from "react-redux";



const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/;
const reqdFieldMsg = "This is a required field";
const invalidPwdMsg =
    "Password must contain atleast eight characters, at least one letter and one number.";
const schema = yup.object({
    isDoctor: yup.boolean(),
    name: yup.string().required(reqdFieldMsg),
    password: yup
        .string()
        .matches(PASSWORD_PATTERN, invalidPwdMsg)
        .required(reqdFieldMsg),
    email: yup.string().email("A valid email is required").required(reqdFieldMsg)
});

const SignupForm = () => {
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch(signup(values))

    };

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={onSubmit}
                validateOnChange={false}
                initialValues={{
                    name: "",
                    password: "",
                    email: "",
                    isDoctor: false
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => {
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type="test"
                                    name="name"
                                    placeholder="Please enter name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Please enter your email address"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control

                                    type="password"
                                    name="password"
                                    placeholder="Please enter a strong password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    name="isDoctor"
                                    label="isDoctor"
                                    value={values.isDoctor}
                                    onChange={handleChange}

                                />

                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                    );
                }}
            </Formik>

        </>
    );
};

export default SignupForm;
