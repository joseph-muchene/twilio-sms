import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
function App() {
  const [phone, setPhone] = useState("");
  const [body, setbody] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleBodyChange = (e) => {
    setbody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:8000/sent", {
          number: `+254${phone.substring(1)}`,
          body,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("sms was sent successfully");
        })
        .catch((err) => console.log(err.message));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center my-3">Send message</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="mt-3">
          <label>To:</label>
          <input
            type="text"
            className="form-control"
            name="to"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="mt-3">
          <label>body:</label>
          <input
            type="text"
            className="form-control"
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        <div className="mt-3">
          <button className="btn btn-primary">Send message </button>
        </div>
      </form>
    </div>
  );
}

export default App;
