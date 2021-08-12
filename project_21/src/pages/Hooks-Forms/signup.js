import React from "react";
import { useForm } from 'react-hook-form'
import isEmail from "validator/lib/isEmail"

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
};

const SignUp = () => {
  const { register, handleSubmit, errors, formState } = useForm({mode: "onBlur",})

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div style={styles.container}>
      <h4>Sign up</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register({
          required: true,
          minLength: 6,
          maxLength: 20
        })}
          name="username"
          placeholder="Username"
          style={{ ...styles.input, borderColor: errors.username && "red" }}
        />
        <input ref={register({
          required: true,
          validate: (input) => isEmail(input)
        })}
          name="email"
          placeholder="Email"
          style={{ ...styles.input, borderColor: errors.email && "red" }}
        />
        <input ref={register({
          required: true,
          minLength: 6
        })}
          name="password"
          placeholder="Password"
          style={{ ...styles.input, borderColor: errors.password && "red" }} />
        <button type="submit" disabled={formState.isSubmitting}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp