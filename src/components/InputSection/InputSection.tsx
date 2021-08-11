import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./InputSection.css";
import Output from "../Output/Output";
import styled from "styled-components";
import Modal from "react-modal";

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  #button-container {
    margin-top: 10px;
    padding-right: 6em;
    display: flex;
    width: 25em;
    justify-content: space-between;
  }
`;

const Input = styled.textarea`
  display: inline-block;
  border-radius: 10px;
  width: 25em;
  height: 16em;
  resize: none;
  text-align: justify;
  padding: 20px;
  border-radius: 20px;
  border: solid 0.1px rgba(153, 153, 153, 0.1);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;

  &:focus {
    outline: none;
  }
`;

const OutputSection = styled.div`
  display: inline-block;
  border-radius: 10px;
  width: 25em;
  height: 16em;
  resize: none;
  text-align: justify;
  padding: 20px;
  border-radius: 20px;
  border: solid 0.1px rgba(153, 153, 153, 0.1);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
  border-radius: 20px;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }
  position: relative;
  color: #5f5f5f;
`;

const Link = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 65% 35%;
  flex-direction: column;
  justify-content: center;
  height: 43vh;
  width: 51vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-bottom: 8vh;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  h4 {
    color: #5f5f5f;
  }
`;

const FeedbackInput = styled(Input)`
  height: 6em;
  width: 100%;
  margin-bottom: 20px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "60%",
  },
};

export default function InputSection() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [clicked, setClicked] = useState(false);
  const [outputData, setOutputData] = useState(null);

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#444444";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ input: input }),
  };

  useEffect(() => {
    fetch("/input", options)
      .then((res) => res.json())
      .then((data) => {
        setOutputData(data.output);
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  console.log(clicked);
  return (
    <>
      <FormContainer>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Type here..."
              id="testSection"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div id="button-container">
              <Button onClick={() => setClicked(!clicked)}>Mic</Button>
              <Button onClick={() => setClicked(!clicked)}>Upload</Button>
              <Button
                onClick={() => {
                  setClicked(!clicked);
                  setInput2(input);
                }}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
        <div>
          <OutputSection>
            <Output data={outputData} input={input2} />
          </OutputSection>
          <div id="button-container">
            <Button onClick={openModal}>Feedback</Button>
          </div>
        </div>
        <div>
          <Link>
            <h4>Link Section</h4>
          </Link>
        </div>
      </FormContainer>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Feedback</h2>
        <Button onClick={closeModal}>close</Button>
        <div>{outputData}</div>
        <form>
          <FeedbackInput />
          <br />
          <Button>Send Feedback</Button>
        </form>
      </Modal>
    </>
  );
}
