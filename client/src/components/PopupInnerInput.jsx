import { useEffect, useRef, useState } from "react";
import fetcher from "../utils/fetcher";
import { connect } from "react-redux";
import { saveTypingRecord } from "../utils/typingHistory";

function PopupInnerInput({
  file,
  finishTrigger,
  setFinishTrigger,
  Correctchr,
  Wrongchr,
}) {
  const nameInput = useRef();
  const messageInput = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const sendResult = () => {
    if (loading) return;
    setLoading(true);
    saveTypingRecord({
      file,
      cpm: finishTrigger,
      correctChars: Correctchr,
      wrongChars: Wrongchr,
    });
    fetcher.save(
      file,
      finishTrigger,
      nameInput.current.value,
      messageInput.current.value,
      Correctchr,
      Wrongchr,
      (bool) => {
        setLoading(false);

        if (bool) setFinishTrigger(-1);
        else {
          console.log("error");
          setError(true);
        }
      }
    );
  };

  //Commit버튼 Getter 함수
  return (
    <ul className="popup-info-ul fade-in">
      <li>
        <label>
          Name:
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendResult();
              }
            }}
            type="text"
            ref={nameInput}
            id="name"
            name="name"
            required
            maxLength="15"
          ></input>
        </label>
      </li>
      <li>
        <label>
          Message:
          <input
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendResult();
              }
            }}
            type="text"
            ref={messageInput}
            id="message"
            name="message"
            required
            maxLength="25"
          ></input>
        </label>
      </li>
      <div>
        <button
          onClick={() => {
            setFinishTrigger(-1);
          }}
        >
          Cancel
        </button>
        <button onClick={sendResult}> Push </button>
      </div>
      <div style={{ marginTop: "15px", color: "red" }}>
        <Error error={error} />
      </div>
    </ul>
  );
}

function Error({ error }) {
  return error ? (
    <div>
      서버 연결이 원활하지 않습니다. <br />
      인터넷 연결 상태를 확인해 주세요.
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  // Redux  구문
  return {
    Correctchr: state.correct.Correctchr,
    Wrongchr: state.wrong.Wrongchr,
  };
};

export default connect(mapStateToProps)(PopupInnerInput);
