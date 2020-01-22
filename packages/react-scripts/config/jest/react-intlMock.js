'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const {
  string,
  func,
  object,
  shape,
  any,
} = PropTypes;
const funcReq = func.isRequired;

// IntlShape kept for backwards compability for projects still running with react-intl@2
// TODO: Deprecate on version 4 of @500tech/react-scripts
const intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,

  defaultLocale: string,
  defaultFormats: object,

  onError: func,
};

const intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq,
};

const intlShape = shape({
  ...intlConfigPropTypes,
  ...intlFormatPropTypes,
  formatters: object,
  now: funcReq,
});

const addLocaleData = () => {};
const FormattedMessage = () => React.createElement('div');
const FormattedHTMLMessage = () => React.createElement('div');
const FormattedTime = () => React.createElement('div');
const FormattedPlural = () => React.createElement('div');
const FormattedNumber = () => React.createElement('div');
const FormattedDate = () => React.createElement('div');
const FormattedRelative = () => React.createElement('div');
const IntlProvider = ({ children }) =>
  React.createElement('div', null, children);

const useIntl = () => ({ formatMessage: ({ id }) => `TranslationKey(${id})` });

module.exports = {
  addLocaleData,
  FormattedMessage,
  FormattedHTMLMessage,
  FormattedTime,
  FormattedPlural,
  FormattedNumber,
  FormattedDate,
  FormattedRelative,
  intlShape,
  injectIntl: data => data,
  IntlProvider,
  useIntl
};
