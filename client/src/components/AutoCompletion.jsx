import React, { useEffect, useState } from "react";

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
  const cKeyword = [
    "auto",
    "break",
    "case",
    "char",
    "const",
    "continue",
    "default",
    "do",
    "double",
    "else",
    "enum",
    "extern",
    "float",
    "for",
    "goto",
    "if",
    "inline",
    "int",
    "long",
    "register",
    "return",
    "short",
    "signed",
    "sizeof",
    "static",
    "struct",
    "switch",
    "typedef",
    "union",
    "unsigned",
    "void",
    "volatile",
    "while",
    "#include",
    "#define",
    "#ifndef",
    "#endif",
    "NULL",
    "malloc",
    "free",
    "printf",
    "scanf",
    "main",
    "stdio.h",
    "stdlib.h",
    "string.h",
  ];

  const pyKeyword = [
    "False",
    "None",
    "True",
    "and",
    "as",
    "assert",
    "async",
    "await",
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
    "self",
    "__init__",
    "print",
    "len",
    "range",
    "list",
    "dict",
    "set",
    "tuple",
    "str",
    "int",
    "float",
    "bool",
    "input",
    "open",
    "append",
    "extend",
    "remove",
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
    "synchronized",
    "this",
    "throw",
    "throws",
    "transient",
    "try",
    "void",
    "volatile",
    "while",
    "true",
    "false",
    "null",
    "String",
    "System",
    "println",
    "ArrayList",
    "HashMap",
    "Override",
  ];

  const jsKeyword = [
    "abstract",
    "arguments",
    "await",
    "boolean",
    "break",
    "byte",
    "case",
    "catch",
    "char",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "double",
    "else",
    "enum",
    "eval",
    "export",
    "extends",
    "false",
    "final",
    "finally",
    "float",
    "for",
    "function",
    "goto",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "int",
    "interface",
    "let",
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
    "super",
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
    "void",
    "volatile",
    "while",
    "with",
    "yield",
    "async",
    "document",
    "window",
    "console",
    "map",
    "filter",
    "reduce",
    "Promise",
    "async",
    "fetch",
    "addEventListener",
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
    if (autoWord.length !== 0 && file) {
      // file 존재 여부 체크 추가
      const extension = file.split(".");
      setComp(
        supportLangList[extension[extension.length - 1]]?.filter((keyword) => {
          // optional chaining 추가
          return autoWord.join("") == keyword.substring(0, autoWord.length);
        }) || [] // fallback 배열 추가
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
