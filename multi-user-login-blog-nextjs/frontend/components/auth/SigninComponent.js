import Router from "next/router";
import { useState, useEffect } from "react"
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import { signin, authenticate, isAuth } from "../../actions/auth"



const SigninComponent = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: "",
        message: "",
        showForm: true
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,

        })
    }
    const { email, password, error, loading, message, showForm } = values
    useEffect(() => {
        if (isAuth()) {
            Router.push("/")
        }
    }, [])

    const showLoading = () => (
        loading ? <div className="alert alert-info">Loading...</div> : ""
    )
    const showError = () => (
        error ? <div className="alert alert-danger">{error}</div> : ""
    )
    const showMessage = () => (
        message ? (<div className="alert alert-info">{message}</div>) : ""
    )

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false })
        const user = { email, password }
        signin(user)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        if (isAuth && isAuth().role === 1) {
                            Router.push("/admin")
                        } else {
                            Router.push("/user")
                        }

                    })
                    setValues({ ...values, email: "", password: "", error: "", loading: false, message: data.message, showForm: false })
                }
            })
    }
    const signinForm = () => (
        <div>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={handleChange} placeholder="Type your email here" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" value={password} onChange={handleChange} placeholder="Type your password here " />
                </FormGroup>

            </Form>
            <Button className="mt-3" color="primary" onClick={onSubmit}>Sign In</Button>
        </div>
    )
    return (
        <div className="container">
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </div>
    )
}

export default SigninComponent
