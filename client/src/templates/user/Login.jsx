import Button from "../Button.jsx";
import {useState} from "react";
import {ENDPOINT} from "../../App.jsx";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    async function onSubmit(event) {
        console.log("you clicked")
        console.log({email})
        event.preventDefault()
        const data = await fetch(`${ENDPOINT}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                email : {email},
                password : {password}
            },
        }).then((r) => console.log(r.json()));
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    <input onChange={emailChange} type={"text"} placeholder={"ID"} value={email}></input>
                </label>
                <label>
                    <input onChange={passwordChange} type={"password"} placeholder={"Password"} value={password}></input>
                </label>
                <Button text={"submit"} />
            </form>
        </div>
    )
}

export default Login