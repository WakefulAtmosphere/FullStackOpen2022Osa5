import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ contents }) => {
  if (contents) {
    return (
      <div>
        {contents}
      </div>
    );
  }
  return false;
};

Notification.propTypes = {
  contents: PropTypes.string.isRequired,
};

export default Notification;
