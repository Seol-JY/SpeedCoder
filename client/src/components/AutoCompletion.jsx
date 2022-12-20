import React, { useEffect, useState, useRef } from "react";

export default function AutoCompletion({
  file,
  autoEnter,
  setAutoEnter,
  useAutoComplete,
  setUseAutoComplete,
  keyEvent,
  setKeyEvent,
  autoWord,
  userInput,
  setUserInput,
}) {
  const [comp, setComp] = useState([]);
  const [autoIndex, setAutoIndex] = useState(0);
  const pyKeyword = [
    "False",
    "None",
    "True",
    "and",
    "as",
    "assert",
    "break",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "nonlocal",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield",
  ];

  const javaKeyword = [
    "abstract",
    "assert",
    "boolean",
    "break",
    "byte",
    "case",
    "catch",
    "char",
    "class",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extends",
    "final",
    "finally",
    "float",
    "for",
    "goto",
    "if",
    "implements",
    "import",
    "instanceof",
    "int",
    "interface",
    "long",
    "native",
    "new",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "short",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "throws",
    "try",
    "void",
    "while",
    "true",
    "false",
  ];

  const jsKeyword = [
    "abstract",
    "arguments",
    "await*",
    "boolean",
    "break",
    "byte",
    "case",
    "catch",
    "char",
    "class*",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "dodouble",
    "else",
    "enum*",
    "evalexport*",
    "extends*",
    "false",
    "final",
    "finally",
    "float",
    "for",
    "function",
    "goto",
    "if",
    "implements",
    "import*",
    "in",
    "instanceof",
    "int",
    "interface",
    "let*",
    "long",
    "native",
    "new",
    "null",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "short",
    "static",
    "super*",
    "switch",
    "synchronized",
    "this",
    "throw",
    "throws",
    "transient",
    "true",
    "try",
    "typeof",
    "var",
    "voidvolatile",
    "while",
    "with",
    "yield",
  ];

  const supportLangList = {
    py: pyKeyword,
    java: javaKeyword,
    txt: [],
    js: jsKeyword,
  };

  useEffect(() => {
    switch (keyEvent) {
      case "ArrowUp":
        if (autoIndex == 0) {
          setAutoIndex(comp.length - 1);
        } else {
          setAutoIndex(autoIndex - 1);
        }
        setKeyEvent("");
        break;
      case "ArrowDown":
        if (autoIndex == comp.length - 1) {
          setAutoIndex(0);
        } else {
          setAutoIndex(autoIndex + 1);
        }
        setKeyEvent("");
      case "":
        setKeyEvent("");
    }
  }, [keyEvent]);

  useEffect(() => {
    if (autoWord.length !== 0) {
      const extension = file.split(".");
      console.log(autoWord);
      setComp(
        supportLangList[extension[extension.length - 1]].filter((keyword) => {
          return autoWord.join("") == keyword.substring(0, autoWord.length);
          //return keyword.includes(autoWord.join(""));
        })
      );
    } else {
      setComp([]);
    }
  }, [autoWord]);

  useEffect(() => {
    if (comp.length === 0) {
      setUseAutoComplete(false);
    } else {
      setUseAutoComplete(true);
    }
    setAutoIndex(0);
  }, [comp]);

  useEffect(() => {
    if (autoEnter) {
      setUserInput(userInput.slice(0, -1 * autoWord.length) + comp[autoIndex]);
      setAutoEnter(false);
    }
  }, [autoEnter]);

  return useAutoComplete && comp.length != 0 && autoWord.length !== 0 ? (
    <div className="auto-complete">
      <ul>
        {comp.map((s, i) => {
          return (
            <li
              key={i}
              className={
                "auto-complete-list" + (i == autoIndex ? "active" : "")
              }
              onClick={() => {}}
            >
              {s}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    ""
  );
}
