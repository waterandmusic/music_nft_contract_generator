import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobal } from "reactn";
import tree, { Type } from "./Tree";

const Component = styled.div`
  font-family: sans-serif;
  line-height: 1.4;
  @media print {
    display: none;
  }
`;

const Information = styled.div`
  flex: 1;
  div p:first-child {
    margin-top: 0;
  }
  div h3:first-child {
    margin-top: 0;
  }
  margin-left: 20px;
  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const Choices = styled.div``;

const Option = styled.div`
  padding: 10px;
  border: 1px solid ${(props) => (props["aria-disabled"] ? "#888" : "black")};
  color: ${(props) => (props["aria-disabled"] ? "#888" : "black")};
  border-radius: 4px;
  font-weight: 700;
  margin-right: 15px;
  margin-bottom: 10px;
  display: inline-block;
  transition: 0.2s ease-in-out;
  cursor: ${(props) => (props["aria-disabled"] ? "default" : "pointer")};
  :hover {
    transition: 0.2s ease-in-out;
    background: ${(props) =>
      props["aria-disabled"] ? "transparent" : "rgba(0, 0, 0, 0.1)"};
  }
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  outline: none;
`;

const BigInput = styled.textarea`
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  width: 400px;
  height: 200px;
  outline: none;
`;

const PreviousQuestion = styled.div`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: black;
    transition: 0.3s ease-in-out;
  }
`;

const PreviousQuestions = styled.div`
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

function Questions() {
  const [responses, setResponses] = useGlobal("responses");
  const [cqid, setCurrent] = useGlobal("currentQuestion");
  const [text, setText] = useState("");

  useEffect(() => {
    setCurrent("0");
    setResponses([]);
  }, [setCurrent, setResponses]);

  const currentQuestion = tree[cqid];

  if (!cqid || !responses || !currentQuestion) return <Component />;

  const setResponse = (res: string) => {
    let newReponses = [],
      done = false;
    for (let response of responses) {
      if (response.question === cqid) {
        done = true;
        newReponses.push({ question: cqid, answer: res });
      } else newReponses.push(response);
    }
    if (!done) {
      newReponses.push({ question: cqid, answer: res });
    }
    setResponses(newReponses);
  };

  const submitChoice = (optionKey: number) => {
    if (currentQuestion.options) setResponse(String(optionKey));
    if (typeof currentQuestion.next === "string") {
      setCurrent(currentQuestion.next);
      const resp = responses.filter((i) => i.question === currentQuestion.next);
      if (resp.length > 0 && tree[currentQuestion.next].type === Type.text) {
        setText(resp[0].answer);
      }
    } else if (currentQuestion.next) {
      setCurrent(currentQuestion.next[optionKey]);
      const resp = responses.filter(
        (i) => i.question === (currentQuestion.next || [])[optionKey]
      );
      if (
        resp.length > 0 &&
        tree[currentQuestion.next[optionKey]].type === Type.text
      ) {
        setText(resp[0].answer);
      }
    }
  };

  const submitText = () => {
    if (currentQuestion.required && !text) return;
    setResponse(text);
    setText("");
    if (typeof currentQuestion.next === "string") {
      setCurrent(currentQuestion.next);
      const resp = responses.filter((i) => i.question === currentQuestion.next);
      if (resp.length > 0 && tree[currentQuestion.next].type === Type.text) {
        setText(resp[0].answer);
      }
    }
  };

  const goBack = (key: string) => {
    setCurrent(key);
    const resp = responses.filter((i) => i.question === key);
    if (resp.length > 0 && tree[key].type === Type.text) {
      setText(resp[0].answer);
    }
    setResponses(responses.filter((i) => parseInt(i.question) <= parseInt(key)));
  };

  return (
    <Component>
      <PreviousQuestions>
        {Object.keys(tree)
          .filter(
            (i) =>
              responses.filter((x) => x.question === i).length > 0 &&
              Number(i) < Number(cqid)
          )
          .map((id) => (
            <PreviousQuestion
              key={id}
              onClick={() => {
                goBack(id);
              }}
            >
              {tree[id].question}
            </PreviousQuestion>
          ))}
      </PreviousQuestions>
      <QuestionBox>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{currentQuestion.question}</h2>
          {currentQuestion.type === Type.multipleChoice && (
            <Choices>
              {currentQuestion.options?.map((option, key) => (
                <Option
                  key={key}
                  onClick={() => {
                    submitChoice(key);
                  }}
                >
                  {option.text}
                </Option>
              ))}
            </Choices>
          )}
          {currentQuestion.type === Type.text && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitText();
              }}
            >
              <Input
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
              <br />
              <br />
              <Option
                aria-disabled={Boolean(currentQuestion.required && !text)}
                onClick={submitText}
              >
                Submit
              </Option>
            </form>
          )}
          {currentQuestion.type === Type.bigText && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitText();
              }}
            >
              <BigInput
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
              <br />
              <br />
              <Option
                aria-disabled={Boolean(currentQuestion.required && !text)}
                onClick={submitText}
              >
                Submit
              </Option>
            </form>
          )}
        </div>
        {currentQuestion.information && (
          <Information>{currentQuestion.information}</Information>
        )}
      </QuestionBox>
    </Component>
  );
}

export default Questions;
