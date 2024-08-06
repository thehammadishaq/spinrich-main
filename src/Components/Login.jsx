// src/components/Login.js
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/FirebaseConfig";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Logged In Successfully");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("invalid username/password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Login</h2>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-3 py-2 rounded-lg"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Already have an account? <Link to={`/Signup`}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
