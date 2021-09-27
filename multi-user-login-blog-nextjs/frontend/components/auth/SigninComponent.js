import { useState } from "react"
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import { signin } from "../../actions/auth"

const SigninComponent = () => {
    const [values, setValues] = useState({
        name: "",
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
    const { name, email, password, error, loading, message, showForm } = values


    const showLoading = () => {
        loading ? <div className="alert alert-info">Loading...</div> : ""
    }
    const showError = () => {
        error ? <div className="alert alert-danger">{error}</div> : ""
    }
    const showMessage = () => {
        message ? (<div className="alert alert-info">{message}</div>) : ""
    }


    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false })
        const user = { name, email, password }
        signup(user)
            .then(data => {
                console.log(data)
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    setValues({ ...values, name: "", email: "", password: "", error: "", loading: false, message: data.message, showForm: false })
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
