import React from 'react';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'


import { coreEvents } from '@folio/stripes/core';
import { errorLogging } from 'stripes-config';

/**
 * Log ERROR events to Bugsnag.
 * @see https://www.bugsnag.com
 * @see https://docs.bugsnag.com/platforms/javascript/react/
 *
 */
export default class RollbarLogger extends React.Component {
  // eventHandler
  static eventHandler(event) {
    if (event === coreEvents.ERROR) {
      const { apiKey } = errorLogging.bugsnag;
      Bugsnag.start({
        apiKey,
        plugins: [new BugsnagPluginReact()],
        enabledErrorTypes: {
          unhandledExceptions: false,
          unhandledRejections: true
        },
      });

      return (error, info) => {
        Bugsnag.notify(error, info);
      };
    }

    return null;
  }

  render() {
    return <></>;
  }
}
