# ETL Demo
> This is a demonstration of using the Extract-Transform-Load process to send events from one source to an LRS.

## Users
1. [Install Git](https://git-scm.com/).
1. [Install Node](https://nodejs.org/en/).
1. Clone this repository `git clone git@github.com:LearningLocker/xapi-demos.git xapi-demos`.
1. Enter the directory `cd xapi-demos`.
1. Install the dependencies `npm install`.
1. Change the `xapiEndpoint` and `xapiAuth` details in the [loadStatements.js file](/loadStatements.js).
1. Run the ETL process `node etl-demo/etl.js`.

## Real World Examples
- [Moodle xAPI Logstore Plugin](https://github.com/xAPI-vle/moodle-logstore_xapi)
