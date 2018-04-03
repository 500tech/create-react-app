'use strict';

const React = require('react');
const intlShape = require('react-intl').intlShape;

const addLocaleData = () => {};
const FormattedMessage = () => React.createElement('div');
const FormattedHTMLMessage = () => React.createElement('div');
const FormattedTime = () => React.createElement('div');
const FormattedPlural = () => React.createElement('div');
const FormattedNumber = () => React.createElement('div');
const FormattedDate = () => React.createElement('div');
const FormattedRelative = () => React.createElement('div');

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
    injectIntl: (data) => (data)
};
