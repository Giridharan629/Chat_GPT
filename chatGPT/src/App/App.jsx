import React, { useEffect, useRef, useState } from "react";
import "./app.css";

const App = () => {
  const inpRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [theme, setTheme] = useState("theme1");
  const [activeConvo, setActiveConvo] = useState(1);
  const [Conversations, setConversations] = useState([
    {
      id: 1,
      messages: [],
    },
  ]);

  function toggleMenu() {
    setToggle(!toggle);
  }

  function handleNewCovo() {
    console.log("render");
    let newId = Conversations.length + 1;
    setConversations([...Conversations, { id: newId, messages: [] }]);
    setActiveConvo(newId);
  }

  function postMsg() {

    const inputvalue = inpRef.current.value.trim();

    if (!inputvalue) return;

    let botResponse = "some response from bot";

    if (inputvalue == "Hi" || inputvalue == "hi"| inputvalue == "HI") {
      botResponse = "Hi! How's it going?";
    } else if (
      inputvalue == "how are you?" ||
      inputvalue == "How are you?" ||
      inputvalue == "how are you ?" ||
      inputvalue == "How are you ?"||
      inputvalue == "How are you" ||
      inputvalue == "how are you" ||
      inputvalue == "HOW ARE YOU?" ||
      inputvalue == "HOW ARE YOU ?"
    ) {
      botResponse = "I'm great! Thanks for asking. How about you?";
    }else if(inputvalue)
    {}
    else{
      botResponse = `Rome wasn't built in a day, and neither was I. I can answers for only two questions. Come back later-I might learn a third answer! 😅 
      
      if you are intelligent find the two questions that i know 😁`
    }

    setConversations((prev) =>
      prev.map((convo) =>
        convo.id === activeConvo
          ? {
              ...convo,
              messages: [
                ...convo?.messages,
                { user: inputvalue, bot: botResponse },
              ],
            }
          : convo
      )
    );

    inpRef.current.value = "";
  }

  function removeConvo(id) {
    console.log("render");

    setConversations((prev) => {
      const updatedConvo = prev.filter((convo) => convo.id !== id);

      console.log(updatedConvo);

      if (id == activeConvo) {
        console.log(updatedConvo);
        setActiveConvo(() => {
          updatedConvo.length > 0 ? updatedConvo[0].id : null;
        });
        console.log(activeConvo);
      }

      return updatedConvo;
    });
  }

  function changeTheme(e) {
    let newTheme = e.target.value;
    setTheme(newTheme);
  }

  useEffect(() => {
    // document.body.style.background = url({theme});
  });

  return (
    <div className="container">
      <div className="bg">
        {/* <video autoPlay muted loop>
          <source src={`${theme}.mp4`} type="video/mp4" />
        </video> */}
        <img src={`${theme}.jpg`} alt="" />
      </div>
      <div className="header">
        <h1 style={{ color: `var(--${theme}-font-color)` }}>Chat Assistant</h1>
      </div>
      <div
        className="menu"
        style={{
          width: toggle ? "0px" : "270px",
          minWidth: toggle ? "0px" : "270px",
          background: `var(--${theme}-background)`,
          borderRight: `var(--${theme}-border)`,
        }}
      >
        <input type="checkbox" id="close" />
        <div
          className="hamburger"
          style={{
            color: `var(--${theme}-font-color)`,
          }}
        >
          <label
            htmlFor="close"
            onClick={() => {
              toggleMenu();
            }}
          >
            -
          </label>
        </div>
        <div className="options" style={{ left: toggle ? "-500px" : "0px" }}>
          <div
            className="new-convo"
            onClick={() => {
              handleNewCovo();
            }}
            style={{
              background: `var(--${theme}-background)`,
              border: `var(--${theme}-border)`,
              color: `var(--${theme}-font-color)`,
            }}
          >
            <i className="fa-solid fa-plus"></i>
            <p>New Conversation</p>
          </div>

          <div
            className="clear-convo"
            onClick={() => {
              setConversations([
                {
                  id: 1,
                  messages: [],
                },
              ]);
              setActiveConvo(1);
            }}
            style={{
              background: `var(--${theme}-background)`,
              border: `var(--${theme}-border)`,
              color: `var(--${theme}-font-color)`,
            }}
          >
            <i className="fa-solid fa-trash"></i>
            <p>Clear Conversation</p>
          </div>

          <div className="prev-convo">
            {Conversations.map((convo, index) => (
              <label
                htmlFor="close"
                key={index}
                onClick={() => {
                  setActiveConvo(convo.id);
                }}
              >
                <div
                  className="prev-convo-items"
                  style={{ color: `var(--${theme}-font-color)` }}
                >
                  <div
                    style={{
                      fontWeight: convo.id === activeConvo ? "bold" : "normal",
                    }}
                    onClick={() => {
                      toggleMenu();
                    }}
                  >
                    <i className="fa-solid fa-comments"></i>
                    Conversation {convo.id}
                  </div>
                  <i
                    className="fa-solid fa-trash"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeConvo(convo.id);
                    }}
                  ></i>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* //zsdfaadsflahdnsf */}

      <div className="right">
        <div
          className="msgArea"
          style={{
            background: `var(--${theme}-background)`,
            border: `var(--${theme}-border)`,
          }}
        >
          {Conversations?.length === 0 || !activeConvo ? (
            <>
              <h2 style={{ color: `var(--${theme}-font-color)` }}>
                click New Conversation in the menu bar to start service 😊💕{" "}
              </h2>
            </>
          ) : (
            Conversations.find(
              (convo) => convo?.id === activeConvo
            )?.messages?.map((msg, index) => (
              <React.Fragment key={index}>
                <div className="user msg-field">
                  <div className="img">
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                  <p style={{ color: `var(--${theme}-font-color)` }}>
                    {msg.user}
                  </p>
                </div>

                <div className="bot msg-field">
                  <div className="img">
                    <i className="fa-solid fa-robot"></i>
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>

                  <p style={{ color: `var(--${theme}-font-color)` }}>
                    {msg.bot}
                  </p>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
        <div className="footer-items">
          <div
            className="inputbox"
            style={{
              background: `var(--${theme}-background)`,
              border: `var(--${theme}-border)`,
            }}
          >
            <input
              type="text"
              ref={inpRef}
              style={{ color: `var(--${theme}-font-color)` }}
              placeholder="Ask a question"
            />
            <div className="submit">
              <i
                style={{
                  color: `var(--${theme}-font-color)`,
                }}
                className="fa-solid fa-paper-plane"
                onClick={() => {
                  postMsg();
                }}
              ></i>
            </div>
          </div>

          <div
            className="footer"
            style={{ color: `var(--${theme}-font-color)` }}
          >
            <label htmlFor="check">
              <input id="check" type="checkbox" />
              <div
                className="toggle"
                style={{
                  background: `var(--${theme}-background)`,
                  border: `var(--${theme}-border)`,
                }}
              ></div>
            </label>

            <p>Web Access</p>

            <div className="right-options"></div>

            {/* <div className="btn">
            <button
              style={{
                background: `var(--${theme}-background)`,
                border: `var(--${theme}-border)`,
                color: `var(--${theme}-font-color)`,
              }}
            >
              default
            </button>
          </div> */}

            <div
              className="themes"
              style={{
                background: `var(--${theme}-background)`,
                border: `var(--${theme}-border)`,
              }}
            >
              <input
                type="radio"
                name="theme"
                value="theme1"
                onClick={(e) => {
                  changeTheme(e);
                }}
              />
              <input
                type="radio"
                name="theme"
                value="theme2"
                onClick={(e) => {
                  changeTheme(e);
                }}
              />
              <input
                type="radio"
                name="theme"
                value="theme3"
                onClick={(e) => {
                  changeTheme(e);
                }}
              />
              <input
                type="radio"
                name="theme"
                value="theme4"
                onClick={(e) => {
                  changeTheme(e);
                }}
              />
              <input
                type="radio"
                name="theme"
                value="theme5"
                onClick={(e) => {
                  changeTheme(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
