import React from "react";
import _get from "lodash/get";
import moment from "moment";
import { setLocale as setYupLocale } from "yup";
import en from "./en";
import { message } from "antd";

let currentLanguageCode = null;

const languages = {
  en: {
    id: "en",
    label: "English",
    //flag: '/images/flags/24/United-States.png',
    dictionary: en,
    dateFns: undefined,
  },
};

function init() {
  currentLanguageCode = localStorage.getItem("language") || "en";
  setLanguageCode(currentLanguageCode);
}

export function getLanguage() {
  return languages[getLanguageCode];
}

function format(message, args) {
  if (!message) {
    return null;
  }
  try {
    return message.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getLanguageCode() {
  if (!currentLanguageCode) {
    init();
  }
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw Error(`Invalid language ${arg}.`);
  }

  moment.locale(arg);
  localStorage.setItem("language", arg);

  if (getLanguage().dictionary.validation) {
    setYupLocale(getLanguage().dictionary.validation);
  }
}

export function i18nExists(key) {
  const messge = _get(getLanguage().dictionary, key);
  return !message;
}

export function i18n(key, ...args) {
  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key, ...args) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
