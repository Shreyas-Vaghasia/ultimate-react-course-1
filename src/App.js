import { useEffect, useState } from "react";
import "./style.css";
export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const fetchAdvice = async () => {
    setLoading(true);
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();

    setCount((c) => c + 1);
    // console.log(data.slip.advice);
    setAdvice(data.slip.advice);
    setLoading(false);
  };

  useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    fetchAdvice();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <p className="bg-danger p-2 text-white ">
          {time} {date}
        </p>
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="col ">
            <h1 id="advice" className="card p-2 bg-success">
              {advice}{" "}
            </h1>
            <Message count={count} />
            <button
              type="button"
              class="btn btn-secondary"
              onClick={fetchAdvice}
            >
              Click{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
  {
    console.log("g");
  }
}

function Message({ count }) {
  return (
    <div className="col">
      <h5>You clicked {count} times </h5>
    </div>
  );
}
