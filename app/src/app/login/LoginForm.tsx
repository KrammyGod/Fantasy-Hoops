import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputGroup, Form, Button } from "react-bootstrap"
import { authenticate, useAuth } from "../auth"
import { API } from "../config"
import Loading from "../loading"
import "./styles.css"

export default function LoginForm({ children }: { children?: React.ReactNode }): React.ReactNode {
    const router = useRouter();
    const { handleAuth } = useAuth();
    const [validated, setValidated] = useState(false);
    const [attempted, setAttempted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: any) => {
        setLoading(true);
        const form = event.target;

        event.preventDefault();
        event.stopPropagation();
        
        // start loading wheel
        fetch(API + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: form[0].value,
                password: form[1].value,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.hasOwnProperty("messages")) {
                setValidated(true);
                authenticate(data['data']);
                handleAuth(true);
                setLoading(false);
                router.push("/");
            } else {
                setValidated(false);
                setAttempted(true);
                handleAuth(false);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="outerContainer">
            <div className="subContainer">
                {children}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3" hasValidation>
                            <Form.Control
                                id="email"
                                name="email"
                                aria-label="Email"
                                required
                                onChange={(e) => setAttempted(false)}
                                isInvalid={!validated && attempted}
                            />
                        </InputGroup>
                    </Form.Group>
            
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3" hasValidation>
                            <Form.Control 
                                type="password"
                                name="password"
                                id="password" 
                                aria-label="Password" 
                                required
                                onChange={(e) => setAttempted(false)}
                                isInvalid={!validated && attempted}
                            />
                            <Form.Control.Feedback type="invalid">
                                Invalid email/password.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <div className="rowContainer">
                        {loading ? 
                            <Button disabled type="submit"><Loading styled={false}/></Button> :
                            <Button type="submit">Login</Button>
                        }
                        <p className="space">or</p>
                        <Button href="/signup" variant="secondary">Sign Up</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
