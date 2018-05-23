# URL Launch Demo
> This is a demonstration of using the old URL launch method used by some content authoring tools. It's loosely based on the [TinCan Launch method](https://github.com/RusticiSoftware/launch/blob/master/lms_lrs.md).

## Users
1. [Install Git](https://git-scm.com/).
1. [Install Node](https://nodejs.org/en/).
1. Clone this repository `git clone git@github.com:LearningLocker/xapi-demos.git xapi-demos`.
1. Enter the directory `cd xapi-demos`.
1. Install the dependencies `npm install`.
1. Change the `endpoint` and `auth` query parameters in the [lms.html file](/lms.html).
1. Start the LMS server `node url-launch/lms.js`.
1. Navigate to the LMS `http://localhost:1337/lms`.
