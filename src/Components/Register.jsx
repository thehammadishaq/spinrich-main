import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, realtimeDb } from "../Config/FirebaseConfig";
import { toast } from "sonner";
import { ref, set } from "firebase/database";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    accountNumber: Yup.string().required("Account Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    localStorage.setItem("registeredUser", JSON.stringify(values));
    try {
      // Create User with Email and Password
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((result) => {
          const dbRef = ref(realtimeDb, "users/" + result.user.uid);
          set(dbRef, {
            createdAt: new Date().toLocaleDateString(),
            name: values.name,
            username: values.username,
            email: result.user.email,
            uid: result.user.uid,
            accountNumber: values.accountNumber,
            coins: 60,
          })
            .then(() => {})
            .catch((err) => {
              resetForm();
            });
          signOut(auth);
        })
        .catch(() => {});

      toast.success("Your Account Created Successfully Login to Continue");

      // Clearing the Form Values After Submitting and Disabling Button for 3 Seconds
      setTimeout(() => {
        setSubmitting(false);
        resetForm();
        navigate("/Login");
      }, 3000);
    } catch (error) {
      // Handling Errors
      resetForm();

      const emailError = error.code;
      if (emailError === "auth/email-already-in-use") {
        toast.error("Email Already In Use Please Use Different email");
      } else {
        toast.error("An Error Occured While Sign In");
      }
      console.log("An Error Occured While Sign In", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Register</h2>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          accountNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <Field
                type="text"
                name="username"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
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
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Account Number
              </label>
              <Field
                type="text"
                name="accountNumber"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="accountNumber"
                component="div"
                className="text-red-500 text-sm"
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
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
